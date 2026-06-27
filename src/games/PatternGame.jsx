import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function PatternGame() {
  const navigate = useNavigate();

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

  useEffect(() => {
    setSelected("");
  }, [mission]);

  const title = mission.title || mission.career || "Pattern Challenge";
  
  // 🚨 SANITIZER: Overrides the confusing engine placeholder string
  const baseInstruction = mission.instruction || mission.description || "";
  const instruction = 
    !baseInstruction || baseInstruction.includes("game engine rules")
      ? "Identify the hidden sequence pattern logic and select the missing element."
      : baseInstruction;

  const rawSeq = mission.sequence || mission.game_payload?.sequence;
  const rawOpts = mission.options || mission.game_payload?.options;
  const rawAns = mission.answer || mission.game_payload?.answer;

  // 🔵🟢🔵 Sequence Builder to resolve the visual loop puzzle
  const sequence = Array.isArray(rawSeq) && rawSeq.length > 0 ? rawSeq : ["🔵", "🟢", "🔵"];
  
  // 🚨 OPTION CHECK: Replaces abstract text blocks with corresponding color assets
  const options = 
    Array.isArray(rawOpts) && rawOpts.length > 0 && !rawOpts.some(opt => ["innovation", "giving up", "inaction", "distraction"].includes(opt.toLowerCase()))
      ? rawOpts 
      : ["🔵", "🟢", "🟡", "🔴"];

  // Matches solution target configuration
  const answer = 
    rawAns && !["innovation", "giving up", "inaction", "distraction"].includes(rawAns.toLowerCase())
      ? rawAns 
      : "🟢";

  const totalXP = mission.xp || mission.xp_reward || 20;

  const submitGame = async () => {
    try {
      setLoading(true);

      const correct = selected.trim().toLowerCase() === answer.trim().toLowerCase();
      const score = correct ? 100 : 20;
      const earnedXP = correct ? totalXP : 5;
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Logician",
        challenge_type: "PATTERN",
        status: correct ? "Success" : "Failed",
        xp_earned: earnedXP,
        score: score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("pattern_result", correct ? "Correct" : "Incorrect");
      localStorage.setItem("selected_answer", selected);
      localStorage.setItem("correct_answer", answer);

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
      <div className="dashboard-card" style={{ maxWidth: "550px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
        
        <h1 style={{ textAlign: "center", color: "#fff", margin: 0 }}>
          🔢 {title}
        </h1>

        <h2 style={{ marginTop: "20px", textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "16px", fontWeight: "normal", lineHeight: "1.5" }}>
          {instruction}
        </h2>

        {/* Display Current Sequence */}
        <div
          style={{
            display: "flex",
            justify: "center",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "35px",
            marginBottom: "35px",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "20px",
            borderRadius: "16px",
            fontSize: "45px",
          }}
        >
          {sequence.map((item, index) => (
            <motion.div 
              key={`${item}-${index}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
            </motion.div>
          ))}

          <div style={{ color: "#00e5ff", animation: "pulse 1.5s infinite", marginLeft: "5px" }}>
            {selected ? selected : "❓"}
          </div>
        </div>

        {/* Display Interactive Multi-Choice Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "15px",
          }}
        >
          {options.map((option) => {
            const isSelected = selected === option;
            return (
              <button
                key={option}
                onClick={() => setSelected(option)}
                style={{
                  fontSize: "32px",
                  padding: "12px",
                  background: isSelected ? "rgba(0, 229, 255, 0.2)" : "rgba(255,255,255,0.05)",
                  border: isSelected ? "2px solid #00e5ff" : "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  justify: "center",
                  alignItems: "center"
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          disabled={!selected || loading}
          onClick={submitGame}
          style={{
            marginTop: "30px",
            width: "100%",
            padding: "16px",
            background: selected ? "linear-gradient(45deg, #a855f7, #6366f1)" : "rgba(255,255,255,0.05)",
            color: selected ? "#fff" : "rgba(255,255,255,0.3)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: selected ? "pointer" : "not-allowed",
            boxShadow: selected ? "0 4px 15px rgba(99, 102, 241, 0.3)" : "none"
          }}
        >
          {loading ? "Analyzing Alignment... 📡" : "🚀 Submit Pattern"}
        </button>

      </div>
    </motion.div>
  );
}

export default PatternGame;