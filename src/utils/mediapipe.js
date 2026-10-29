// MediaPipe Tasks Vision Hands Manager & Robust Gesture Recognizer
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

let landmarkerInstance = null;
let isLoading = false;

export const LM = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_PIP: 6,
  INDEX_DIP: 7,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_PIP: 10,
  MIDDLE_DIP: 11,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_PIP: 14,
  RING_DIP: 15,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20
};

export const PINCH_THRESHOLD = 0.082;

export function dist2D(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export async function getHandLandmarker(onStatusUpdate) {
  if (landmarkerInstance) return landmarkerInstance;
  if (isLoading) return null;

  isLoading = true;
  if (onStatusUpdate) onStatusUpdate("loading", "Memuat AI Sensor...");

  try {
    const resolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
    );

    try {
      landmarkerInstance = await HandLandmarker.createFromOptions(resolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 2
      });
      console.log("MediaPipe HandLandmarker ready on GPU!");
      if (onStatusUpdate) onStatusUpdate("ready", "AI Sensor Aktif 🌸");
    } catch (gpuErr) {
      console.warn("GPU delegate fallback to CPU:", gpuErr);
      landmarkerInstance = await HandLandmarker.createFromOptions(resolver, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "CPU"
        },
        runningMode: "VIDEO",
        numHands: 2
      });
      console.log("MediaPipe HandLandmarker ready on CPU!");
      if (onStatusUpdate) onStatusUpdate("ready", "AI Sensor Aktif 🌸");
    }
  } catch (err) {
    console.error("Failed to load HandLandmarker:", err);
    if (onStatusUpdate) onStatusUpdate("error", "Mode Manual (Klik Tombol)");
  } finally {
    isLoading = false;
  }

  return landmarkerInstance;
}

// Mirror raw camera landmarks to match standard selfie mirror view
export function mirrorLandmarks(rawHands) {
  if (!rawHands) return [];
  return rawHands.map(hand =>
    hand.map(pt => ({
      x: 1 - pt.x,
      y: pt.y,
      z: pt.z
    }))
  );
}

// Check if a finger is curled towards the wrist (rotation-invariant)
export function isFingerCurled(lm, tipIdx, mcpIdx) {
  const wrist = lm[LM.WRIST];
  return dist2D(lm[tipIdx], wrist) < dist2D(lm[mcpIdx], wrist) * 1.05;
}

// Check if a finger is extended away from wrist (rotation-invariant)
export function isFingerExtended(lm, tipIdx, mcpIdx) {
  const wrist = lm[LM.WRIST];
  return dist2D(lm[tipIdx], wrist) > dist2D(lm[mcpIdx], wrist) * 1.15;
}

// Check Pinch gesture (distance between Thumb Tip & Index Tip)
export function isPinching(lm) {
  return dist2D(lm[LM.THUMB_TIP], lm[LM.INDEX_TIP]) < PINCH_THRESHOLD;
}

// Check Fist gesture (at least 3 fingers curled)
export function isFist(lm) {
  const wrist = lm[LM.WRIST];
  const pairs = [
    [LM.INDEX_TIP, LM.INDEX_MCP],
    [LM.MIDDLE_TIP, LM.MIDDLE_MCP],
    [LM.RING_TIP, LM.RING_MCP],
    [LM.PINKY_TIP, LM.PINKY_MCP]
  ];
  let curledCount = 0;
  for (const [tip, mcp] of pairs) {
    if (dist2D(lm[tip], wrist) < dist2D(lm[mcp], wrist) * 1.05) curledCount++;
  }
  return curledCount >= 3;
}

// Check Peace gesture (Index & Middle extended, Ring & Pinky curled)
export function isPeace(lm) {
  const indexExt = isFingerExtended(lm, LM.INDEX_TIP, LM.INDEX_MCP);
  const middleExt = isFingerExtended(lm, LM.MIDDLE_TIP, LM.MIDDLE_MCP);
  const ringCurled = isFingerCurled(lm, LM.RING_TIP, LM.RING_MCP);
  const pinkyCurled = isFingerCurled(lm, LM.PINKY_TIP, LM.PINKY_MCP);
  return indexExt && middleExt && ringCurled && pinkyCurled;
}

