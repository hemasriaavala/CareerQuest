import { useEffect, useRef, useState } from "react";
import axios from "axios";

function CameraPreview({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setError("");
    } catch (err) {
      console.error("Webcam stream allocation error:", err);
      setError("Camera access denied.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || isUploading) return;

    // Set dimensional parameters matching the raw hardware video capture feed
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Snapshot the exact stream frame onto the hidden canvas element
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Turn frame array data into a text string representation package
    const imageBase64 = canvas.toDataURL("image/jpeg");

    try {
      setIsUploading(true);

      // Create a Form Data payload configuration to match backend Form requirements
      const formData = new FormData();
      formData.append("image_base64", imageBase64);

      // 📡 Hit the camera endpoint on your FastAPI server
      const response = await axios.post("http://127.0.0.1:8000/camera/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Success! 🚀", response.data);

      // Fire original structural callbacks if any exist on higher levels
      if (onCapture) {
        onCapture(response.data);
      }
      
      alert("📸 Photo captured and synced successfully!");
    } catch (err) {
      console.error("Failed uploading snap data package:", err);
      alert("Failed syncing capture to backend storage server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="camera-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
      {error ? (
        <div className="mission-box" style={{ textAlign: "center", padding: "20px" }}>
          <h2>📷 Camera Error</h2>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>{error}</p>
          <button className="primary-btn" onClick={startCamera}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-preview"
            style={{ width: "100%", borderRadius: "12px", background: "#000", transform: "scaleX(-1)" }}
          />

          <button
            className="primary-btn"
            onClick={capturePhoto}
            disabled={isUploading}
            style={{
              padding: "12px 24px",
              background: isUploading 
                ? "rgba(255,255,255,0.15)" 
                : "linear-gradient(45deg, #00e5ff, #6366f1)",
              color: isUploading ? "rgba(255,255,255,0.3)" : "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isUploading ? "not-allowed" : "pointer",
              boxShadow: isUploading ? "none" : "0 4px 15px rgba(0, 229, 255, 0.2)",
              transition: "all 0.2s ease"
            }}
          >
            {isUploading ? "⚡ Processing Upload..." : "📸 Capture Photo"}
          </button>
        </>
      )}

      {/* Hidden processing element used to turn data frames into standard file packages */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

export default CameraPreview;