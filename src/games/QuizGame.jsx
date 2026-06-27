import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function QuizGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking to eliminate async local storage race conditions
  const [mission, setMission] = useState({});
  const [selected, setSelected] = useState("");
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

  // Reset the choice if the active mission switches out underneath the player
  useEffect(() => {
    setSelected("");
  }, [mission]);

  const title = mission.title || mission.career || "Quiz Challenge";
  const question = mission.question || mission.instruction || "Choose the correct answer.";
  
  // 🔮 UNLIMITED ENGINE: Handle alternative formatting layers safely on every render pass
  const options = mission.options || mission.game_payload?.options || ["True", "False"];
  const answer = mission.answer || mission.game_payload?.answer || options[0] || "";
  const totalXP = mission.xp || mission.xp_reward || 20;

  const submitAnswer = async () => {
    try {
      setLoading(true);

      const isCorrect = selected.trim().toLowerCase() === answer.trim().toLowerCase();

      let earnedXP;
      let score;

      if (isCorrect) {
        earnedXP = totalXP;
        score = 100;
      } else {
        earnedXP = 5;
        score = 20;
      }

      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Scholar",
        challenge_type: "QUIZ",
        status: isCorrect ? "Success" : "Failed",
        xp_earned: earnedXP,
        score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("quiz_score", score);
      localStorage.setItem("correct_answer", answer);
      localStorage.setItem("selected_answer", selected);
      localStorage.setItem("quiz_result", isCorrect ? "Correct" : "Incorrect");
      localStorage.setItem("quiz_correct", String(isCorrect));

      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
        if (result.streak) localStorage.setItem("user_streak", result.streak);
      }

      navigate("/result");
    } catch (error) {
      console.error("Submission Error:", error);
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
          🧠 {title}
        </h1>

        <h2 style={{ marginTop: "25px", marginBottom: "30px", textAlign: "center", color: "rgba(255,255,255,0.9)", fontSize: "18px", fontWeight: "500", lineHeight: "1.4" }}>
          {question}
        </h2>

        {/* Dynamic Multiple Choice Grid layout */}
        <div style={{ display: "grid", gap: "14px" }}>
          {options.map((option) => {
            const isSelected = selected === option;
            return (
              <button
                key={option}
                onClick={() => setSelected(option)}
                style={{
                  textAlign: "left",
                  padding: "16px 20px",
                  fontSize: "15px",
                  background: isSelected ? "rgba(168, 85, 247, 0.2)" : "rgba(255,255,255,0.04)",
                  border: isSelected ? "2px solid #a855f7" : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          disabled={!selected || loading}
          onClick={submitAnswer}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "16px",
            background: selected ? "linear-gradient(45deg, #00e5ff, #a855f7)" : "rgba(255,255,255,0.05)",
            color: selected ? "#fff" : "rgba(255,255,255,0.3)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: selected ? "pointer" : "not-allowed",
            boxShadow: selected ? "0 4px 15px rgba(168, 85, 247, 0.3)" : "none"
          }}
        >
          {loading ? "Verifying Choice... 📡" : "🚀 Submit Answer"}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default QuizGame;