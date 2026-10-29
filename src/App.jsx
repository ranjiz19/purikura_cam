import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Lobby from './components/Lobby';
import Booth from './components/Booth';
import Minigame from './components/Minigame';
import DecoratorStudio from './components/DecoratorStudio';
import SaveToDriveScreen from './components/SaveToDriveScreen';
import FinishScreen from './components/FinishScreen';
import GestureModal from './components/GestureModal';
import { getHandLandmarker } from './utils/mediapipe';
import { sfx } from './utils/audio';
import { detectLanguage } from './utils/i18n';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('lobby'); // lobby | booth | minigame | studio | drive | finish
  const [layout, setLayout] = useState('strip_3');
  const [filter, setFilter] = useState('pure_natural');
  const [frameStyle, setFrameStyle] = useState('sailor_navy');
  const [minigameMode, setMinigameMode] = useState('puzzle'); // puzzle | skip
  const [lang] = useState(detectLanguage); // id | jp | en (auto-detect)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [currentSnap, setCurrentSnap] = useState(null);
  const [finalStripDataUrl, setFinalStripDataUrl] = useState(null);
  const [driveLink, setDriveLink] = useState(null);

  const [, setAiStatus] = useState({ type: 'loading', text: 'Memuat AI Sensor...' });
  const [handLandmarker, setHandLandmarker] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Persistent Camera Video Element Ref
  const videoRef = useRef(null);
  const cameraStartingPromiseRef = useRef(null);

  // Target photos based on layout
  const targetCount = layout === 'polaroid_1' ? 1 : layout === 'strip_3' ? 3 : 4;

  useEffect(() => {
    // Initialize MediaPipe Hands in background
    getHandLandmarker((type, text) => {
      setAiStatus({ type, text });
    }).then(instance => {
      if (instance) {
        setHandLandmarker(instance);
      }
    });
  }, []);

  // Start persistent camera stream (Guarded Singleton to prevent Windows hardware lock)
  const ensureCameraStarted = useCallback(async () => {
    // 1. Check if stream is already actively running and live
    if (videoRef.current && videoRef.current.srcObject) {
      const activeTracks = videoRef.current.srcObject.getVideoTracks();
      if (activeTracks.length > 0 && activeTracks[0].readyState === 'live') {
        try {
          if (videoRef.current.paused) {
            await videoRef.current.play();
          }
        } catch (_) {}
        return true;
      }
    }

    // 2. Reuse in-flight promise if another call is currently requesting getUserMedia
    if (cameraStartingPromiseRef.current) {
      return cameraStartingPromiseRef.current;
    }

    cameraStartingPromiseRef.current = (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
        return true;
      } catch (err) {
        console.error('Camera access error:', err);
        return false;
      } finally {
        cameraStartingPromiseRef.current = null;
      }
    })();

    return cameraStartingPromiseRef.current;
  }, []);

  function stopCamera() {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }

  function handleStartBooth() {
    setCapturedPhotos([]);
    setCurrentSnap(null);
    setScreen('booth');
    ensureCameraStarted();
  }

  function handlePhotoCaptured(snapCanvas) {
    setCurrentSnap(snapCanvas);

    if (minigameMode === 'skip') {
      const updated = [...capturedPhotos, snapCanvas];
      setCapturedPhotos(updated);

      if (updated.length < targetCount) {
        setScreen('booth');
      } else {
        stopCamera();
        setScreen('studio');
      }
    } else {
      setScreen('minigame');
    }
  }

  function handleMinigameFinish() {
    const updated = [...capturedPhotos, currentSnap];
    setCapturedPhotos(updated);

    if (updated.length < targetCount) {
      setScreen('booth');
    } else {
      stopCamera();
      setScreen('studio');
    }
  }

  function handleFinishStudio(dataUrl) {
    setFinalStripDataUrl(dataUrl);
    setScreen('drive');
  }

  function handleRestart() {
    stopCamera();
    setCapturedPhotos([]);
    setCurrentSnap(null);
    setFinalStripDataUrl(null);
    setDriveLink(null);
    setScreen('lobby');
  }

  function toggleMute() {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
  }

  return (
    <div className="app-root">
      {/* Persistent Hidden Video Stream for Camera & AI Processing */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: 640,
          height: 480,
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Background Floating Sakura Petals */}
      <div className="app-bg-decor">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${10 + i * 12}%`,
              width: `${12 + (i % 3) * 6}px`,
              height: `${16 + (i % 3) * 8}px`,
              animationDelay: `${i * 1.8}s`,
              animationDuration: `${12 + (i % 4) * 4}s`
            }}
          />
        ))}
      </div>

      {/* Modern Japanese Header (Hidden during camera booth for true fullscreen) */}
      {screen !== 'booth' && (
        <Header
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onOpenGuide={() => setIsGuideOpen(true)}
          lang={lang}
        />
      )}

      {/* Main Multi-Screen Content */}
      <main className={`app-main-content ${screen === 'booth' ? 'app-main-booth-full' : ''}`}>
        {screen === 'lobby' && (
          <Lobby
            layout={layout}
            setLayout={setLayout}
            minigameMode={minigameMode}
            setMinigameMode={setMinigameMode}
            onStart={handleStartBooth}
            lang={lang}
            isConfigModalOpen={isConfigModalOpen}
            setIsConfigModalOpen={setIsConfigModalOpen}
          />
        )}

        {screen === 'booth' && (
          <Booth
            filter={filter}
            targetPhotos={targetCount}
            capturedPhotos={capturedPhotos}
            onCapturePhoto={handlePhotoCaptured}
            handLandmarker={handLandmarker}
            videoRef={videoRef}
            ensureCameraStarted={ensureCameraStarted}
            onExit={handleRestart}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {screen === 'minigame' && (
          <Minigame
            mode={minigameMode}
            currentSnapCanvas={currentSnap}
            onFinish={handleMinigameFinish}
            handLandmarker={handLandmarker}
            videoRef={videoRef}
          />
        )}

        {screen === 'studio' && (
          <DecoratorStudio
            layout={layout}
            photos={capturedPhotos}
            frameStyle={frameStyle}
            setFrameStyle={setFrameStyle}
            filter={filter}
            setFilter={setFilter}
            onFinishStudio={handleFinishStudio}
          />
        )}

        {screen === 'drive' && (
          <SaveToDriveScreen
            finalStripDataUrl={finalStripDataUrl}
            onContinue={() => setScreen('finish')}
            onBack={() => setScreen('studio')}
            driveLink={driveLink}
            setDriveLink={setDriveLink}
          />
        )}

        {screen === 'finish' && (
          <FinishScreen
            finalStripDataUrl={finalStripDataUrl}
            onRestart={handleRestart}
            driveLink={driveLink}
            onOpenDrive={() => setScreen('drive')}
          />
        )}
      </main>

      {/* Gesture Guide Modal */}
      <GestureModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
