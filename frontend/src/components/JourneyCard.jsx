import { motion } from "framer-motion";

function JourneyCard({
  title = "Explorer",
  level = 1,
  unlocked = false,
  onClick,
}) {
  const handleClick = () => {
    if (unlocked && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={
        unlocked
          ? "journey-card"
          : "journey-card locked"
      }
      whileHover={{
        scale: unlocked ? 1.03 : 1,
      }}
      whileTap={{
        scale: unlocked ? 0.97 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          unlocked
        ) {
          handleClick();
        }
      }}
      style={{
        cursor: unlocked
          ? "pointer"
          : "not-allowed",
        opacity: unlocked
          ? 1
          : 0.7,
      }}
    >
      <div className="journey-top">
        <h3>
          Level {level}
        </h3>

        <span className="journey-icon">
          {unlocked
            ? "🔓"
            : "🔒"}
        </span>
      </div>

      <h2>{title}</h2>

      <p>
        {unlocked
          ? "Tap to begin your adventure"
          : "Complete previous levels to unlock"}
      </p>
    </motion.div>
  );
}

export default JourneyCard;