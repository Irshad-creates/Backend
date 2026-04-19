import { useEffect, useRef, useState } from "react";
import { initLandmarker, detectExpression } from "../utils/utils";

export default function FaceExpression() {
  const videoRef      = useRef(null);
  const landmarkerRef = useRef(null);

  const [expression, setExpression] = useState("");
  const [isReady, setIsReady]       = useState(false);

  useEffect(() => {
    let stream;

    (async () => {
      landmarkerRef.current = await initLandmarker();
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setIsReady(true);
    })();

    return () => {
      landmarkerRef.current?.close();
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleDetect = () => {
    const exp = detectExpression(landmarkerRef.current, videoRef.current);
    setExpression(exp);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <video ref={videoRef} style={{ width: "400px", borderRadius: "12px" }} playsInline />
        {expression && (
          <h2 style={{
            position: "absolute", bottom: "10px", left: "50%",
            transform: "translateX(-50%)", color: "white",
            background: "rgba(0,0,0,0.5)", padding: "6px 12px",
            borderRadius: "8px", whiteSpace: "nowrap",
          }}>
            {expression}
          </h2>
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        <button
          onClick={handleDetect}
          disabled={!isReady}
          style={{
            padding: "10px 24px", fontSize: "16px", borderRadius: "8px",
            border: "none", fontWeight: "600",
            cursor: isReady ? "pointer" : "not-allowed",
            background: isReady ? "#2ecc71" : "#aaa", color: "white",
          }}
        >
          {isReady ? "Detect Expression" : "Loading..."}
        </button>
      </div>
    </div>
  );
}