import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/audio';
import { analyzeGestures, drawKawaiiHandSkeleton } from '../utils/mediapipe';
import confetti from 'canvas-confetti';

export default function Minigame({
  currentSnapCanvas,
  onFinish,
  handLandmarker,
  videoRef
}) {
  const canvasRef = useRef(null);
  const miniCamRef = useRef(null);

  const [scoreText, setScoreText] = useState('PUZZLE: 0 / 9 COCOK');
  const [comboText, setComboText] = useState('Susun Kepingan Puzzle! 🧩 Cubit (🤏) untuk Tarik');
  const [gestureState, setGestureState] = useState({ icon: '🖐️', name: 'Tangan Terbuka' });
  const [fistProgress, setFistProgress] = useState(0);

  // 3x3 Photo Puzzle State Ref
  const puzzleRef = useRef({
    tiles: [],
    boardX: 0,
    boardY: 0,
    boardSize: 420,
    tileSize: 140,
    heldTile: null,
    dragOffset: { x: 0, y: 0 },
    isSolved: false,
    fistHold: 0
  });

  const mouseDragRef = useRef({
    isDragging: false
  });

  // Latest hand analysis cache for rendering
  const latestAnalysisRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth || 800;
    canvas.height = parent.clientHeight || 560;

    initPuzzle(canvas);

    let animId = null;

    function gameLoop() {
      const video = videoRef?.current;

      // 1. Hand tracking for minigame using persistent videoRef
      if (handLandmarker && video && video.readyState >= 2) {
        try {
          const results = handLandmarker.detectForVideo(video, performance.now());
          if (results && results.landmarks && results.landmarks.length > 0) {
            const analysis = analyzeGestures(results.landmarks);
            latestAnalysisRef.current = analysis;
            handleGestureMinigame(analysis, canvas);
          } else {
            latestAnalysisRef.current = null;
            setFistProgress(0);
            puzzleRef.current.fistHold = 0;
            if (puzzleRef.current.heldTile && !mouseDragRef.current.isDragging) {
              handlePinchAction(0, 0, false);
            }
          }
        } catch (e) {
          // Hand tracking catch
        }
      }

      // 2. Render Main Puzzle Game Canvas
      renderPuzzle(canvas);

      // 3. Render Mini PiP Camera
      renderMiniPiPCamera(video);

      animId = requestAnimationFrame(gameLoop);
    }

    animId = requestAnimationFrame(gameLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [currentSnapCanvas, handLandmarker, videoRef]);

  // ================= RENDER MINI PIP CAMERA =================
  function renderMiniPiPCamera(video) {
    const mini = miniCamRef.current;
    if (!mini || !video || video.readyState < 2) return;

    const mCtx = mini.getContext('2d');
    const mw = mini.width;
    const mh = mini.height;

    mCtx.save();
    // Draw mirrored selfie preview
    mCtx.translate(mw, 0);
    mCtx.scale(-1, 1);
    mCtx.drawImage(video, 0, 0, mw, mh);
    mCtx.restore();

    // Draw hand skeleton over mini camera
    if (latestAnalysisRef.current && latestAnalysisRef.current.mirroredHands) {
      drawKawaiiHandSkeleton(
        mCtx,
        latestAnalysisRef.current.mirroredHands,
        mw,
        mh,
        latestAnalysisRef.current.isPinch
      );
    }
  }

  // ================= 3X3 PUZZLE INITIALIZATION =================
  function initPuzzle(canvas) {
    const p = puzzleRef.current;
    p.boardSize = Math.min(canvas.width - 40, canvas.height - 120, 420);
    p.tileSize = p.boardSize / 3;
    p.boardX = (canvas.width - p.boardSize) / 2;
    p.boardY = (canvas.height - p.boardSize) / 2 + 10;
    p.heldTile = null;
    p.isSolved = false;
    p.fistHold = 0;
    p.tiles = [];

    if (!currentSnapCanvas) return;

    // Crop center square from snapshot
    const cropSize = Math.min(currentSnapCanvas.width, currentSnapCanvas.height);
    const cropX = (currentSnapCanvas.width - cropSize) / 2;
    const cropY = (currentSnapCanvas.height - cropSize) / 2;
    const cellSize = cropSize / 3;

    // Scramble order
    const shuffled = [1, 4, 0, 5, 2, 8, 3, 7, 6];

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const id = r * 3 + c;
        const tileCanvas = document.createElement('canvas');
        tileCanvas.width = 200;
        tileCanvas.height = 200;
        const tCtx = tileCanvas.getContext('2d');

        tCtx.drawImage(
          currentSnapCanvas,
          cropX + c * cellSize,
          cropY + r * cellSize,
          cellSize,
          cellSize,
          0,
          0,
          200,
          200
        );

        p.tiles.push({
          id,
          originIdx: id,
          currentIdx: shuffled[id],
          canvas: tileCanvas,
          x: 0,
          y: 0,
          isHeld: false
        });
      }
    }

    updatePuzzleMatchHUD();
  }

  function updatePuzzleMatchHUD() {
    const p = puzzleRef.current;
    const matched = p.tiles.filter(t => t.currentIdx === t.originIdx).length;
    p.isSolved = (matched === 9);

    setScoreText(`PUZZLE: ${matched} / 9 COCOK`);
    if (p.isSolved) {
      setComboText('★ TERSUSUN SEMPURNA! KEPALKAN TANGAN (✊) UNTUK SIMPAN ★');
    } else {
      setComboText(`Susun Kepingan Puzzle (${matched}/9) 🧩 Cubit (🤏) untuk Tarik`);
    }
  }

  function renderPuzzle(canvas) {
    const ctx = canvas.getContext('2d');
    const p = puzzleRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle background preview
    if (currentSnapCanvas) {
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.filter = 'blur(10px)';
      ctx.drawImage(currentSnapCanvas, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // Board container
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.strokeStyle = '#FFCCD5';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(p.boardX - 8, p.boardY - 8, p.boardSize + 16, p.boardSize + 16, 20);
    ctx.fill();
    ctx.stroke();

    // Draw slot guides
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const slotX = p.boardX + c * p.tileSize;
        const slotY = p.boardY + r * p.tileSize;
        ctx.fillStyle = '#FFF5F7';
        ctx.strokeStyle = '#FFE4E8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(slotX + 4, slotY + 4, p.tileSize - 8, p.tileSize - 8, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(122, 110, 109, 0.2)';
        ctx.font = 'bold 24px "Zen Maru Gothic", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(r * 3 + c + 1), slotX + p.tileSize / 2, slotY + p.tileSize / 2);
      }
    }
    ctx.restore();

    // Draw Non-held tiles
    p.tiles.forEach(tile => {
      if (tile.isHeld) return;
      const r = Math.floor(tile.currentIdx / 3);
      const c = tile.currentIdx % 3;
      const x = p.boardX + c * p.tileSize;
      const y = p.boardY + r * p.tileSize;
      tile.x = x;
      tile.y = y;

      drawPuzzleTile(ctx, tile, x, y, p.tileSize, false);
    });

    // Draw Held tile (elevated on top)
    if (p.heldTile) {
      drawPuzzleTile(ctx, p.heldTile, p.heldTile.x, p.heldTile.y, p.tileSize, true);
    }

    // Draw Live Mirrored Hand Skeleton & Cursor directly over puzzle canvas
    if (latestAnalysisRef.current && latestAnalysisRef.current.mirroredHands) {
      drawKawaiiHandSkeleton(
        ctx,
        latestAnalysisRef.current.mirroredHands,
        canvas.width,
        canvas.height,
        latestAnalysisRef.current.isPinch
      );
    }
  }

  function drawPuzzleTile(ctx, tile, x, y, size, isElevated) {
    ctx.save();
    const pad = 4;
    const drawX = x + pad;
    const drawY = y + pad;
    const drawS = size - pad * 2;

    if (isElevated) {
      ctx.shadowColor = 'rgba(255, 20, 147, 0.5)';
      ctx.shadowBlur = 24;
      ctx.strokeStyle = '#FF1493';
      ctx.lineWidth = 4;
    } else if (tile.currentIdx === tile.originIdx) {
      // In correct place!
      ctx.strokeStyle = '#7EBD75'; // Matcha green
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = '#FFCCD5';
      ctx.lineWidth = 2;
    }

    // Clip rounded corners for tiles
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawS, drawS, 14);
    ctx.clip();
    ctx.drawImage(tile.canvas, drawX, drawY, drawS, drawS);
    ctx.stroke();

    // Little round number badge
    ctx.fillStyle = tile.currentIdx === tile.originIdx ? '#10B981' : '#3B82F6';
    ctx.beginPath();
    ctx.arc(drawX + 16, drawY + 16, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px "Zen Maru Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(tile.originIdx + 1), drawX + 16, drawY + 16);

    ctx.restore();
  }

  // ================= GESTURE HANDLER =================
  function handleGestureMinigame(analysis, canvas) {
    const hx = analysis.handPos.x * canvas.width;
    const hy = analysis.handPos.y * canvas.height;

    if (analysis.isFist) {
      setGestureState({ icon: '✊', name: 'Mengepal (Fist)' });
      handleFistAction();
    } else if (analysis.isPinch) {
      setGestureState({ icon: '🤏', name: 'Mencubit (Pinch)' });
      setFistProgress(0);
      puzzleRef.current.fistHold = 0;
      handlePinchAction(hx, hy, true);
    } else if (analysis.isPeace) {
      setGestureState({ icon: '✌️', name: 'Pose Peace' });
      setFistProgress(0);
      puzzleRef.current.fistHold = 0;
      handlePinchAction(hx, hy, false);
    } else {
      setGestureState({ icon: '🖐️', name: 'Tangan Terbuka' });
      setFistProgress(0);
      puzzleRef.current.fistHold = 0;
      handlePinchAction(hx, hy, false);
    }
  }

  function handlePinchAction(hx, hy, isPinching) {
    const p = puzzleRef.current;

    if (isPinching) {
      if (!p.heldTile) {
        // Nearest piece selection
        let candidate = null;
        let minDist = Infinity;

        p.tiles.forEach(tile => {
          const cx = tile.x + p.tileSize / 2;
          const cy = tile.y + p.tileSize / 2;
          const dist = Math.hypot(cx - hx, cy - hy);
          if (dist < minDist && dist < p.tileSize * 0.85) {
            minDist = dist;
            candidate = tile;
          }
        });

        if (candidate) {
          p.heldTile = candidate;
          candidate.isHeld = true;
          p.dragOffset = { x: hx - candidate.x, y: hy - candidate.y };
          sfx.playClick();
        }
      } else {
        // Smoothly follow hand
        p.heldTile.x = hx - p.dragOffset.x;
        p.heldTile.y = hy - p.dragOffset.y;
      }
    } else {
      // Release tile
      if (p.heldTile) {
        const cx = p.heldTile.x + p.tileSize / 2;
        const cy = p.heldTile.y + p.tileSize / 2;
        const dropCol = Math.max(0, Math.min(2, Math.floor((cx - p.boardX) / p.tileSize)));
        const dropRow = Math.max(0, Math.min(2, Math.floor((cy - p.boardY) / p.tileSize)));
        const newIdx = dropRow * 3 + dropCol;

        const other = p.tiles.find(t => t.currentIdx === newIdx && t !== p.heldTile);
        if (other) {
          other.currentIdx = p.heldTile.currentIdx;
        }
        p.heldTile.currentIdx = newIdx;
        p.heldTile.isHeld = false;
        p.heldTile = null;

        sfx.playTileSnap();
        updatePuzzleMatchHUD();
      }
    }
  }

  function handleFistAction() {
    const p = puzzleRef.current;
    p.fistHold += 0.04;
    const prog = Math.min(1, p.fistHold);
    setFistProgress(prog);

    if (prog >= 1) {
      sfx.playFistLock();
      p.fistHold = 0;
      setFistProgress(0);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      setTimeout(onFinish, 450);
    }
  }

  // Mouse & Touch fallback
  function handlePointerDown(e) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseDragRef.current.isDragging = true;
    handlePinchAction(x, y, true);
  }

  function handlePointerMove(e) {
    if (!mouseDragRef.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handlePinchAction(x, y, true);
  }

  function handlePointerUp() {
    if (mouseDragRef.current.isDragging) {
      mouseDragRef.current.isDragging = false;
      handlePinchAction(0, 0, false);
    }
  }

  function handleAutoSolve() {
    sfx.playSuccess();
    const p = puzzleRef.current;
    p.tiles.forEach(t => {
      t.currentIdx = t.originIdx;
    });
    updatePuzzleMatchHUD();
    confetti({ particleCount: 30, spread: 50 });
  }

  return (
    <section className="minigame-section">
      <div className="minigame-card kawaii-card">
        <canvas
          ref={canvasRef}
          className="minigame-canvas"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {/* Live Picture-in-Picture Mini Camera */}
        <div className="minigame-pip-cam kawaii-card">
          <canvas ref={miniCamRef} width="160" height="120" className="pip-canvas" />
          <div className="pip-gesture-badge">
            <span className="pip-icon">{gestureState.icon}</span>
            <span className="pip-text">{gestureState.name}</span>
          </div>
        </div>

        {/* Fist Lock Charge Overlay */}
        {fistProgress > 0 && (
          <div className="fist-charge-popup">
            <span className="charge-icon">✊</span>
            <div className="charge-bar-bg">
              <div className="charge-bar-fill" style={{ width: `${fistProgress * 100}%` }} />
            </div>
            <span className="charge-label">Tahan Kepalan Tangan untuk Menyimpan!</span>
          </div>
        )}

        {/* HUD Controls */}
        <div className="minigame-hud-top">
          <div className="hud-badges-group">
            <span className="kawaii-badge score-badge">{scoreText}</span>
            <span className="kawaii-badge gesture-state-badge">
              <span>{gestureState.icon}</span>
              <span>{gestureState.name}</span>
            </span>
          </div>

          <div className="hud-actions-group">
            <button className="btn-kawaii btn-secondary btn-sm" onClick={handleAutoSolve}>
              <span>🧩 Selesaikan</span>
            </button>
            <button className="btn-kawaii btn-secondary btn-sm" onClick={onFinish}>
              <span>Lewati ⏩</span>
            </button>
          </div>
        </div>

        <div className="minigame-hud-bottom">
          <div className="combo-tip-pill">
            <span>{comboText}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
