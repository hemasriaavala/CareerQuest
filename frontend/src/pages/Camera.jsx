import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { uploadPhoto } from "../services/camera";

function Camera() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🎥 Turn on camera streaming instantly when the screen is mounted
  useEffect(() => {
    startCamera();

    // Clean up tracks when navigating away
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access failed:", error);
      alert("Unable to access camera hardware. Please check browser permissions.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Freeze frame by rendering video frame to hidden canvas context layer
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCaptured(true);
  };

  const retake = () => {
    setCaptured(false);
    setTimeout(() => {
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
    }, 50);
  };

  const submit = async () => {
    try {
      setLoading(true);
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Extract raw image string
      const imageBase64 = canvas.toDataURL("image/jpeg");
      
      // Pull context tracking keys
      const userId = Number(localStorage.getItem("user_id")) || 1;

      // Pack multi-part data payload key values matching backend routing requirements
      const formData = new FormData();
      formData.append("image_base64", imageBase64);
      formData.append("user_id", userId);

      // Transmit directly to api/camera.py 🚀
      const backendResponse = await uploadPhoto(formData);

      // Store evaluation response containing real dynamic score updates
      localStorage.setItem("result", JSON.stringify(backendResponse));

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Navigate to your results summary page
      navigate("/result");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Could not connect to the backend server to evaluate task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <div className="dashboard-card" style={{ maxWidth: "500px", width: "100%", textAlign: "center", padding: "30px" }}>
        <h1 className="page-title">📸 Mission Camera</h1>

        <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#1a1b2e", borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              transform: "scaleX(-1)",
              display: captured ? "none" : "block" 
            }}
          />
          
          <canvas
            ref={canvasRef}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: captured ? "block" : "none" 
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {!captured ? (
            <button 
              className="primary-btn" 
              onClick={capturePhoto}
              style={{ padding: "12px 24px", background: "linear-gradient(45deg, #00e5ff, #6366f1)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              📸 Take Snapshot
            </button>
          ) : (
            <>
              <button className="secondary-btn" onClick={retake} disabled={loading} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                🔄 Retake
              </button>
              <button className="primary-btn" onClick={submit} disabled={loading} style={{ padding: "12px 24px", background: "linear-gradient(45deg, #4ade80, #22c55e)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                {loading ? "⚡ Evaluating..." : "🚀 Submit Mission"}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Camera;