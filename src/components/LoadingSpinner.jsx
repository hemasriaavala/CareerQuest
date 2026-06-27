import { motion } from "framer-motion";

function LoadingSpinner({
  title = "Loading...",
  subtitle = "Please wait",
}) {
  return (
    <motion.div
      className="loading-card"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <motion.div
        className="loader"
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />

      <motion.h1
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
        }}
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

export default LoadingSpinner;