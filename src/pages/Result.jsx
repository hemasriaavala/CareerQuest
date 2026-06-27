import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Try reading from React Router state first
  const { result, mission, score } = location.state || {};

  // 2. Fallback to localStorage values if router state isn't passed
  const finalScore = score || result?.score || Number(localStorage.getItem("score") || 0);
  const earnedXP = result?.xp_earned || Number(localStorage.getItem("earned_xp") || 20);
  const currentLevel = result?.level || Number(localStorage.getItem("user_level") || 1);
  const currentStreak = result?.streak || Number(localStorage.getItem("user_streak") || 0);
  
  // Read current mission context details
  const savedMission = JSON.parse(localStorage.getItem("mission") || "{}");
  const careerName = mission?.career || savedMission.career || "Explorer";
  const gameMode = mission?.gameType || savedMission.gameType || "Challenge";
  const rawStatus = localStorage.getItem("simulation_result");
const isCorrect = rawStatus === "Correct" ? "Success! 🎉" : "Completed! 👍";

  return (
    <div className="screen">
      <div className="register-card" style={{ maxWidth: "600px", textAlign: "center", margin: "40px auto" }}>
        
        {/* Celebration Header */}
        <div style={{ fontSize: "60px", marginBottom: "10px" }}>🎉</div>
        <span style={{ background: "#34c759", color: "#fff", padding: "5px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", letterSpacing: "1px" }}>
          MISSION COMPLETE
        </span>
        
        <h1 style={{ marginTop: "15px", fontSize: "32px" }}>Awesome Job!</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", marginBottom: "25px" }}>
          You completed the <strong>{gameMode.toUpperCase()}</strong> challenge for the <strong>{careerName}</strong> track with a status of <strong>{isCorrect}</strong>!
        </p>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "30px" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", display: "block" }}>XP EARNED</span>
            <strong style={{ fontSize: "28px", color: "#00e5ff" }}>+{earnedXP} XP</strong>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "20px", borderRadius: "15px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", display: "block" }}>CURRENT LEVEL</span>
            <strong style={{ fontSize: "28px", color: "#ff007f" }}>LVL {currentLevel}</strong>
          </div>
        </div>

        {/* Streak Notification */}
        {currentStreak > 0 && (
          <div style={{ background: "rgba(255, 165, 0, 0.15)", border: "1px solid orange", padding: "12px", borderRadius: "12px", marginBottom: "25px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            🔥 <strong>{currentStreak} Day Streak Active!</strong> Keep it up!
          </div>
        )}

        {/* Action Button */}
        <button 
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
          style={{ width: "100%", padding: "18px", fontSize: "18px" }}
        >
          Back to Dashboard 🚀
        </button>

      </div>
    </div>
  );
}

export default Result;