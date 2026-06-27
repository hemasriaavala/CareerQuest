import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function SimulationGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic local storage tracking state
  const [mission, setMission] = useState({});

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    // Initialize on load
    loadMission();

    // Custom event listener handles fast async network updates
    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  const title = mission.title || mission.career || "Career Simulation";
  const scenario = mission.scenario || mission.instruction || mission.description || "Solve the situation.";
  const question = mission.question || "What is your immediate tactical solution?";
  
  // 🔮 Robust multi-track parser checks with contextual tactical fallback array replacements
  const rawOptions = mission.options || mission.choices || mission.game_payload?.options || mission.game_payload?.choices;
  
// Change the fallback choices in SimulationGame.jsx to match a teaching scenario:
const options = Array.isArray(rawOptions) && rawOptions.length > 0 
  ? rawOptions 
  : [
      "Sit with Leo and show him a simple trick to break down drawing branches step-by-step.",
      "Encourage Leo to take a deep breath and remind him that art is about practicing, not perfection.",
      "Give Leo a fresh piece of paper and suggest drawing a different part of the nature scene first.",
      "Have Leo look at a classmate's drawing for inspiration on how to format the tree shapes."
    ];

  const answer = mission.answer || mission.game_payload?.answer || options[0];
  const totalXP = mission.xp || mission.xp_reward || 20;

  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const submitGame = async () => {
    if (!selected || loading) return;
    
    try {
      setLoading(true);

      const correct = selected.trim().toLowerCase() === answer.trim().toLowerCase() || options.indexOf(selected) === 0;
      const score = correct ? 100 : 20;
      const earnedXP = correct ? totalXP : 5;
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Specialist",
        challenge_type: "SIMULATION",
        status: correct ? "Success" : "Failed",
        xp_earned: earnedXP,
        score,
      });

      localStorage.setItem("earned_xp", earnedXP);
      localStorage.setItem("score", score);
      localStorage.setItem("simulation_result", correct ? "Correct" : "Incorrect");
      localStorage.setItem("selected_answer", selected);

      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
      }

      navigate("/result");
    } catch (error) {
      console.error("Simulation submission fail:", error);
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
        style={{ maxWidth: "600px", width: "100%", padding: "35px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <h1 style={{ textAlign: "center", color: "#fff", margin: "0 0 5px 0", fontSize: "28px" }}>
          🎭 {title}
        </h1>

        <div
          className="mission-box"
          style={{
            marginTop: "25px",
            background: "rgba(255,255,255,0.04)",
            padding: "20px 25px",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.06)"
          }}
        >
          <h2 style={{ color: "#00e5ff", marginTop: 0, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>
            Operational Scenario
          </h2>
          
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "16px", lineHeight: "1.6", margin: "0 0 20px 0" }}>
            {scenario}
          </p>

          <h3 style={{ margin: 0, color: "#fff", fontSize: "16px", fontWeight: "500", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "15px" }}>
            {question}
          </h3>
        </div>

        {/* Dynamic Options Selector Grid */}
        <div style={{ display: "grid", gap: "14px", marginTop: "25px" }}>
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
                  background: isSelected ? "rgba(0, 229, 255, 0.12)" : "rgba(255,255,255,0.03)",
                  border: isSelected ? "2px solid #00e5ff" : "1px solid rgba(255,255,255,0.12)",
                  color: isSelected ? "#00e5ff" : "#fff",
                  borderRadius: "12px",
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
          onClick={submitGame}
          style={{
            marginTop: "35px",
            width: "100%",
            padding: "16px",
            background: selected ? "linear-gradient(45deg, #6366f1, #a855f7)" : "rgba(255,255,255,0.05)",
            color: selected ? "#fff" : "rgba(255,255,255,0.25)",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: selected ? "pointer" : "not-allowed",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "Processing Resolution... 📡" : "🚀 Complete Mission"}
        </button>
      </div>
    </motion.div>
  );
}

export default SimulationGame;