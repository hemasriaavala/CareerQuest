import { useRef, useState } from "react";
import axios from "axios";

function useCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing the webcam hardware:", err);
      alert("Could not access camera. Please check your system permissions.");
    }
  };

  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || isUploading) return null;

    // Set canvas dimensions matching the streaming video feed resolution
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Draw the current video frame onto our hidden canvas context matrix
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas pixels into a standard Base64 Data URL string
    const imageBase64 = canvas.toDataURL("image/jpeg");

    try {
      setIsUploading(true);

      // Wrap the Base64 text string inside a Form Data payload package
      const formData = new FormData();
      formData.append("image_base64", imageBase64);

      // 📡 Transmit directly to your running FastAPI local instance server
      const response = await axios.post("http://127.0.0.1:8000/camera/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Backend Sync Successful! 🎉", response.data);
      alert("📸 Photo captured and saved successfully!");
      return response.data; // Returns the backend dictionary data containing file paths
    } catch (err) {
      console.error("Error sending captured package to server:", err);
      alert("Failed to upload the photo to the backend storage.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    videoRef,
    canvasRef,
    startCamera,
    capturePhoto,
    isUploading, // Expose this flag so your frontend buttons can show loading states!
  };
}

export default useCamera;