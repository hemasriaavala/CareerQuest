import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarField from "../components/StarField";
import { evaluateMission } from "../services/evaluateService";

function RolePlayGame() {
  const navigate = useNavigate();
  
  // 🔄 Dynamic mission state tracking to handle timing/latency gaps cleanly
  const [mission, setMission] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    loadMission();

    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  // Reset local interactive selections safely if the active mission shifts
  useEffect(() => {
    setSelectedOption(null);
    setFeedback("");
  }, [mission]);

  const title = mission.title || mission.career || "Role Play Challenge";
  const scenario = mission.instruction || mission.description || mission.scenario || "Read through the challenge scenario above.";
  const totalXP = mission.xp || mission.xp_reward || 20;
  
  // Robust check for choices: computed cleanly on every state change or update cycle
  const rawOptions = mission.options || mission.choices || mission.game_payload?.options || mission.game_payload?.choices || [];
  const options = Array.isArray(rawOptions) ? rawOptions : [];

  const handleOptionClick = (index, optionText) => {
    setSelectedOption(index);
    
    // 🔮 UNLIMITED ENGINE: Pull contextual choice feedback if provided dynamically by your agent
    if (mission.feedback_options && mission.feedback_options[index]) {
      setFeedback(mission.feedback_options[index]);
    } else if (mission.game_payload?.feedback && mission.game_payload.feedback[index]) {
      setFeedback(mission.game_payload.feedback[index]);
    } else {
      setFeedback("Excellent choices explorer! Let's report our action log back to HQ.");
    }

    // Temporarily save selection string if results view displays custom diagnostic context
    localStorage.setItem("selected_answer", optionText);
  };

  const handleComplete = async () => {
    if (selectedOption === null || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const userId = Number(localStorage.getItem("user_id"));
      
      const fallbacks = [
        "Investigate core telemetry systems and reinforce structural metrics.",
        "Consult with senior deck supervisors to plan a secure diagnostic patch.",
        "Apply standard corrective updates to stabilize operational balancing parameters."
      ];
      const chosenOptionText = options.length > 0 ? options[selectedOption] : fallbacks[selectedOption];

      // Fire payload matching standardized structure of your sister engines
      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Leader",
        challenge_type: "ROLEPLAY",
        status: "Completed",
        score: 100, // Roleplay activities reward participation fulfillment fully
        xp_earned: totalXP,
        user_input: chosenOptionText || `Option ${selectedOption + 1}`
      });

      localStorage.setItem("earned_xp", totalXP);
      localStorage.setItem("score", 100);
      localStorage.setItem("quiz_result", "Completed");

      // Synchronize stats immediately if the response maps them
      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
      }

      navigate("/result");
    } catch (error) {
      console.error("Failed to save roleplay data:", error);
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="screen" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", position: "relative", padding: "20px" }}>
      <StarField stars={60} />

      <motion.div 
        className="mission-card"
        style={{ maxWidth: "650px", width: "100%", padding: "40px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ textAlign: "center", fontSize: "40px", marginBottom: "15px" }}>🎭</div>
        <h1 style={{ color: "#fff", fontSize: "30px", textAlign: "center", marginBottom: "25px", fontWeight: "800" }}>{title}</h1>

        <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)", marginBottom: "30px" }}>
          <h3 style={{ color: "#00e5ff", marginTop: 0, textTransform: "uppercase", letterSpacing: "1px", fontSize: "13px", fontWeight: "bold" }}>Scenario Context</h3>
          <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>{scenario}</p>
        </div>

        <h3 style={{ color: "rgba(255,255,255,0.9)", fontSize: "17px", marginBottom: "15px", fontWeight: "500" }}>What is your plan of action?</h3>

        {/* OPTIONS CONTAINER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "25px" }}>
          {options.length > 0 ? (
            options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index, option)}
                  style={{ width: "100%", padding: "16px 20px", borderRadius: "12px", border: isSelected ? "2px solid #00e5ff" : "1px solid rgba(255,255,255,0.12)", background: isSelected ? "rgba(0, 229, 255, 0.12)" : "rgba(255,255,255,0.03)", color: isSelected ? "#00e5ff" : "#fff", fontSize: "15px", textAlign: "left", cursor: "pointer", transition: "all 0.2s ease" }}
                >
                  <span style={{ marginRight: "12px" }}>{isSelected ? "🔘" : "⚪"}</span>
                  {option}
                </button>
              );
            })
          ) : (
            /* Dynamic Automated Fallbacks if choice vectors are structural strings instead of standard lists */
            ["Investigate core telemetry systems and reinforce structural metrics.", "Consult with senior deck supervisors to plan a secure diagnostic patch.", "Apply standard corrective updates to stabilize operational balancing parameters."].map((fallbackOpt, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index, fallbackOpt)}
                  style={{ width: "100%", padding: "16px 20px", borderRadius: "12px", border: isSelected ? "2px solid #a855f7" : "1px solid rgba(255,255,255,0.12)", background: isSelected ? "rgba(168, 85, 247, 0.12)" : "rgba(255,255,255,0.03)", color: "#fff", fontSize: "15px", textAlign: "left", cursor: "pointer", transition: "all 0.2s ease" }}
                >
                  <span style={{ marginRight: "12px" }}>{isSelected ? "🔮" : "✨"}</span>
                  {fallbackOpt}
                </button>
              );
            })
          )}
        </div>

        {feedback && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ color: "#00e5ff", background: "rgba(0, 229, 255, 0.06)", padding: "14px 18px", borderRadius: "10px", textAlign: "center", marginBottom: "25px", fontSize: "14px", border: "1px solid rgba(0, 229, 255, 0.15)", lineHeight: "1.4" }}
          >
            {feedback}
          </motion.div>
        )}

        {/* FOOTER ACTION BUTTON */}
        <button
          onClick={handleComplete}
          disabled={selectedOption === null || isSubmitting}
          style={{ width: "100%", padding: "16px", background: selectedOption !== null ? "linear-gradient(45deg, #a855f7, #6366f1)" : "rgba(255,255,255,0.05)", color: selectedOption !== null ? "#fff" : "rgba(255,255,255,0.25)", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: selectedOption !== null ? "pointer" : "not-allowed", transition: "all 0.3s ease", boxShadow: selectedOption !== null ? "0 4px 15px rgba(99, 102, 241, 0.3)" : "none" }}
        >
          {isSubmitting ? "Transmitting Telemetry... 🚀" : "Complete Role Play 🪐"}
        </button>
      </motion.div>
    </div>
  );
}

export default RolePlayGame;