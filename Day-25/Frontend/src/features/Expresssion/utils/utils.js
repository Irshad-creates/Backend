
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { useState } from "react";

const [expression, setExpression] = useState(null)

export async function initLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  return await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });
}

// --- Smoothing state ---
// Keeps a rolling history of the last N raw expression scores per label
// and only commits to a new expression if it wins consistently.
const HISTORY_SIZE = 6;          // frames to look back
const CONFIRM_THRESHOLD = 4;     // must win this many of the last N frames
const expressionHistory = [];    // array of expression strings (most-recent last)

function pushHistory(label) {
  expressionHistory.push(label);
  if (expressionHistory.length > HISTORY_SIZE) expressionHistory.shift();
}

function smoothedExpression(raw) {
  pushHistory(raw);

  // Count how many of the recent frames agree with the raw label
  const votes = expressionHistory.filter((e) => e === raw).length;
  if (votes >= CONFIRM_THRESHOLD) return raw;

  // Otherwise return whatever the current confirmed majority is
  const counts = {};
  for (const e of expressionHistory) counts[e] = (counts[e] || 0) + 1;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// --- Expression detection ---
export function detectExpression(landmarker, video) {
  const results = landmarker.detectForVideo(video, performance.now());

  if (!results.faceBlendshapes?.length) return "No face detected 👤";

  const blendshapes = results.faceBlendshapes[0].categories;
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score ?? 0;

  // ── Core blendshape scores ──────────────────────────────────────────────
  const smileLeft    = get("mouthSmileLeft");
  const smileRight   = get("mouthSmileRight");
  const jawOpen      = get("jawOpen");
  const browUp       = get("browInnerUp");
  const frownLeft    = get("mouthFrownLeft");
  const frownRight   = get("mouthFrownRight");
  const browDownLeft = get("browDownLeft");
  const browDownRight= get("browDownRight");
  const mouthPucker  = get("mouthPucker");
  const cheekSquint  = get("cheekSquintLeft") + get("cheekSquintRight");

  // ── Composite scores ────────────────────────────────────────────────────
  const smile  = (smileLeft + smileRight) / 2;   // 0-1 per side → average
  const frown  = (frownLeft + frownRight) / 2;
  const browDown = (browDownLeft + browDownRight) / 2;

  // ── Decision logic (ordered most→least expressive) ─────────────────────

  // SURPRISED — a small jaw drop + raised brows; no need for a gaping mouth
  // Real surprise: eyebrows shoot up, jaw drops a bit. Lowered thresholds.
  if (jawOpen > 0.25 && browUp > 0.2) {
    return smoothedExpression("Surprised 😲");
  }

  // HAPPY — a gentle smile is enough; cheek squint confirms it
  // Avg smile > 0.25 catches a normal relaxed smile.
  // Bonus path: cheekSquint helps catch smiling with closed mouth.
  else if (smile > 0.25 || (smile > 0.15 && cheekSquint > 0.3)) {
    return smoothedExpression("Happy 😄");
  }

  // SAD — frown OR brow furrow alone is enough; no need to exaggerate both
  // browDown > 0.2 catches a subtle furrow.
  // frown > 0.12 catches a mild downturn of the mouth corners.
  else if (
    frown > 0.12 ||
    browDown > 0.20 ||
    (mouthPucker > 0.2 && frown > 0.08)
  ) {
    return smoothedExpression("Sad 😢");
  }
  else {
    return smoothedExpression("Neutral 😐")
  }
  
  setExpression(smoothedExpression)

  return expression

}