// Check Open Palm gesture (all 4 main fingers extended)
export function isPalm(lm) {
  const indexExt = isFingerExtended(lm, LM.INDEX_TIP, LM.INDEX_MCP);
  const middleExt = isFingerExtended(lm, LM.MIDDLE_TIP, LM.MIDDLE_MCP);
  const ringExt = isFingerExtended(lm, LM.RING_TIP, LM.RING_MCP);
  const pinkyExt = isFingerExtended(lm, LM.PINKY_TIP, LM.PINKY_MCP);
  return indexExt && middleExt && ringExt && pinkyExt;
}

// Check Pointing gesture (Index extended, others curled)
export function isPointing(lm) {
  const indexExt = isFingerExtended(lm, LM.INDEX_TIP, LM.INDEX_MCP);
  const middleCurled = isFingerCurled(lm, LM.MIDDLE_TIP, LM.MIDDLE_MCP);
  const ringCurled = isFingerCurled(lm, LM.RING_TIP, LM.RING_MCP);
  return indexExt && middleCurled && ringCurled;
}

/**
 * Recognize gestures from detected hand landmarks with full rotation tolerance
 * @param {Array} rawHands - Raw hand landmarks from MediaPipe
 * @returns {Object} gesture analysis
 */
export function analyzeGestures(rawHands) {
  if (!rawHands || rawHands.length === 0) {
    return {
      gesture: "none",
      isFrame: false,
      isPeace: false,
      isPalm: false,
      isPinch: false,
      isFist: false,
      isPointing: false,
      handPos: { x: -1, y: -1 },
      mirroredHands: [],
      frameBox: null
    };
  }

  // Pre-mirror all hands so everything matches the selfie view
  const mirroredHands = mirrorLandmarks(rawHands);

  let isFrameGesture = false;
  let isPeaceGesture = false;
  let isPalmGesture = false;
  let isPinchGesture = false;
  let isFistGesture = false;
  let isPointingGesture = false;
  let frameBox = null;

  // 1. TWO-HAND FRAME GESTURE (🫶)
  if (mirroredHands.length >= 2) {
    const handA = mirroredHands[0];
    const handB = mirroredHands[1];

    const idxA = handA[LM.INDEX_TIP];
    const idxB = handB[LM.INDEX_TIP];
    const thmA = handA[LM.THUMB_TIP];
    const thmB = handB[LM.THUMB_TIP];

    const distBetweenHands = dist2D(idxA, idxB);

    // Both pinching corners
    const bothPinching = isPinching(handA) && isPinching(handB);

    // Both L-shaped frame
    const bothL = isFingerExtended(handA, LM.INDEX_TIP, LM.INDEX_MCP) &&
                 isFingerExtended(handB, LM.INDEX_TIP, LM.INDEX_MCP) &&
                 isFingerCurled(handA, LM.PINKY_TIP, LM.PINKY_MCP) &&
                 isFingerCurled(handB, LM.PINKY_TIP, LM.PINKY_MCP);

    // Hand Heart (🫶): Thumbs close together and index tips close together
    const thumbDist = dist2D(thmA, thmB);
    const indexDist = dist2D(idxA, idxB);
    const isHeart = thumbDist < 0.16 && indexDist < 0.22 && idxA.y < thmA.y + 0.1;

    if ((bothPinching && distBetweenHands > 0.1) || (bothL && distBetweenHands > 0.12) || isHeart) {
      isFrameGesture = true;
      const minX = Math.min(idxA.x, idxB.x, thmA.x, thmB.x) - 0.06;
      const maxX = Math.max(idxA.x, idxB.x, thmA.x, thmB.x) + 0.06;
      const minY = Math.min(idxA.y, idxB.y, thmA.y, thmB.y) - 0.06;
      const maxY = Math.max(idxA.y, idxB.y, thmA.y, thmB.y) + 0.06;

      frameBox = {
        x: Math.max(0, minX),
        y: Math.max(0, minY),
        width: Math.min(1 - Math.max(0, minX), maxX - minX),
        height: Math.min(1 - Math.max(0, minY), maxY - minY)
      };
    }
  }

  // 2. Primary Hand Analysis (Index 0)
  const primaryHand = mirroredHands[0];
  const idxTip = primaryHand[LM.INDEX_TIP];
  const thmTip = primaryHand[LM.THUMB_TIP];

  // Mirrored hand cursor position (already in 0..1 coordinate system)
  const handPos = {
    x: idxTip.x,
    y: idxTip.y
  };

  isPinchGesture = isPinching(primaryHand);
  isFistGesture = isFist(primaryHand);
  isPointingGesture = isPointing(primaryHand);

  // 3. Single-hand Poses across any detected hand
  for (const hand of mirroredHands) {
    if (isPeace(hand)) {
      isPeaceGesture = true;
    }
    if (isPalm(hand)) {
      isPalmGesture = true;
    }
  }

  let gesture = "none";
  if (isFrameGesture) gesture = "frame";
  else if (isFistGesture) gesture = "fist";
  else if (isPinchGesture) gesture = "pinch";
  else if (isPeaceGesture) gesture = "peace";
  else if (isPalmGesture) gesture = "palm";
  else if (isPointingGesture) gesture = "point";

  return {
    gesture,
    isFrame: isFrameGesture,
    isPeace: isPeaceGesture,
    isPalm: isPalmGesture,
    isPinch: isPinchGesture,
    isFist: isFistGesture,
    isPointing: isPointingGesture,
    handPos,
    mirroredHands,
    frameBox
  };
}

