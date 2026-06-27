import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarField from "../components/StarField";
import { registerUser, loginUser } from "../services/registerService"; 

function Register() {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  
  // Simplified state fields for kids: just name and age
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    console.log("Sending payload to FastAPI:", { name: formData.name, age: formData.age });

    try {
      let responseData;
      
      // Both login and registration modes call our unified service function
      if (isLoginMode) {
        responseData = await loginUser({
          name: formData.name,
          age: formData.age
        });
      } else {
        responseData = await registerUser({
          name: formData.name,
          age: formData.age
        });
      }

      console.log("FastAPI Backend Response Data:", responseData);

      // Save user metrics returned from your Python backend array matching schemas perfectly
      localStorage.setItem("user_id", responseData.id);
      localStorage.setItem("username", responseData.name);
      localStorage.setItem("user_xp", responseData.xp ?? "0");
      localStorage.setItem("user_level", responseData.level ?? "1");
      localStorage.setItem("user_streak", responseData.streak ?? "1");

      // Success! Move right onto the dashboard profile layout
      navigate("/dashboard");

    } catch (error) {
      console.error("Auth Failure Endpoint details:", error);
      setErrorMsg(
        error.response?.data?.detail || 
        "Connection failed! Please make sure the backend is running properly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <StarField stars={80} />
      
      <motion.div 
        className="register-card"
        style={{ maxWidth: "420px", width: "90%", padding: "35px", background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ fontSize: "55px", marginBottom: "10px", textAlign: "center" }}>
          {isLoginMode ? "🚀" : "🪐"}
        </div>
        
        <h1 style={{ fontSize: "28px", textAlign: "center", marginBottom: "8px", color: "#fff" }}>
          {isLoginMode ? "Welcome Back!" : "Start Your Adventure"}
        </h1>
        
        <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: "25px", fontSize: "14px" }}>
          {isLoginMode ? "Enter your details to jump back into the game" : "Create an explorer profile to track your scores!"}
        </p>

        {errorMsg && (
          <div style={{ background: "rgba(255, 77, 77, 0.15)", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", textAlign: "center" }}>
            ❌ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* NAME FIELD */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: "600" }}>Explorer Name</label>
            <input 
              type="text"
              name="name"
              placeholder="What is your name?"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "15px" }}
            />
          </div>

          {/* AGE FIELD */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: "600" }}>Your Age</label>
            <input 
              type="number"
              name="age"
              placeholder="How old are you?"
              value={formData.age}
              onChange={handleInputChange}
              required
              min="1"
              max="99"
              style={{ width: "100%", padding: "14px", borderRadius: "10px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "15px" }}
            />
          </div>

          {/* DYNAMIC PRIMARY BUTTON */}
          <button 
            type="submit" 
            className="primary-btn" 
            disabled={loading}
            style={{ width: "100%", padding: "16px", fontSize: "16px", marginTop: "10px", fontWeight: "bold", background: "#00e5ff", border: "none", borderRadius: "10px", color: "#000", cursor: "pointer" }}
          >
            {loading ? "Connecting to Station... 📡" : isLoginMode ? "🎮 Let's Play!" : "✨ Create Profile"}
          </button>
        </form>

        {/* RE-ENTRY CHANGER NAVIGATION LINKS */}
        <div style={{ marginTop: "25px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "15px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: 0 }}>
            {isLoginMode ? "New explorer?" : "Played before?"}{" "}
            <span 
              style={{ color: "#00e5ff", cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setErrorMsg("");
              }}
            >
              {isLoginMode ? "Register here" : "Login here"}
            </span>
          </p>
        </div>

      </motion.div>
    </div>
  );
}

// Clear of all function definitions at the absolute structural root base
export default Register;