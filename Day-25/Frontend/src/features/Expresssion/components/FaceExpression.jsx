
import { useEffect, useRef, useState, useCallback } from "react";
import { initLandmarker, detectExpression } from "../utils/utils";

export default function FaceExpression() {
  const videoRef      = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef     = useRef(null);
  const rafRef        = useRef(null);          // requestAnimationFrame handle
  const mountedRef    = useRef(false);

  const [expression, setExpression] = useState("");
  const [isReady, setIsReady]       = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError]           = useState("");

  // ── Continuous detection loop ──────────────────────────────────────────
  // Runs every animation frame so the expression updates in real-time
  // instead of requiring a button press each time.
  const startDetectionLoop = useCallback(() => {
    const loop = () => {
      if (!mountedRef.current) return;
      if (landmarkerRef.current && videoRef.current?.readyState >= 2) {
        const exp = detectExpression(landmarkerRef.current, videoRef.current);
        setExpression(exp);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const stopDetectionLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // ── Cleanup on unmount ─────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopDetectionLoop();
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [stopDetectionLoop]);

  // ── Error helpers ──────────────────────────────────────────────────────
  const getCameraErrorMessage = (err) => {
    if (!window.isSecureContext)
      return "Camera access needs a secure site. Use localhost or HTTPS.";
    if (err?.name === "NotAllowedError")
      return "Camera permission was denied. Check the browser camera setting in the address bar and allow access.";
    if (err?.name === "NotFoundError")
      return "No camera was found on this device.";
    if (err?.name === "NotReadableError")
      return "Your camera is busy in another app or tab. Close it there and try again.";
    return "Unable to start the camera right now. Please try again.";
  };

  // ── Start camera + landmarker ──────────────────────────────────────────
  const handleStartCamera = async () => {
    if (isStarting || isReady) return;
    setIsStarting(true);
    setError("");
    setExpression("");

    try {
      if (!navigator.mediaDevices?.getUserMedia)
        throw new Error("Camera API is not available in this browser.");

      if (!landmarkerRef.current)
        landmarkerRef.current = await initLandmarker();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (!mountedRef.current || !videoRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current          = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setIsReady(true);
      startDetectionLoop();          // ← kick off the live loop
    } catch (err) {
      console.error("Failed to start face expression detection:", err);
      setIsReady(false);
      setError(
        err?.message === "Camera API is not available in this browser."
          ? err.message
          : getCameraErrorMessage(err)
      );
    } finally {
      if (mountedRef.current) setIsStarting(false);
    }
  };

  // ── Stop everything ────────────────────────────────────────────────────
  const handleStop = () => {
    stopDetectionLoop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current          = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsReady(false);
    setExpression("");
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <video
          ref={videoRef}
          style={{ width: "400px", borderRadius: "12px" }}
          playsInline
        />
        {expression && (
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
              whiteSpace: "nowrap",
            }}
          >
            {expression}
          </h2>
        )}
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "12px", justifyContent: "center" }}>
        {!isReady ? (
          <button
            onClick={handleStartCamera}
            disabled={isStarting}
            style={{
              padding: "10px 24px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: isStarting ? "not-allowed" : "pointer",
              background: "#3498db",
              color: "white",
            }}
          >
            {isStarting ? "Starting..." : "Start Camera"}
          </button>
        ) : (
          <button
            onClick={handleStop}
            style={{
              padding: "10px 24px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              background: "#e74c3c",
              color: "white",
            }}
          >
            Stop
          </button>
        )}
      </div>

      {error && (
        <p
          style={{
            color: "#c0392b",
            marginTop: "12px",
            maxWidth: "420px",
            marginInline: "auto",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
