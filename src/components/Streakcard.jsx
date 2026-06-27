import { motion } from "framer-motion";

function StreakCard({
  streak = 1,
}) {
  const getMessage = () => {
    if (streak >= 30) {
      return "🔥 Legendary Explorer!";
    }

    if (streak >= 14) {
      return "🚀 Amazing Consistency!";
    }

    if (streak >= 7) {
      return "⭐ Great Job!";
    }

    if (streak >= 3) {
      return "🎯 Keep Going!";
    }

    return "🌱 Start Your Journey!";
  };

  return (
    <motion.div
      className="streak-card"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          marginBottom: "15px",
        }}
      >
        🔥
      </h1>

      <h2>
        {streak} Day
        {streak !== 1
          ? "s"
          : ""}
        {" "}
        Streak
      </h2>

      <p
        style={{
          marginTop: "12px",
        }}
      >
        {getMessage()}
      </p>
    </motion.div>
  );
}

export default StreakCard;