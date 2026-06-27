import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function TaskType() {
  const navigate = useNavigate();

  const career =
    localStorage.getItem("selected_career") ||
    "Engineer";

  const journey =
    localStorage.getItem("selected_journey") ||
    "Explorer";

  const chooseTask = (taskType) => {

    // Save selected mission type
    localStorage.setItem(
      "preferred_task_type",
      taskType
    );

    console.log(
      "Selected Task Type:",
      taskType
    );

    navigate("/loading");
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="dashboard-card"
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.5
        }}
      >
        <h1 className="page-title">
          🎯 Choose Mission Type
        </h1>

        <p className="subtitle">
          Career: <strong>{career}</strong>
        </p>

        <p className="subtitle">
          Journey: <strong>{journey}</strong>
        </p>

        <div
          style={{
            display: "grid",
            gap: "25px",
            marginTop: "40px"
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              chooseTask("Virtual")
            }
          >
            🎮 Virtual Mission
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              chooseTask("Practical")
            }
          >
            📸 Practical Mission
          </button>
        </div>

        <button
          className="small-btn"
          style={{
            marginTop: "35px"
          }}
          onClick={() =>
            navigate("/journey")
          }
        >
          ⬅ Back
        </button>
      </motion.div>
    </motion.div>
  );
}

export default TaskType;