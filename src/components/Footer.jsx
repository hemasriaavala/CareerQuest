import { motion } from "framer-motion";

function Footer() {
  const year =
    new Date().getFullYear();

  return (
    <motion.footer
      className="footer"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        marginTop: "30px",
        padding: "15px",
        textAlign: "center",
        fontSize: "14px",
        opacity: 0.8,
      }}
    >
      <p>
        🚀 CareerQuest
      </p>

      <p>
        AI-Powered Career
        Exploration Toy
      </p>

      <p>
        © {year} CareerQuest
      </p>
    </motion.footer>
  );
}

export default Footer;