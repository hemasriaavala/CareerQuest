import { motion } from "framer-motion";

function MissionCard({
  title = "Career Challenge",
  journey = "Explorer",
  instruction = "Complete your mission.",
  taskType = "Virtual",
  gameType = "Quiz",
  xp = 20,
  onStart,
}) {
  
  // Clean up any internal engine text or fallback placeholders automatically
  const cleanInstruction = 
    !instruction || 
    instruction.includes("game engine rules") || 
    instruction === "Complete your mission."
      ? "Analyze the tactical challenge scenario below and deploy your best strategic choice to proceed."
      : instruction;

  return (
    <motion.div
      className="mission-card"
      initial={{
        y: 50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <h1 className="mission-title">
        🚀 {title}
      </h1>

      <div className="mission-box">
        <h2>
          AI Generated Mission
        </h2>

        <p>
          🌟 Journey: {journey}
        </p>

        {/* Displays the cleaned, immersive instruction */}
        <p style={{ lineHeight: "1.5", opacity: 0.9 }}>
          {cleanInstruction}
        </p>

        <div className="mission-details">
          <div>
            🎯 {taskType}
          </div>

          <div>
            🎮 {gameType}
          </div>

          <div>
            🏆 +{xp} XP
          </div>
        </div>
      </div>

      <button
        className="primary-btn"
        onClick={onStart}
      >
        🚀 Start Mission
      </button>
    </motion.div>
  );
}

export default MissionCard;