import { motion, AnimatePresence } from "framer-motion";

function XPAnimation({
  show = false,
  xp = 0,
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            y: -60,
            scale: 1.2,
          }}
          exit={{
            opacity: 0,
            y: -120,
            scale: 0.8,
          }}
          transition={{
            duration: 1.5,
          }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%, -50%)",
            fontSize: "48px",
            fontWeight: "bold",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          ⭐ +{xp} XP
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default XPAnimation;