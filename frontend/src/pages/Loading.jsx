import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMission
} from "../services/missionService";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    loadMission();
  }, []);

  const loadMission = async () => {
    try {

      const age =
        Number(
          localStorage.getItem(
            "user_age"
          )
        ) || 8;

      const career =
        localStorage.getItem(
          "selected_career"
        ) || "Engineer";

      const journey =
        localStorage.getItem(
          "selected_journey"
        ) || "Explorer";

      const level =
        Number(
          localStorage.getItem(
            "journey_level"
          )
        ) || 1;

      const taskType =
        localStorage.getItem(
          "preferred_task_type"
        ) || "Virtual";

      console.log(
        "Loading Mission:",
        {
          age,
          career,
          journey,
          level,
          taskType
        }
      );

      const mission =
        await getMission(
          age,
          career,
          journey,
          level,
          taskType
        );

      localStorage.setItem(
        "mission",
        JSON.stringify(
          mission
        )
      );

      navigate("/mission");

    } catch (error) {

      console.error(
        "Mission Error:",
        error
      );

      alert(
        "Unable to load mission."
      );

      navigate("/careers");
    }
  };

  return (
    <motion.div
      className="screen"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
    >
      <motion.div
        className="loading-card"
        initial={{
          scale: 0.9
        }}
        animate={{
          scale: 1
        }}
        transition={{
          duration: 0.4
        }}
      >
        <div className="loader"></div>

        <h1>
          🧠 AI is preparing your mission...
        </h1>

        <p>
          ✨ Generating your adventure 🚀
        </p>

      </motion.div>
    </motion.div>
  );
}

export default Loading;