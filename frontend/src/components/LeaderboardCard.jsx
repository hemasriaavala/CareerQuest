import { motion } from "framer-motion";

function LeaderboardCard({
  rank = 1,
  name = "Explorer",
  xp = 0,
  level = 1,
  badge = "Career Explorer",
}) {
  const getMedal = () => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "🏅";
    }
  };

  return (
    <motion.div
      className="leaderboard-card"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <div className="leader-left">
        <h1>{getMedal()}</h1>

        <div>
          <h2>{name}</h2>
          <p>{badge}</p>
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <h2>
          ⭐ {xp} XP
        </h2>

        <p>
          Level {level}
        </p>
      </div>
    </motion.div>
  );
}

export default LeaderboardCard;