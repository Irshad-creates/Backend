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

export function detectExpression(landmarker, video) {
  const results = landmarker.detectForVideo(video, performance.now());

  if (!results.faceBlendshapes?.length) return "No face detected 👤";

  const blendshapes = results.faceBlendshapes[0].categories;
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft    = get("mouthSmileLeft");
  const smileRight   = get("mouthSmileRight");
  const jawOpen      = get("jawOpen");
  const browUp       = get("browInnerUp");
  const frownLeft    = get("mouthFrownLeft");
  const frownRight   = get("mouthFrownRight");
  const browDownLeft = get("browDownLeft");
  const browDownRight= get("browDownRight");
  const mouthPucker  = get("mouthPucker");

  if (smileLeft + smileRight > 1.0)           return "Happy 😄";
  if (jawOpen > 0.6 && browUp > 0.4)          return "Surprised 😲";
  if (
    frownLeft + frownRight > 0.3 ||
    browDownLeft + browDownRight > 0.5 ||
    (mouthPucker > 0.3 && frownLeft + frownRight > 0.2) ||
    (browDownLeft + browDownRight > 0.3 && frownLeft + frownRight > 0.2)
  )                                            return "Sad 😢";

  return "Neutral 😐";
}