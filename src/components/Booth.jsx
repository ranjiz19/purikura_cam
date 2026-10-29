import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/audio';
import { FILTERS } from '../utils/stickers';
import { analyzeGestures, drawKawaiiHandSkeleton } from '../utils/mediapipe';

export default function Booth({
  filter,
  targetPhotos,
  capturedPhotos,
  onCapturePhoto,
  handLandmarker,
  videoRef,
  ensureCameraStarted,
  onExit,
  onOpenGuide
}) {
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [gestureFeedback, setGestureFeedback] = useState('Tunjukkan Frame (🫶) atau Peace (✌️)');
  const [gestureHoldProgress, setGestureHoldProgress] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  const countdownActiveRef = useRef(false);
  const gestureHoldRef = useRef({
    type: null,
    startedAt: 0,
    requiredMs: 300
  });

  const currentPhotoIndex = capturedPhotos.length;

  useEffect(() => {
    let animId = null;

    async function init() {
      if (videoRef?.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getVideoTracks();
        if (tracks.length > 0 && tracks[0].readyState === 'live') {
          setCameraError(null);
          return;
        }
      }

      if (ensureCameraStarted) {
        const ok = await ensureCameraStarted();
        if (!ok && !videoRef?.current?.srcObject) {
          setCameraError('Kamera tidak dapat diakses. Pastikan izin kamera aktif dan tidak sedang dipakai aplikasi/tab lain.');
        } else {
          setCameraError(null);
        }
      }
    }
    init();

    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);

    function renderLoop() {
      const video = videoRef?.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        if (video.paused && video.srcObject) {
          video.play().catch(() => {});
        }

        if (video.videoWidth > 0 || video.readyState >= 2) {
          setIsCameraReady(true);
          setCameraError(null);

          if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
          }

        const ctx = canvas.getContext('2d');
        const cw = canvas.width;
        const ch = canvas.height;

        ctx.save();
        // 1. Draw MIRRORED camera preview for natural selfie reflection
        ctx.translate(cw, 0);
        ctx.scale(-1, 1);

        const currentFilter = FILTERS.find(f => f.id === filter);
        if (currentFilter && currentFilter.css && currentFilter.css !== 'none') {
          ctx.filter = currentFilter.css;
        } else {
          ctx.filter = 'none';
        }

        ctx.drawImage(video, 0, 0, cw, ch);
        ctx.restore();

        // 2. Run MediaPipe AI Hand Gesture Analysis
        if (handLandmarker) {
          try {
            const results = handLandmarker.detectForVideo(video, performance.now());
            if (results && results.landmarks && results.landmarks.length > 0) {
              const analysis = analyzeGestures(results.landmarks);

              // Draw soft kawaii skeleton directly matching mirrored video
              drawKawaiiHandSkeleton(ctx, analysis.mirroredHands, cw, ch, analysis.isPinch);

              // Handle gestures with hold debouncing
              processBoothGestures(analysis, ctx, cw, ch);
            } else {
              resetGestureHold();
              if (!countdownActiveRef.current) {
                setGestureFeedback('Tunjukkan Frame (🫶) atau Peace (✌️)');
              }
            }
          } catch (e) {
            // Frame skip
          }
        }
      }
    }

    animId = requestAnimationFrame(renderLoop);
  }

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [handLandmarker, filter, videoRef, ensureCameraStarted]);

  function resetGestureHold() {
    gestureHoldRef.current.type = null;
    gestureHoldRef.current.startedAt = 0;
    setGestureHoldProgress(0);
  }

  function processBoothGestures(analysis, ctx, cw, ch) {
    if (countdownActiveRef.current) return;

    let activeType = null;
    let feedbackText = '';

    if (analysis.isFrame) {
      activeType = 'frame';
      feedbackText = '🫶 BINGKAI TANGAN TERDETEKSI!';

      // Draw cute animated viewfinder box over hand frame
      if (analysis.frameBox) {
        const fb = analysis.frameBox;
        const bx = fb.x * cw;
        const by = fb.y * ch;
        const bw = fb.width * cw;
        const bh = fb.height * ch;

        ctx.save();
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 4;
        ctx.setLineDash([14, 8]);
        ctx.strokeRect(bx, by, bw, bh);

        // Corner accents
        const cLen = 22;
        ctx.strokeStyle = '#1E3A5F';
        ctx.lineWidth = 6;
        ctx.setLineDash([]);
        // Top-left
        ctx.beginPath();
        ctx.moveTo(bx, by + cLen);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + cLen, by);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(bx + bw - cLen, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + cLen);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(bx, by + bh - cLen);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + cLen, by + bh);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(bx + bw - cLen, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - cLen);
        ctx.stroke();

        ctx.restore();
      }
    } else if (analysis.isPeace) {
      activeType = 'peace';
      feedbackText = '✌️ POSE PEACE TERDETEKSI!';
    } else if (analysis.isPalm) {
      activeType = 'palm';
      feedbackText = '🖐️ LAMBAIAN TANGAN TERDETEKSI!';
    }

    if (activeType) {
      const now = performance.now();
      if (gestureHoldRef.current.type !== activeType) {
        gestureHoldRef.current.type = activeType;
        gestureHoldRef.current.startedAt = now;
      }

      const elapsed = now - gestureHoldRef.current.startedAt;
      const progress = Math.min(1, elapsed / gestureHoldRef.current.requiredMs);
      setGestureHoldProgress(progress);
      setGestureFeedback(`${feedbackText} TAHAN SEBENTAR...`);

      if (progress >= 1) {
        resetGestureHold();
        startPhotoCountdown();
      }
    } else {
      resetGestureHold();
      setGestureFeedback('Tunjukkan Frame (🫶) atau Peace (✌️)');
    }
  }

  function startPhotoCountdown() {
    if (countdownActiveRef.current) return;
    countdownActiveRef.current = true;
    let count = 3;
    setCountdown(count);
    sfx.playBeep(false);

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        sfx.playBeep(false);
      } else {
        clearInterval(interval);
        setCountdown(null);
        sfx.playBeep(true);
        executeSnapshot();
      }
    }, 1000);
  }

  function executeSnapshot() {
    sfx.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 220);

    const video = videoRef?.current;
    if (!video) return;

    // Create high-res snapshot canvas with native aspect ratio (mirrored horizontally)
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;

    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = vw;
    snapCanvas.height = vh;
    const snapCtx = snapCanvas.getContext('2d');

    snapCtx.translate(vw, 0);
    snapCtx.scale(-1, 1);
    snapCtx.drawImage(video, 0, 0, vw, vh);

    setTimeout(() => {
      countdownActiveRef.current = false;
      onCapturePhoto(snapCanvas);
    }, 320);
  }

  function toggleBrowserFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  return (
    <section className="booth-section full-booth-section">
      <div className="booth-container full-booth-container">
        {/* Full Edge-to-Edge Camera Viewport */}
        <div className="camera-viewport full-camera-viewport">
          <canvas ref={canvasRef} width="1280" height="720" className="camera-canvas" />

          {/* Flash Effect */}
          <div className={`camera-flash ${isFlashing ? 'flashing' : ''}`} />

          {/* Camera Connecting Loading Pill */}
          {!isCameraReady && !cameraError && (
            <div className="camera-loading-overlay">
              <span className="loading-spinner">🌸</span>
              <span>Menghubungkan Kamera...</span>
            </div>
          )}

          {/* Large Countdown Badge */}
          {countdown !== null && (
            <div className="camera-countdown">
              <span className="countdown-number">{countdown}</span>
            </div>
          )}

          {/* Camera Overlay HUD */}
          <div className="camera-hud">
            <div className="hud-top">
              <div className="hud-status-group">
                <div className="kawaii-badge shot-badge">
                  <span>📸 FOTO {currentPhotoIndex + 1} / {targetPhotos}</span>
                </div>
                <div className="gesture-hint-pill">
                  <span
                    className="hint-dot"
                    style={{
                      backgroundColor: gestureHoldProgress > 0 ? '#FF1493' : '#7EBD75',
                      transform: `scale(${1 + gestureHoldProgress * 0.4})`
                    }}
                  />
                  <span>{gestureFeedback}</span>
                </div>
              </div>

              {/* Fullscreen & Floating Actions */}
              <div className="hud-actions-right">
                {onOpenGuide && (
                  <button
                    className="btn-kawaii btn-secondary btn-sm"
                    onClick={onOpenGuide}
                    title="Panduan Gestur"
                  >
                    <span>✨ Panduan</span>
                  </button>
                )}
                <button
                  className="btn-kawaii btn-secondary btn-sm btn-fullscreen-toggle"
                  onClick={toggleBrowserFullscreen}
                  title="Toggle Fullscreen"
                >
                  <span>{isFullscreen ? '🗗 Normal' : '⛶ Layar Penuh'}</span>
                </button>
                {onExit && (
                  <button
                    className="btn-kawaii btn-secondary btn-sm btn-exit-booth"
                    onClick={() => {
                      sfx.playClick();
                      onExit();
                    }}
                    title="Keluar ke Menu Awal"
                  >
                    <span>✕ Keluar</span>
                  </button>
                )}
              </div>
            </div>

            <div className="hud-bottom">
              <button
                className="btn-kawaii btn-primary btn-snap"
                onClick={() => {
                  sfx.playClick();
                  startPhotoCountdown();
                }}
              >
                <span>📸 Jepret Sekarang (Klik / Gestur 🫶 / ✌️)</span>
              </button>
            </div>
          </div>

          {cameraError && (
            <div className="camera-error-banner">
              <span>⚠️ {cameraError}</span>
              <button
                className="btn-kawaii btn-secondary btn-sm"
                onClick={async () => {
                  setCameraError(null);
                  if (ensureCameraStarted) {
                    const ok = await ensureCameraStarted();
                    if (!ok) {
                      setCameraError('Kamera tidak dapat diakses. Pastikan izin kamera aktif dan tidak sedang dipakai aplikasi/tab lain.');
                    }
                  }
                }}
                style={{ marginTop: '8px' }}
              >
                Coba Akses Kamera Lagi 🔄
              </button>
            </div>
          )}
        </div>

        {/* Floating Glassmorphism Strip Dock */}
        <aside className="filmstrip-floating-dock kawaii-card">
          <div className="floating-dock-header">
            <span className="dock-badge">🎞️ Strip</span>
            <span className="dock-count">{capturedPhotos.length} / {targetPhotos}</span>
          </div>

          <div className="floating-slots-list">
            {Array.from({ length: targetPhotos }).map((_, i) => (
              <div
                key={i}
                className={`floating-film-slot ${i === currentPhotoIndex ? 'slot-current' : ''} ${capturedPhotos[i] ? 'slot-filled' : ''}`}
              >
                {capturedPhotos[i] ? (
                  <img src={capturedPhotos[i].toDataURL()} alt={`Foto ${i + 1}`} className="slot-img" />
                ) : (
                  <div className="slot-empty">
                    <span className="slot-num">{i + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
