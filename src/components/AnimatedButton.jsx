import { motion } from "framer-motion";

function AnimatedButton({
  text = "Continue",
  onClick,
  disabled = false,
  loading = false,
  className = "primary-btn",
  type = "button",
  icon = "",
}) {
  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{
        scale: disabled ? 1 : 1.05,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={{
        opacity:
          disabled || loading
            ? 0.7
            : 1,
        cursor:
          disabled || loading
            ? "not-allowed"
            : "pointer",
      }}
    >
      {loading ? (
        <>⏳ Loading...</>
      ) : (
        <>
          {icon && `${icon} `}
          {text}
        </>
      )}
    </motion.button>
  );
}

export default AnimatedButton;