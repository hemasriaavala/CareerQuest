import { motion } from "framer-motion";

function RobotAvatar({
  message = "",
  size = 120,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          fontSize: `${size}px`,
          userSelect: "none",
        }}
      >
        🤖
      </motion.div>

      {message && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
          }}
          className="robot-message"
        >
          {message}
        </motion.div>
      )}
    </div>
  );
}

export default RobotAvatar;