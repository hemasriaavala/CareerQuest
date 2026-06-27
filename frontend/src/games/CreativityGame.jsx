import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function CreativityGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking to avoid network timing gaps
  const [mission, setMission] = useState({});

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    loadMission();

    // Custom event listener handles fast async network updates
    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  const title = mission.title || mission.career || "Creative Challenge";
  const instruction = mission.instruction || mission.description || "Use your imagination and describe your idea.";

  // 🔮 UNLIMITED ENGINE: Dynamically fall back if AI forgets to explicitly supply minWords
  const getMinWords = () => {
    const rawMin = mission.minWords || mission.min_words || mission.game_payload?.min_words;
    if (rawMin && !isNaN(rawMin)) return Number(rawMin);
    
    // Fallback: simple text calculation (makes sure the kid has a custom target between 10 and 25 words)
    return Math.max(10, Math.min(25, Math.floor(instruction.length / 8)));
  };

  const minWords = getMinWords();
  const totalXP = mission.xp || mission.xp_reward || 25;

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple clean utility to get a true word count text array length
  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const currentWordCount = getWordCount(answer);

  const submitGame = async () => {
    try {
      setLoading(true);
      const words = getWordCount(answer);
      let score;

      if (words >= minWords) {
        score = 100;
      } else if (words >= Math.floor(minWords * 0.75)) {
        score = 80;
      } else if (words >= Math.floor(minWords * 0.5)) {
        score = 60;
      } else {
        score = 30;
      }

      const earnedXP = Math.max(
        5,
        Math.round((score / 100) * totalXP)
      );

      const userId = Number(localStorage.getItem("user_id"));

      // Send payload data matching your permanent SQLite database layout setup
      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Creator",
        challenge_type: "CREATIVITY",
        status: "Completed",
        xp_earned: earnedXP,
        score: score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("creative_answer", answer);

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
      <div className="dashboard-card" style={{ maxWidth: "600px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>

        <h1 style={{ textAlign: "center", color: "#fff", margin: 0 }}>
          🎨 {title}
        </h1>

        <div
          className="mission-box"
          style={{
            marginTop: "25px",
            background: "rgba(255,255,255,0.04)",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <h2 style={{ color: "#00e5ff", margin: "0 0 10px 0", fontSize: "18px" }}>Creative Mission</h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "15px", lineHeight: "1.5", margin: 0 }}>
            {instruction}
          </p>

          <p style={{ marginTop: "15px", opacity: 0.6, fontSize: "13px", fontWeight: "bold", textTransform: "uppercase", margin: "15px 0 0 0" }}>
            Target goal: {minWords} words minimum
          </p>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or dictate your creative solution right here..."
          style={{
            width: "100%",
            minHeight: "180px",
            marginTop: "25px",
            padding: "20px",
            borderRadius: "16px",
            fontSize: "16px",
            resize: "none",
            boxSizing: "border-box",
            background: "rgba(0,0,0,0.2)",
            color: "#fff",
            border: currentWordCount >= minWords ? "2px solid #2ecc71" : "1px solid rgba(255,255,255,0.2)",
            outline: "none",
            transition: "all 0.2s ease"
          }}
        />

        <p style={{ textAlign: "center", marginTop: "15px", color: currentWordCount >= minWords ? "#2ecc71" : "rgba(255,255,255,0.6)", fontWeight: "bold" }}>
          Current Word Count: {currentWordCount}
        </p>

        <button
          className="primary-btn"
          disabled={loading || answer.trim() === ""}
          onClick={submitGame}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "16px",
            background: answer.trim() !== "" ? "linear-gradient(45deg, #00e5ff, #a855f7)" : "rgba(255,255,255,0.05)",
            color: answer.trim() !== "" ? "#fff" : "rgba(255,255,255,0.3)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: answer.trim() !== "" ? "pointer" : "not-allowed",
            boxShadow: answer.trim() !== "" ? "0 4px 15px rgba(168, 85, 247, 0.2)" : "none"
          }}
        >
          {loading ? "Saving Progress... 📡" : "🚀 Submit Creative Idea"}
        </button>

      </div>
    </motion.div>
  );
}

export default CreativityGame;