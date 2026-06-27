import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function SortingGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking to handle timing/latency gaps cleanly
  const [mission, setMission] = useState({});
  const [selected, setSelected] = useState([]);
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

  // Clear selections safely if a completely new mission loads underneath the player
  useEffect(() => {
    setSelected([]);
  }, [mission]);

  const title = mission.title || mission.career || "Sorting Challenge";
  const instruction = mission.instruction || mission.description || "Identify and select all correct matching elements.";
  
  // 🔮 UNLIMITED ENGINE: Extract parameters defensively across schema variations on every render pass
  const items = mission.items || mission.game_payload?.items || [];
  const correctItems = mission.correctItems || mission.correct_items || mission.game_payload?.correct_items || [];
  const totalXP = mission.xp || mission.xp_reward || 20;

  const toggleItem = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const submitGame = async () => {
    try {
      setLoading(true);

      // Evaluate matching subset intersections
      const matchedCorrectCount = selected.filter((item) => correctItems.includes(item)).length;
      
      // Calculate defensive divisor logic to prevent Division by Zero anomalies
      const baseDivisor = correctItems.length > 0 ? correctItems.length : 1;
      const score = Math.min(100, Math.max(0, Math.round((matchedCorrectCount / baseDivisor) * 100)));
      
      const earnedXP = Math.max(5, Math.round((score / 100) * totalXP));
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Organizer",
        challenge_type: "SORTING",
        status: score >= 70 ? "Success" : "Failed",
        xp_earned: earnedXP,
        score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("sorting_score", score);

      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
        if (result.streak) localStorage.setItem("user_streak", result.streak);
      }

      navigate("/result");
    } catch (error) {
      console.error("Sorting game execution crash:", error);
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
      <motion.div
        className="dashboard-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ maxWidth: "550px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <h1 style={{ textAlign: "center", color: "#fff", margin: 0 }}>
          🗂️ {title}
        </h1>

        <h2 style={{ marginTop: "20px", marginBottom: "30px", textAlign: "center", color: "rgba(255,255,255,0.85)", fontSize: "16px", fontWeight: "400", lineHeight: "1.4" }}>
          {instruction}
        </h2>

        {/* Dynamic Multi-Selection Selection Grid */}
        <div style={{ display: "grid", gap: "14px" }}>
          {items.map((item) => {
            const isSelected = selected.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleItem(item)}
                style={{
                  textAlign: "left",
                  padding: "16px 20px",
                  fontSize: "15px",
                  background: isSelected ? "rgba(0, 229, 255, 0.15)" : "rgba(255,255,255,0.03)",
                  border: isSelected ? "2px solid #00e5ff" : "1px solid rgba(255,255,255,0.1)",
                  color: isSelected ? "#00e5ff" : "#fff",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span>{item}</span>
                <span>{isSelected ? "✅" : "➕"}</span>
              </button>
            );
          })}
        </div>

        <button
          disabled={loading || selected.length === 0}
          onClick={submitGame}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "16px",
            background: selected.length > 0 ? "linear-gradient(45deg, #00e5ff, #6366f1)" : "rgba(255,255,255,0.05)",
            color: selected.length > 0 ? "#fff" : "rgba(255,255,255,0.25)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: selected.length > 0 ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
            boxShadow: selected.length > 0 ? "0 4px 15px rgba(0, 229, 255, 0.25)" : "none"
          }}
        >
          {loading ? "Sorting Results... 📡" : "🚀 Submit Selections"}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default SortingGame;