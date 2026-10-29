import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/audio';
import { STICKERS, FRAME_STYLES, FILTERS, getStickerDataUrl } from '../utils/stickers';

const BRUSH_COLORS = [
  { id: 'navy', color: '#162846', name: 'Sailor Navy' },
  { id: 'cobalt', color: '#2563EB', name: 'Cobalt Blue' },
  { id: 'chalk_white', color: '#FFFFFF', name: 'Chalk White' },
  { id: 'uniform_grey', color: '#64748B', name: 'Uniform Grey' },
  { id: 'ribbon_red', color: '#DC2626', name: 'Ribbon Red' },
  { id: 'crest_gold', color: '#F59E0B', name: 'Crest Gold' }
];

export default function DecoratorStudio({
  layout,
  photos,
  frameStyle,
  setFrameStyle,
  filter,
  setFilter,
  onFinishStudio
}) {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('stickers'); // stickers | pen | frames | filters
  const [brushColor, setBrushColor] = useState('#2563EB');
  const [brushSize, setBrushSize] = useState(6);
  const [customText, setCustomText] = useState('');

  const studioStateRef = useRef({
    baseCanvas: null,
    stickers: [], // { id, img, x, y, width, height, rotation }
    doodles: [], // { points: [], color, size }
    currentStroke: null,
    selectedSticker: null,
    dragStart: { x: 0, y: 0 },
    isDrawing: false,
    isDraggingSticker: false
  });

  useEffect(() => {
    buildCompositeStrip();
  }, [layout, photos, frameStyle, filter]);

  function buildCompositeStrip() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dimensions for photo strip
    let totalW = 440;
    let totalH = 920;
    if (layout === 'grid_2x2') {
      totalW = 600;
      totalH = 740;
    } else if (layout === 'polaroid_1') {
      totalW = 500;
      totalH = 640;
    } else if (layout === 'strip_4') {
      totalW = 440;
      totalH = 1100;
    }

    canvas.width = totalW;
    canvas.height = totalH;

    const base = document.createElement('canvas');
    base.width = totalW;
    base.height = totalH;
    const ctx = base.getContext('2d');

    const currentFrame = FRAME_STYLES.find(f => f.id === frameStyle) || FRAME_STYLES[0];
    const currentFilter = FILTERS.find(f => f.id === filter) || FILTERS[0];

    // 1. Draw rich thematic frame graphics
    drawThemedFrame(ctx, currentFrame, totalW, totalH);

    // 2. Draw Photo Slots with aspect-ratio preserving cover fit
    const padX = 32;
    const padY = 54;
    const photoW = totalW - padX * 2;

    if (layout === 'strip_3' || layout === 'strip_4') {
      const count = layout === 'strip_3' ? 3 : 4;
      const slotH = (totalH - padY - 75 - (count - 1) * 16) / count;

      for (let i = 0; i < count; i++) {
        const sy = padY + i * (slotH + 16);
        drawSlotPhoto(ctx, photos[i], padX, sy, photoW, slotH, currentFilter.css);
      }
    } else if (layout === 'grid_2x2') {
      const gw = (totalW - padX * 2 - 16) / 2;
      const gh = (totalH - padY - 75 - 16) / 2;
      const coords = [
        { x: padX, y: padY },
        { x: padX + gw + 16, y: padY },
        { x: padX, y: padY + gh + 16 },
        { x: padX + gw + 16, y: padY + gh + 16 }
      ];
      for (let i = 0; i < 4; i++) {
        drawSlotPhoto(ctx, photos[i], coords[i].x, coords[i].y, gw, gh, currentFilter.css);
      }
    } else {
      // Polaroid solo - Natural 4:3 proportion with ample bottom note area
      const pW = totalW - padX * 2;
      const pH = Math.round(pW * 0.85); // 370px natural ratio
      drawSlotPhoto(ctx, photos[0], padX, padY + 12, pW, pH, currentFilter.css);
    }

    // 3. Footer date & watermark
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}   SEISHUN HIGH SCHOOL • 青春の思い出`;
    ctx.fillStyle = currentFrame.accent || '#94A3B8';
    ctx.font = 'bold 12px "Zen Maru Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(dateStr, totalW / 2, totalH - 24);

    studioStateRef.current.baseCanvas = base;
    renderStudioCanvas();
  }

  // ================= THEMED JAPANESE SCHOOL FRAME GRAPHICS =================
  function drawThemedFrame(ctx, frame, w, h) {
    ctx.save();
    // 1. Background Fill
    ctx.fillStyle = frame.bg || '#0F1E36';
    ctx.fillRect(0, 0, w, h);

    // 2. Specific School Theme Renderers
    if (frame.id === 'sailor_navy') {
      // Sailor Seifuku: Iconic double white collar stripes (二本線)
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(9, 9, w - 18, h - 18);
      ctx.strokeRect(15, 15, w - 30, h - 30);

      // Red Sailor Ribbon knot at top
      drawSailorBow(ctx, w / 2, 26, '#DC2626', '#F59E0B');

      // Golden School Button in 4 corners
      drawGoldSchoolButton(ctx, 24, 24);
      drawGoldSchoolButton(ctx, w - 24, 24);
      drawGoldSchoolButton(ctx, 24, h - 24);
      drawGoldSchoolButton(ctx, w - 24, h - 24);

      drawHeaderBadge(ctx, w, '🏫 青春セーラー • SEISHUN HIGH SCHOOL • 青藍高校', '#FFFFFF');
    } else if (frame.id === 'gakuran_blazer') {
      // School Blazer: Gold & Silver Academy Borders
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3.5;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(14, 14, w - 28, h - 28);

      // Golden Academy Crests in corners
      drawAcademyShield(ctx, 24, 24);
      drawAcademyShield(ctx, w - 24, 24);
      drawAcademyShield(ctx, 24, h - 24);
      drawAcademyShield(ctx, w - 24, h - 24);

      drawHeaderBadge(ctx, w, '🎓 私立青藍学園 • TOKYO ACADEMY 2026 🎓', '#F59E0B');
    } else if (frame.id === 'blackboard_chalk') {
      // Kokuban Classroom: Slate wooden frame & chalk lines
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 5;
      ctx.strokeRect(6, 6, w - 12, h - 12);

      // Dashed chalk line
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(14, 14, w - 28, h - 28);
      ctx.setLineDash([]);

      // Chalk sakura petals in corners
      drawChalkSakura(ctx, 26, 26);
      drawChalkSakura(ctx, w - 26, 26);
      drawChalkStar(ctx, 26, h - 26);
      drawChalkStar(ctx, w - 26, h - 26);

      drawHeaderBadge(ctx, w, '🌸 卒業記念 • CLASS OF 2026 • 放課後メモリー 🌸', '#F8FAFC');
    } else if (frame.id === 'campus_notebook') {
      // Campus Notebook: Subtle graph grid with red margin rule
      drawNotebookGridBackground(ctx, w, h);

      ctx.strokeStyle = '#1E3A5F';
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      // Red vertical margin rule
      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(22, 10);
      ctx.lineTo(22, h - 10);
      ctx.stroke();

      // Hanamaru Teacher Stamp (💮) at top-right
      drawHanamaruStamp(ctx, w - 26, 26, 12);

      drawHeaderBadge(ctx, w, '✏️ 放課後ノート • AFTER SCHOOL DIARY • 1年A組 ✏️', '#1E3A5F');
    } else if (frame.id === 'rooftop_sky') {
      // Rooftop Blue Sky Gradient & Clouds
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#132B4F');
      skyGrad.addColorStop(0.4, '#1E3A5F');
      skyGrad.addColorStop(1, '#2563EB');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = '#93C5FD';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, w - 20, h - 20);

      // Soft clouds & fence silhouettes
      drawCloudPuff(ctx, 30, 24);
      drawCloudPuff(ctx, w - 30, 24);
      drawRooftopFence(ctx, 16, h - 34, w - 32, 14);

      drawHeaderBadge(ctx, w, '🌤️ 青空と放課後 • ROOFTOP SEISHUN MEMORIES 🌤️', '#FFFFFF');
    } else {
      // Silver Navy Minimal
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 4;
      ctx.strokeRect(8, 8, w - 16, h - 16);

      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(14, 14, w - 28, h - 28);

      drawSilverStar(ctx, 24, 24);
      drawSilverStar(ctx, w - 24, 24);
      drawSilverStar(ctx, 24, h - 24);
      drawSilverStar(ctx, w - 24, h - 24);

      drawHeaderBadge(ctx, w, '★ 青春PHOTO • SEISHUN SCHOOL PHOTOBOOTH ★', '#E2E8F0');
    }
    ctx.restore();
  }

  function drawHeaderBadge(ctx, totalW, text, color) {
    ctx.fillStyle = color;
    ctx.font = 'bold 12.5px "Zen Maru Gothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, totalW / 2, 36);
  }

  // Sailor Uniform Red Ribbon Knot
  function drawSailorBow(ctx, x, y, ribbonCol, knotCol) {
    ctx.save();
    ctx.fillStyle = ribbonCol;
    // Left wing
    ctx.beginPath();
    ctx.ellipse(x - 8, y, 9, 5, -0.25, 0, Math.PI * 2);
    ctx.fill();
    // Right wing
    ctx.beginPath();
    ctx.ellipse(x + 8, y, 9, 5, 0.25, 0, Math.PI * 2);
    ctx.fill();
    // Tails
    ctx.beginPath();
    ctx.moveTo(x - 4, y + 2);
    ctx.lineTo(x - 9, y + 14);
    ctx.lineTo(x - 2, y + 11);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 2);
    ctx.lineTo(x + 9, y + 14);
    ctx.lineTo(x + 2, y + 11);
    ctx.closePath();
    ctx.fill();
    // Center Gold Knot
    ctx.fillStyle = knotCol;
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Golden School Uniform Button
  function drawGoldSchoolButton(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FEF3C7';
    ctx.beginPath();
    ctx.arc(x - 1.2, y - 1.2, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Golden Academy Shield Crest
  function drawAcademyShield(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y - 7);
    ctx.lineTo(x + 6, y - 3);
    ctx.lineTo(x + 6, y + 4);
    ctx.lineTo(x, y + 8);
    ctx.lineTo(x - 6, y + 4);
    ctx.lineTo(x - 6, y - 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Inner star
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Chalk-style Sakura Petal
  function drawChalkSakura(ctx, cx, cy) {
    ctx.save();
    ctx.fillStyle = '#CBD5E1';
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const px = cx + Math.cos(angle) * 7;
      const py = cy + Math.sin(angle) * 7;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#FDE047';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Chalk Doodle Star
  function drawChalkStar(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#FDE047';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', x, y);
    ctx.restore();
  }

  // Notebook Graph Grid
  function drawNotebookGridBackground(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = '#F8FAFC';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
    ctx.lineWidth = 0.8;
    const step = 20;
    for (let x = 12; x < w - 12; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 12);
      ctx.lineTo(x, h - 12);
      ctx.stroke();
    }
    for (let y = 12; y < h - 12; y += step) {
      ctx.beginPath();
      ctx.moveTo(12, y);
      ctx.lineTo(w - 12, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Japanese Teacher Hanamaru 💮 Stamp
  function drawHanamaruStamp(ctx, cx, cy, r) {
    ctx.save();
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5;
      const px = cx + Math.cos(angle) * (r * 0.7);
      const py = cy + Math.sin(angle) * (r * 0.7);
      ctx.beginPath();
      ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Cloud Silhouette Puff
  function drawCloudPuff(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.arc(x + 6, y - 2, 9, 0, Math.PI * 2);
    ctx.arc(x + 14, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Rooftop Cross-Hatch Wire Fence
  function drawRooftopFence(ctx, x, y, w, h) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    // Top & bottom horizontal bars
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.moveTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.stroke();
    // Diagonal wire mesh
    const step = 8;
    for (let px = x; px < x + w; px += step) {
      ctx.beginPath();
      ctx.moveTo(px, y);
      ctx.lineTo(px + step, y + h);
      ctx.moveTo(px + step, y);
      ctx.lineTo(px, y + h);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Silver Star
  function drawSilverStar(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', x, y);
    ctx.restore();
  }

  // ================= ASPECT-RATIO PRESERVING PHOTO DRAWER =================
  function drawSlotPhoto(ctx, photo, x, y, w, h, activeFilterCss) {
    ctx.save();
    // Soft shadow
    ctx.shadowColor = 'rgba(92, 82, 81, 0.14)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    // White polaroid border around each photo
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(x - 5, y - 5, w + 10, h + 10, 14);
    ctx.fill();

    if (photo) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 10);
      ctx.clip();

      // Apply active filter if requested
      if (activeFilterCss && activeFilterCss !== 'none') {
        ctx.filter = activeFilterCss;
      }

      // Aspect-ratio preserving cover fit (NO SQUISHING / GEPENG!)
      const iw = photo.width || 1280;
      const ih = photo.height || 720;
      const targetRatio = w / h;
      const imgRatio = iw / ih;

      let sx, sy, sw, sh;
      if (imgRatio > targetRatio) {
        // Image is wider than slot -> crop sides
        sh = ih;
        sw = ih * targetRatio;
        sx = (iw - sw) / 2;
        sy = 0;
      } else {
        // Image is taller than slot -> crop top/bottom
        sw = iw;
        sh = iw / targetRatio;
        sx = 0;
        sy = (ih - sh) / 2;
      }

      ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h);
    } else {
      ctx.fillStyle = '#FAF4EE';
      ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
  }

  // ================= MAIN RENDER LOOP =================
  function renderStudioCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = studioStateRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (s.baseCanvas) {
      ctx.drawImage(s.baseCanvas, 0, 0);
    }

    // Render brush doodles
    s.doodles.forEach(stroke => {
      if (!stroke.points || stroke.points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    });

    // Render active drawing stroke
    if (s.currentStroke && s.currentStroke.points.length > 1) {
      ctx.save();
      ctx.strokeStyle = s.currentStroke.color;
      ctx.lineWidth = s.currentStroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(s.currentStroke.points[0].x, s.currentStroke.points[0].y);
      for (let i = 1; i < s.currentStroke.points.length; i++) {
        ctx.lineTo(s.currentStroke.points[i].x, s.currentStroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // Render placed stickers
    s.stickers.forEach(stk => {
      ctx.save();
      ctx.translate(stk.x + stk.width / 2, stk.y + stk.height / 2);
      ctx.rotate(stk.rotation || 0);

      // Selected highlight ring
      if (s.selectedSticker === stk) {
        ctx.strokeStyle = '#FF1493';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(-stk.width / 2 - 4, -stk.height / 2 - 4, stk.width + 8, stk.height + 8);
      }

      ctx.drawImage(stk.img, -stk.width / 2, -stk.height / 2, stk.width, stk.height);
      ctx.restore();
    });
  }

  // ================= POINTER / TOUCH HANDLERS =================
  function getPointerCanvasPos(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function handlePointerDown(e) {
    const { x, y } = getPointerCanvasPos(e);
    const s = studioStateRef.current;

    // Check sticker selection
    let clickedStk = null;
    for (let i = s.stickers.length - 1; i >= 0; i--) {
      const stk = s.stickers[i];
      if (x >= stk.x && x <= stk.x + stk.width && y >= stk.y && y <= stk.y + stk.height) {
        clickedStk = stk;
        break;
      }
    }

    if (clickedStk) {
      s.selectedSticker = clickedStk;
      s.isDraggingSticker = true;
      s.dragStart = { x: x - clickedStk.x, y: y - clickedStk.y };
      renderStudioCanvas();
      return;
    }

    s.selectedSticker = null;

    if (activeTab === 'pen') {
      s.isDrawing = true;
      s.currentStroke = {
        color: brushColor,
        size: brushSize,
        points: [{ x, y }]
      };
    }
  }

  function handlePointerMove(e) {
    const { x, y } = getPointerCanvasPos(e);
    const s = studioStateRef.current;

    if (s.isDraggingSticker && s.selectedSticker) {
      s.selectedSticker.x = x - s.dragStart.x;
      s.selectedSticker.y = y - s.dragStart.y;
      renderStudioCanvas();
    } else if (s.isDrawing && s.currentStroke) {
      s.currentStroke.points.push({ x, y });
      renderStudioCanvas();
    }
  }

  function handlePointerUp() {
    const s = studioStateRef.current;
    if (s.isDrawing && s.currentStroke) {
      s.doodles.push(s.currentStroke);
      s.currentStroke = null;
    }
    s.isDrawing = false;
    s.isDraggingSticker = false;
  }

  function addSticker(stk) {
    sfx.playStamp();
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = getStickerDataUrl(stk.svg);
    img.onload = () => {
      const size = stk.category === 'speech' ? 90 : 70;
      const w = stk.category === 'speech' ? 120 : size;
      const h = stk.category === 'speech' ? 52 : size;

      studioStateRef.current.stickers.push({
        id: stk.id + '_' + Date.now(),
        img,
        x: (canvas.width - w) / 2 + (Math.random() - 0.5) * 40,
        y: (canvas.height - h) / 2 + (Math.random() - 0.5) * 40,
        width: w,
        height: h,
        rotation: (Math.random() - 0.5) * 0.15
      });
      renderStudioCanvas();
    };
  }

  function addCustomTextStamp() {
    if (!customText.trim()) return;
    sfx.playStamp();
    const canvas = canvasRef.current;
    const txt = customText.trim();

    const svg = `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="152" height="42" rx="10" fill="#162846" stroke="#CBD5E1" stroke-width="2.5"/>
      <rect x="8" y="8" width="144" height="34" rx="7" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="80" y="31" font-family="'Zen Maru Gothic', sans-serif" font-weight="900" font-size="16" fill="#F8FAFC" text-anchor="middle">★ ${txt} ★</text>
    </svg>`;

    const img = new Image();
    img.src = getStickerDataUrl(svg);
    img.onload = () => {
      studioStateRef.current.stickers.push({
        id: 'custom_text_' + Date.now(),
        img,
        x: (canvas.width - 130) / 2,
        y: canvas.height / 2 - 25,
        width: 130,
        height: 44,
        rotation: -0.05
      });
      renderStudioCanvas();
    };
    setCustomText('');
  }

  function clearAllDecorations() {
    sfx.playClick();
    studioStateRef.current.doodles = [];
    studioStateRef.current.stickers = [];
    studioStateRef.current.selectedSticker = null;
    renderStudioCanvas();
  }

  function finishAndSave() {
    sfx.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    studioStateRef.current.selectedSticker = null;
    renderStudioCanvas();

    const finalDataUrl = canvas.toDataURL('image/png');
    onFinishStudio(finalDataUrl);
  }

  return (
    <section className="studio-section">
      <div className="studio-container">
        {/* Strip Preview Desk */}
        <div className="studio-desk kawaii-card">
          <canvas
            ref={canvasRef}
            className="studio-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </div>

        {/* Tools Palette Sidebar */}
        <aside className="studio-tools kawaii-card">
          {/* Tool Tabs */}
          <div className="tool-tabs">
            <button
              className={`tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('stickers');
              }}
            >
              🌸 Stiker
            </button>
            <button
              className={`tab-btn ${activeTab === 'pen' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('pen');
              }}
            >
              ✏️ Kuas
            </button>
            <button
              className={`tab-btn ${activeTab === 'frames' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('frames');
              }}
            >
              🖼️ Bingkai
            </button>
            <button
              className={`tab-btn ${activeTab === 'filters' ? 'active' : ''}`}
              onClick={() => {
                sfx.playClick();
                setActiveTab('filters');
              }}
            >
              🎨 Filter
            </button>
          </div>

          {/* TAB 1: STICKERS */}
          {activeTab === 'stickers' && (
            <div className="tab-body">
              <span className="tool-hint">Klik stiker untuk menempelkan ke foto:</span>
              <div className="stickers-grid">
                {STICKERS.map(stk => (
                  <button
                    key={stk.id}
                    className="btn-sticker-item"
                    onClick={() => addSticker(stk)}
                    title={stk.name}
                  >
                    <div
                      className="sticker-thumb"
                      dangerouslySetInnerHTML={{ __html: stk.svg }}
                    />
                    <span className="sticker-name">{stk.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom Text Stamp */}
              <div className="custom-stamp-box">
                <span className="tool-hint">Tulis Teks Stempel Kustom:</span>
                <div className="stamp-input-wrap">
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="BESTIES 2026"
                    maxLength={15}
                    className="stamp-input"
                  />
                  <button className="btn-kawaii btn-primary btn-sm" onClick={addCustomTextStamp}>
                    + Tempel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PASTEL BRUSH */}
          {activeTab === 'pen' && (
            <div className="tab-body">
              <span className="tool-hint">Pilih Warna Coretan Pastel:</span>
              <div className="color-swatches-grid">
                {BRUSH_COLORS.map(c => (
                  <button
                    key={c.id}
                    className={`color-swatch ${brushColor === c.color ? 'active' : ''}`}
                    style={{ backgroundColor: c.color }}
                    onClick={() => {
                      sfx.playClick();
                      setBrushColor(c.color);
                    }}
                    title={c.name}
                  />
                ))}
              </div>

              <div className="brush-size-group">
                <span className="tool-hint">Ketebalan Kuas: {brushSize}px</span>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={brushSize}
                  onChange={e => setBrushSize(parseInt(e.target.value, 10))}
                  className="range-input"
                />
              </div>

              <button className="btn-kawaii btn-secondary btn-sm" onClick={clearAllDecorations} style={{ marginTop: '12px' }}>
                <span>Hapus Semua Coretan & Stiker 🗑️</span>
              </button>
            </div>
          )}

          {/* TAB 3: THEMED FRAMES */}
          {activeTab === 'frames' && (
            <div className="tab-body">
              <span className="tool-hint">Ganti Tema Bingkai Strip:</span>
              <div className="frames-list">
                {FRAME_STYLES.map(fr => (
                  <button
                    key={fr.id}
                    className={`frame-option-btn ${frameStyle === fr.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setFrameStyle(fr.id);
                    }}
                  >
                    <span className="frame-icon-badge">{fr.icon}</span>
                    <div className="frame-meta">
                      <strong>{fr.name}</strong>
                      <small>{fr.sub}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CAMERA PHOTO FILTERS */}
          {activeTab === 'filters' && (
            <div className="tab-body">
              <span className="tool-hint">Ganti Efek Warna Foto (Live Filter):</span>
              <div className="frames-list">
                {FILTERS.map(f => (
                  <button
                    key={f.id}
                    className={`frame-option-btn ${filter === f.id ? 'active' : ''}`}
                    onClick={() => {
                      sfx.playClick();
                      setFilter(f.id);
                    }}
                  >
                    <span className="frame-icon-badge">{f.icon}</span>
                    <div className="frame-meta">
                      <strong>{f.name}</strong>
                      <small>{f.sub}</small>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Finish & Save Button */}
          <div className="studio-footer-cta">
            <button className="btn-kawaii btn-primary btn-finish-strip" onClick={finishAndSave}>
              <span>Selesai & Lanjut Simpan 📸</span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
