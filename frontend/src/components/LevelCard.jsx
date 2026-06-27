import { motion } from "framer-motion";

function LevelCard({
  level = 1,
  progress = 0,
  xpToNextLevel = 100,
}) {
  return (
    <motion.div
      className="level-card"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <h2>
        🏆 Level {level}
      </h2>

      <div
        className="progress-bar"
        style={{
          marginTop: "20px",
        }}
      >
        <motion.div
          className="progress-fill"
          initial={{
            width: 0,
          }}
          animate={{
            width:
              `${progress}%`,
          }}
          transition={{
            duration: 1,
          }}
        />
      </div>

      <p
        style={{
          marginTop: "15px",
        }}
      >
        {progress}% Complete
      </p>

      <p>
        ⭐ {xpToNextLevel}
        {" "}
        XP to next level
      </p>
    </motion.div>
  );
}

export default LevelCard;