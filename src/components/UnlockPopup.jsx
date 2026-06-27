import { motion } from "framer-motion";

function UnlockPopup({
  show = false,
  title = "Level Unlocked!",
  message = "",
  icon = "🎉",
  onClose,
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <motion.div
        className="unlock-popup"
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
            fontSize: "70px",
            marginBottom: "20px",
          }}
        >
          {icon}
        </h1>

        <h2
          style={{
            marginBottom: "15px",
          }}
        >
          {title}
        </h2>

        {message && (
          <p
            style={{
              marginBottom: "30px",
            }}
          >
            {message}
          </p>
        )}

        <button
          className="primary-btn"
          onClick={onClose}
        >
          🚀 Continue
        </button>
      </motion.div>
    </div>
  );
}

export default UnlockPopup;