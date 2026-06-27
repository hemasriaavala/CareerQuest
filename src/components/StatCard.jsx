import { motion } from "framer-motion";

function StatCard({
  icon = "⭐",
  value = 0,
  label = "Stat",
  onClick,
}) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onClick={onClick}
      style={{
        cursor: onClick
          ? "pointer"
          : "default",
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </h2>

      <h1
        style={{
          marginBottom: "5px",
        }}
      >
        {value}
      </h1>

      <p>{label}</p>
    </motion.div>
  );
}

export default StatCard;