import { motion } from "framer-motion";

function CareerCard({
  icon = "🚀",
  name = "Engineer",
  description = "",
  onClick,
  disabled = false,
}) {
  return (
    <motion.button
      className="career-btn"
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: disabled
          ? 1
          : 1.05,
      }}
      whileTap={{
        scale: disabled
          ? 1
          : 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      style={{
        opacity:
          disabled ? 0.6 : 1,
        cursor:
          disabled
            ? "not-allowed"
            : "pointer",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginBottom: "8px",
        }}
      >
        {name}
      </h3>

      {description && (
        <p
          style={{
            fontSize: "14px",
            opacity: 0.8,
          }}
        >
          {description}
        </p>
      )}
    </motion.button>
  );
}

export default CareerCard;