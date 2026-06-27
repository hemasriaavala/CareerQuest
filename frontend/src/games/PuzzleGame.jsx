import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function PuzzleGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic local storage tracking to fix the async network latency gap
  const [mission, setMission] = useState({});
  const [items, setItems] = useState([]);
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

  // 🔮 UNLIMITED ENGINE: Re-parse or auto-generate puzzle items whenever the mission updates
  useEffect(() => {
    const rawItems = mission.items || mission.sequence || mission.game_payload?.items || [];
    
    if (Array.isArray(rawItems) && rawItems.length > 0) {
      // Create a shuffled copy so the user actually has to solve a puzzle
      setItems([...rawItems].sort(() => Math.random() - 0.5));
    } else {
      // Dynamic Fallback: Auto-generate a scrambled letter/word puzzle from the career string
      const defaultString = mission.career || "SOLVER";
      const defaultSequence = defaultString.split("");
      setItems(defaultSequence.sort(() => Math.random() - 0.5));
    }
  }, [mission]);

  const title = mission.title || mission.career || "Puzzle Quest";
  const instruction = mission.instruction || mission.description || "Rearrange or sort items into their correct structural sequence.";
  const totalXP = mission.xp || mission.xp_reward || 20;

  // Simple item shifting helper to move clicked items up/down the list indexes
  const moveItem = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= items.length) return;
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  const submitGame = async () => {
    try {
      setLoading(true);

      // Verify alignment with original array order payload sequence
      const correctSequence = mission.items || mission.sequence || mission.game_payload?.items || (mission.career || "SOLVER").split("");
      const isCorrect = JSON.stringify(items) === JSON.stringify(correctSequence);

      const score = isCorrect ? 100 : 25;
      const earnedXP = isCorrect ? totalXP : 5;
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Puzzle Master",
        challenge_type: "PUZZLE",
        status: isCorrect ? "Success" : "Failed",
        xp_earned: earnedXP,
        score: score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("puzzle_result", isCorrect ? "Correct" : "Incorrect");

      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
      }

      navigate("/result");
    } catch (error) {
      console.error("Puzzle Submission failed:", error);
      navigate("/dashboard");
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
      <div 
        className="dashboard-card" 
        style={{ maxWidth: "550px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <h1 style={{ textAlign: "center", color: "#fff", margin: 0 }}>
          🧩 {title}
        </h1>

        <h2 style={{ marginTop: "15px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: "normal", lineHeight: "1.5" }}>
          {instruction}
        </h2>

        {/* Interactive Sorting Puzzle Grid */}
        <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                layout
                key={`${item}-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "500"
                }}
              >
                <span>{item}</span>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "none",
                      color: index === 0 ? "rgba(255,255,255,0.1)" : "#00e5ff",
                      borderRadius: "8px",
                      width: "35px",
                      height: "35px",
                      cursor: index === 0 ? "not-allowed" : "pointer",
                      fontSize: "16px"
                    }}
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === items.length - 1}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "none",
                      color: index === items.length - 1 ? "rgba(255,255,255,0.1)" : "#00e5ff",
                      borderRadius: "8px",
                      width: "35px",
                      height: "35px",
                      cursor: index === items.length - 1 ? "not-allowed" : "pointer",
                      fontSize: "16px"
                    }}
                  >
                    ▼
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button
          disabled={loading || items.length === 0}
          onClick={submitGame}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "16px",
            background: "linear-gradient(45deg, #00e5ff, #6366f1)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0, 229, 255, 0.25)",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "Checking Solution Parameters... 📡" : "🚀 Submit Sequence"}
        </button>
      </div>
    </motion.div>
  );
}

export default PuzzleGame;