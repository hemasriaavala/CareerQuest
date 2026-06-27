import { motion } from "framer-motion";

function BadgeCard({
  badge = "Career Explorer",
  icon = "🏅",
  subtitle = "CURRENT BADGE",
}) {
  return (
    <motion.div
      className="badge-card"
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
      <div>
        <p className="badge-label">
          {subtitle}
        </p>

        <h3>
          {icon} {badge}
        </h3>
      </div>

      <div className="badge-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </motion.div>
  );
}

export default BadgeCard;