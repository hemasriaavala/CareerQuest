import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/progressService";
import { playBackgroundMusic } from "../services/sound"; // Updated import

import Navbar from "../components/Navbar";
import StarField from "../components/StarField";
import LoadingSpinner from "../components/LoadingSpinner";
import RobotAvatar from "../components/RobotAvatar";
import BadgeCard from "../components/BadgeCard";
import StatCard from "../components/StatCard";
import ProgressBar from "../components/ProgressBar";
import StreakCard from "../components/StreakCard";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const userId = Number(localStorage.getItem("user_id"));
      if (!userId) {
        setAuthRequired(true);
        setLoading(false);
        return;
      }

      const data = await getDashboard(userId);
      const todayString = new Date().toDateString();
      const lastLoginDate = localStorage.getItem("last_login_date");
      let verifiedStreak = data.streak || 0;

      if (lastLoginDate !== todayString) {
        if (lastLoginDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastLoginDate === yesterday.toDateString()) {
            verifiedStreak += 1;
          } else {
            verifiedStreak = 1;
          }
        } else {
          verifiedStreak = 1;
        }
        localStorage.setItem("last_login_date", todayString);
        localStorage.setItem("user_streak", verifiedStreak);
      }

      setDashboard({ ...data, streak: verifiedStreak });
      setAuthRequired(false);
    } catch (error) {
      console.error("Dashboard Error:", error);
      setAuthRequired(true);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAdventure = () => {
    // 1. Create the audio object inside the click handler
    const audio = new Audio('/sounds/background.mp3');
    audio.loop = true;
    audio.volume = 0.4;

    // 2. Play immediately within the click event (browsers allow this)
    audio.play().then(() => {
      console.log("Audio started successfully!");
      // 3. Navigate only after starting the audio
      navigate("/careers");
    }).catch(error => {
      console.error("Audio failed to play:", error);
      // Navigate anyway so the user isn't stuck
      navigate("/careers");
    });
  };
  if (loading) {
    return (
      <div className="screen">
        <StarField stars={60} />
        <LoadingSpinner title="Loading Dashboard..." subtitle="Preparing your adventure 🚀" />
      </div>
    );
  }

  if (authRequired || !dashboard) {
    return (
      <div className="screen" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <StarField stars={60} />
        <div className="dashboard-card" style={{ maxWidth: "400px", width: "90%", textAlign: "center", padding: "30px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>🚀</div>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>CareerQuest</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "25px", lineHeight: "1.5", fontSize: "14px" }}>
            Ready to track your score, extend your streak, and unlock game stations? Log in or sign up to save your progress!
          </p>
          <button className="primary-btn" style={{ width: "100%", padding: "14px", fontSize: "15px", fontWeight: "bold" }} onClick={() => navigate("/register")}>
            🔐 Log In / Register Now
          </button>
        </div>
      </div>
    );
  }

  const subMenuButtonStyle = {
    display: "flex", alignItems: "center", gap: "10px", background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(0, 229, 255, 0.15)", borderRadius: "10px", padding: "10px 14px",
    color: "#00e5ff", fontSize: "13px", fontWeight: "bold", letterSpacing: "0.5px",
    cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
  };

  return (
    <div className="screen" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <StarField stars={50} />
      <Navbar title="Dashboard" showHome />

      <div className="premium-dashboard-container" style={{ maxWidth: "900px", width: "95%", margin: "15px auto", background: "rgba(16, 12, 43, 0.8)", backdropFilter: "blur(12px)", border: "2px solid rgba(0, 229, 255, 0.25)", borderRadius: "20px", padding: "20px 25px", boxShadow: "0 0 30px rgba(0, 229, 255, 0.1)", boxSizing: "border-box" }}>
        
        {/* Header Section */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <RobotAvatar size={55} message="Ready for your next adventure?" />
            <div>
              <h1 style={{ fontSize: "22px", color: "#fff", margin: "2px 0 0 0", fontWeight: "900" }}>
                Welcome back, <span style={{ background: "linear-gradient(135deg, #fff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{dashboard.name.toUpperCase()} 👋</span>
              </h1>
            </div>
          </div>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }} style={{ fontSize: "12px", background: "rgba(255, 77, 77, 0.08)", border: "1px solid rgba(255, 77, 77, 0.3)", borderRadius: "8px", padding: "6px 12px", color: "#ff4d4d", cursor: "pointer" }}>Logout 🚪</button>
        </div>

        <div style={{ marginBottom: "15px", transform: "scale(0.95)", transformOrigin: "top left" }}>
          <BadgeCard badge={dashboard.badge} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "15px" }}>
          <StatCard icon="⭐" value={`${dashboard.xp.toLocaleString()} XP`} label="EXPERIENCE POINTS" />
          <StatCard icon="🏆" value={`LEVEL ${dashboard.level}`} label="ASCENSION RANK" />
          <StatCard icon="📚" value={dashboard.missions} label="COMPLETED MISSIONS" />
          <StatCard icon="🔥" value={`${dashboard.streak} DAY`} label="LOGIN STREAK" />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <StreakCard streak={dashboard.streak} />
        </div>

        {/* Progress Section */}
        <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.04)", borderRadius: "12px", padding: "12px 18px", marginBottom: "15px" }}>
          <h3 style={{ margin: 0, fontSize: "12px", color: "#fff", fontWeight: "bold" }}>⚡ LEVEL {dashboard.level} PROGRESS</h3>
          <ProgressBar label="Progress" progress={dashboard.progress_percentage} />
        </div>

        {/* Start Button - Integrated with handleStartAdventure */}
        <button onClick={handleStartAdventure} style={{ width: "100%", padding: "12px", fontSize: "14px", fontWeight: "900", textTransform: "uppercase", background: "linear-gradient(90deg, #00e5ff, #a855f7)", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer", marginBottom: "15px" }}>
          🚀 Start New Adventure
        </button>

        {/* Sub-menu Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
           <button style={subMenuButtonStyle} onClick={() => navigate("/history")}>📋 MISSION LOG</button>
           <button style={subMenuButtonStyle} onClick={() => navigate("/achievements")}>🏅 ACHIEVEMENTS</button>
           <button style={subMenuButtonStyle} onClick={() => navigate("/leaderboard")}>🏆 RANKINGS</button>
           <button style={subMenuButtonStyle} onClick={() => navigate("/profile")}>👤 PROFILE HUB</button>
           <button style={subMenuButtonStyle} onClick={() => navigate("/telemetry")}>📡 TELEMETRY</button>
           <button style={subMenuButtonStyle} onClick={() => navigate("/settings")}>⚙️ SYSTEMS</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;