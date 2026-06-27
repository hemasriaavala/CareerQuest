import { motion } from "framer-motion";

function GameCard({
  emoji = "🎮",
  title = "Game",
  description = "",
  onClick,
  disabled = false,
}) {
  return (
    <motion.div
      className="game-card"
      whileHover={{
        scale: disabled ? 1 : 1.05,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      style={{
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          marginBottom: "15px",
        }}
      >
        {emoji}
      </h1>

      <h2
        style={{
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          style={{
            marginBottom: "20px",
            opacity: 0.8,
          }}
        >
          {description}
        </p>
      )}

      <button
        className="small-btn"
        disabled={disabled}
        onClick={onClick}
      >
        ▶ Play
      </button>
    </motion.div>
  );
}

export default GameCard;