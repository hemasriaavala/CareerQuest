import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Navbar({
  title = "CareerQuest",
  showBack = false,
  showHome = false,
}) {
  const navigate = useNavigate();

  return (
    <motion.nav
      className="navbar"
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <div className="navbar-left">
        {showBack && (
          <button
            className="nav-btn"
            onClick={() =>
              navigate(-1)
            }
          >
            ⬅
          </button>
        )}

        <h2 className="navbar-title">
          🚀 {title}
        </h2>
      </div>

      <div className="navbar-right">
        {showHome && (
          <button
            className="nav-btn"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >
            🏠
          </button>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;