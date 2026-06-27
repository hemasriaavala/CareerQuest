import { motion } from "framer-motion";

function ProgressBar({
  progress = 0,
  label = "Progress",
  height = 18,
  showPercentage = true,
}) {
  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span>{label}</span>

        {showPercentage && (
          <span>
            {safeProgress}%
          </span>
        )}
      </div>

      <div
        className="progress-track"
        style={{
          height: `${height}px`,
        }}
      >
        <motion.div
          className="progress-fill"
          initial={{
            width: 0,
          }}
          animate={{
            width:
              `${safeProgress}%`,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;