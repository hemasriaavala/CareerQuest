import { motion } from "framer-motion";

function RewardPopup({
  show = false,
  xp = 0,
  score = 0,
  badge = "",
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <motion.div
        className="reward-popup"
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "15px",
          }}
        >
          🎉
        </h1>

        <h2>
          Mission Complete!
        </h2>

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <h3>
            ⭐ +{xp} XP
          </h3>

          <h3>
            🏆 Score: {score}
          </h3>

          {badge && (
            <h3>
              🏅 {badge}
            </h3>
          )}
        </div>

        <button
          className="primary-btn"
          style={{
            marginTop: "30px",
          }}
          onClick={onClose}
        >
          🚀 Continue
        </button>
      </motion.div>
    </div>
  );
}

export default RewardPopup;