import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

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

// ── Raw single-frame classifier ────────────────────────────────────────────
function classifyFrame(landmarker, video) {
  const results = landmarker.detectForVideo(video, performance.now());

  if (!results.faceBlendshapes?.length) return "No face detected 👤";

  const blendshapes = results.faceBlendshapes[0].categories;
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score ?? 0;

  const smileLeft     = get("mouthSmileLeft");
  const smileRight    = get("mouthSmileRight");
  const jawOpen       = get("jawOpen");
  const browUp        = get("browInnerUp");
  const frownLeft     = get("mouthFrownLeft");
  const frownRight    = get("mouthFrownRight");
  const browDownLeft  = get("browDownLeft");
  const browDownRight = get("browDownRight");
  const mouthPucker   = get("mouthPucker");
  const cheekSquint   = get("cheekSquintLeft") + get("cheekSquintRight");

  const smile    = (smileLeft + smileRight) / 2;
  const frown    = (frownLeft + frownRight) / 2;
  const browDown = (browDownLeft + browDownRight) / 2;

  if (jawOpen > 0.25 && browUp > 0.2)                                        return "surprised";
  if (smile > 0.25 || (smile > 0.15 && cheekSquint > 0.3))                  return "happy";
  if (frown > 0.12 || browDown > 0.20 || (mouthPucker > 0.2 && frown > 0.08)) return "sad";
  return "neutral";
}

// ── Main export: samples N frames spread over ~150ms, picks the majority ───
// This replaces the old cross-click history smoothing which caused lag.
const SAMPLE_COUNT = 5;
const SAMPLE_DELAY = 30; // ms between samples

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function detectExpression(landmarker, video) {
  const votes = {};

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const label = classifyFrame(landmarker, video);
    votes[label] = (votes[label] || 0) + 1;
    if (i < SAMPLE_COUNT - 1) await wait(SAMPLE_DELAY);
  }

  // Return whichever label won the most frames
  return Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];
}