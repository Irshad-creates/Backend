import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const lastExpressionRef = useRef("");
  const lastTriggerTime = useRef(0);

  const [expression, setExpression] = useState("Detecting...");

  // 🎵 Simple Audio (replace with your own songs)
  const audioRef = useRef(new Audio("/song.mp3"));

  useEffect(() => {
    let stream;

    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      detect();
    };

    const detect = () => {
      if (!landmarkerRef.current || !videoRef.current) return;

      const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        videoRef.current.currentTime * 1000
      );

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
          blendshapes.find((b) => b.categoryName === name)?.score || 0;

        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        let currentExpression = "Neutral 😐";

        // ✅ Improved stable logic
        if (smileLeft + smileRight > 1.0) {
          currentExpression = "Happy 😄";
        } else if (jawOpen > 0.6 && browUp > 0.4) {
          currentExpression = "Surprised 😲";
        } else if (frownLeft + frownRight > 1.0) {
          currentExpression = "Sad 😢";
        }

        // ✅ Prevent re-render spam
        if (currentExpression !== lastExpressionRef.current) {
          setExpression(currentExpression);
          lastExpressionRef.current = currentExpression;

          handleMusicControl(currentExpression);
        }
      }

      animationRef.current = requestAnimationFrame(detect);
    };

    // 🎵 Expression → Music Control (with cooldown)
    const handleMusicControl = (exp) => {
      const now = Date.now();

      if (now - lastTriggerTime.current < 1500) return;

      if (exp === "Happy 😄") {
        audioRef.current.play();
      } else if (exp === "Sad 😢") {
        audioRef.current.pause();
      } else if (exp === "Surprised 😲") {
        audioRef.current.currentTime += 10; // skip forward
      }

      lastTriggerTime.current = now;
    };

    init();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          style={{
            width: "400px",
            borderRadius: "12px",
          }}
          playsInline
        />

        {/* 🔥 Overlay Expression */}
        <h2
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            background: "rgba(0,0,0,0.5)",
            padding: "6px 12px",
            borderRadius: "8px",
          }}
        >
          {expression}
        </h2>
      </div>
    </div>
  );
}