// Draw soft pastel kawaii hand skeleton on canvas using mirrored coordinates
export function drawKawaiiHandSkeleton(ctx, mirroredHands, canvasWidth, canvasHeight, isPinchingHand = false) {
  if (!mirroredHands || mirroredHands.length === 0) return;

  const CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index
    [5, 9], [9, 10], [10, 11], [11, 12], // Middle
    [9, 13], [13, 14], [14, 15], [15, 16], // Ring
    [13, 17], [17, 18], [18, 19], [19, 20], [0, 17] // Pinky & Palm
  ];

  ctx.save();

  mirroredHands.forEach((landmarks, hIdx) => {
    // Soft pastel pink / matcha stroke
    ctx.strokeStyle = isPinchingHand
      ? "rgba(255, 77, 121, 0.9)"
      : "rgba(255, 140, 170, 0.75)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    CONNECTIONS.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(p1.x * canvasWidth, p1.y * canvasHeight);
      ctx.lineTo(p2.x * canvasWidth, p2.y * canvasHeight);
      ctx.stroke();
    });

    // Fingertips & Joints Sakura Pearls
    [0, 4, 8, 12, 16, 20].forEach(tip => {
      const pt = landmarks[tip];
      const px = pt.x * canvasWidth;
      const py = pt.y * canvasHeight;

      ctx.fillStyle = (tip === 4 || tip === 8) && isPinchingHand
        ? "#FF1493"
        : tip === 8
        ? "#FF4D79"
        : "#FFB6C1";

      ctx.beginPath();
      ctx.arc(px, py, tip === 8 ? 8 : 6, 0, Math.PI * 2);
      ctx.fill();

      // Pearl shine
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(px - 2, py - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw cute cursor icon over index fingertip for primary hand
    if (hIdx === 0) {
      const tip = landmarks[LM.INDEX_TIP];
      const cx = tip.x * canvasWidth;
      const cy = tip.y * canvasHeight;

      ctx.save();
      ctx.shadowColor = "rgba(37, 99, 235, 0.7)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = isPinchingHand ? "#162846" : "#2563EB";
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isPinchingHand ? "🤏" : "🌸", cx, cy);
      ctx.restore();
    }
  });

  ctx.restore();
}
