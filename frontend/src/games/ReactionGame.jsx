import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function ReactionGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking to eliminate storage write lag gaps
  const [mission, setMission] = useState({});
  const [round, setRound] = useState(0);
  const [visible, setVisible] = useState(false);
  const [times, setTimes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    loadMission();

    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  const title = mission.title || mission.career || "Reaction Challenge";
  const instruction = mission.instruction || mission.description || "Tap the target as quickly as it appears!";
  const target = mission.target || mission.game_payload?.target || "⚡";
  
  // 🔮 UNLIMITED ENGINE: Fallback computations re-evaluate dynamically on state mutation
  const totalRounds = Number(mission.rounds || mission.total_rounds || mission.game_payload?.rounds || 3);
  const totalXP = mission.xp || mission.xp_reward || 20;

  // ⏱️ Safe, isolated round timing lifecycle to prevent background memory leaks
  useEffect(() => {
    if (round >= totalRounds || totalRounds === 0) return;

    setVisible(false);
    const delay = 1000 + Math.random() * 2000;

    const timer = setTimeout(() => {
      setVisible(true);
      setStartTime(Date.now());
    }, delay);

    return () => clearTimeout(timer);
  }, [round, totalRounds]);

  // Handle final automatic game evaluation submissions safely
  useEffect(() => {
    if (round === totalRounds && totalRounds > 0 && times.length === totalRounds) {
      submitGame();
    }
  }, [round, totalRounds, times]);

  const handleTap = () => {
    if (!visible) return;

    const reaction = Date.now() - startTime;
    setTimes((prev) => [...prev, reaction]);
    setVisible(false);
    setRound((prev) => prev + 1);
  };

  const submitGame = async () => {
    try {
      setLoading(true);

      const average = times.length
        ? times.reduce((a, b) => a + b, 0) / times.length
        : 1000;

      // Score calculation logic scaled for children reaction times
      let score = Math.max(20, Math.round(100 - average / 15));
      score = Math.min(score, 100);

      const earnedXP = Math.max(5, Math.round((score / 100) * totalXP));
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Reflex Specialist",
        challenge_type: "REACTION",
        status: "Completed",
        xp_earned: earnedXP,
        score: score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);

      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
      }

      navigate("/result");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Unable to submit mission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}
    >
      <div className="dashboard-card" style={{ maxWidth: "500px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
        
        <h1 style={{ textAlign: "center", color: "#fff", margin: 0 }}>
          ⚡ {title}
        </h1>

        <h2 style={{ marginTop: "15px", textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "16px", fontWeight: "normal" }}>
          {instruction}
        </h2>

        <h3 style={{ textAlign: "center", marginTop: "20px", color: "#00e5ff", fontSize: "14px", fontWeight: "bold", textTransform: "uppercase" }}>
          Round {Math.min(round + 1, totalRounds)} / {totalRounds}
        </h3>

        {/* Reaction Target Hub Grid Area */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "220px",
            background: "rgba(0,0,0,0.15)",
            borderRadius: "16px",
            marginTop: "25px",
            border: "1px solid rgba(255,255,255,0.04)"
          }}
        >
          {visible ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTap}
              className="primary-btn"
              style={{
                width: "140px",
                height: "140px",
                fontSize: "65px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00e5ff, #6366f1)",
                border: "4px solid #fff",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(0, 229, 255, 0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {target}
            </motion.button>
          ) : (
            <motion.h2 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "18px", fontWeight: "500" }}
            >
              🚀 Standby Explorer...
            </motion.h2>
          )}
        </div>

        {loading && (
          <p style={{ marginTop: "25px", textAlign: "center", color: "#a855f7", fontWeight: "bold" }}>
            Transmitting telemetry score log... 📡
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default ReactionGame;