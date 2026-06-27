import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import journeys from "../data/journeys";
import JourneyCard from "../components/JourneyCard";

function CareerJourney() {
  const navigate = useNavigate();

  const career =
    localStorage.getItem(
      "selected_career"
    ) || "Engineer";

  const userLevel =
    Number(
      localStorage.getItem(
        "user_level"
      )
    ) || 1;

  const journeyList =
    journeys[career] || [];

  const startJourney = (
    title,
    index
  ) => {

    localStorage.setItem(
      "selected_journey",
      title
    );

    localStorage.setItem(
      "journey_level",
      index + 1
    );

    // Optional convenience data
    localStorage.setItem(
      "current_career",
      career
    );

    localStorage.setItem(
      "current_journey",
      title
    );

    navigate("/tasktype");
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
        <h1
          className="page-title"
        >
          🚀 {career} Journey
        </h1>

        <p className="subtitle">
          Choose your next level
          and continue your
          adventure.
        </p>

        <div
          className="journey-grid"
        >

          {journeyList.map(
            (
              item,
              index
            ) => (
              <JourneyCard
                key={index}
                title={item}
                level={
                  index + 1
                }
                unlocked={
                  userLevel >=
                  index + 1
                }
                onClick={() =>
                  startJourney(
                    item,
                    index
                  )
                }
              />
            )
          )}

        </div>

        <button
          className="small-btn"
          style={{
            marginTop:
              "30px"
          }}
          onClick={() =>
            navigate(
              "/careers"
            )
          }
        >
          ⬅ Back to Careers
        </button>

      </motion.div>
    </motion.div>
  );
}

export default CareerJourney;