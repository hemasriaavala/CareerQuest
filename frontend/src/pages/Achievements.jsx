import {
  useMemo
} from "react";

import {
  motion
} from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import achievementsData
from "../data/achievements";

function Achievements() {
  const navigate =
    useNavigate();

  const xp = Number(
    localStorage.getItem(
      "user_xp"
    )
  ) || 0;

  const level = Number(
    localStorage.getItem(
      "user_level"
    )
  ) || 1;

  const missions = Number(
    localStorage.getItem(
      "user_missions"
    )
  ) || 0;

  const streak = Number(
    localStorage.getItem(
      "user_streak"
    )
  ) || 1;

  const achievements =
    useMemo(() => {
      return achievementsData.map(
        (item) => {
          let unlocked =
            false;

          switch (
            item.title
          ) {
            case "First Mission":
              unlocked =
                missions >= 1;
              break;

            case "Explorer":
              unlocked =
                missions >= 5;
              break;

            case "Career Adventurer":
              unlocked =
                level >= 3;
              break;

            case "Mission Master":
              unlocked =
                missions >= 25;
              break;

            case "Learning Legend":
              unlocked =
                level >= 10;
              break;

            case "Consistency Star":
              unlocked =
                streak >= 7;
              break;

            case "Ultimate Explorer":
              unlocked =
                missions >= 100;
              break;

            default:
              unlocked =
                false;
          }

          return {
            ...item,
            unlocked,
          };
        }
      );
    }, [
      level,
      missions,
      streak,
      xp,
    ]);

  return (
    <motion.div
      className="screen"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <div
        className="dashboard-card"
      >
        <h1
          className="page-title"
        >
          🏅 Achievements
        </h1>

        <div
          className="achievement-list"
        >
          {achievements.map(
            (item) => (
              <div
                key={item.id}
                className={
                  item.unlocked
                    ? "achievement-card"
                    : "achievement-card locked"
                }
              >
                <h1>
                  {item.icon}
                </h1>

                <div>
                  <h2>
                    {
                      item.title
                    }
                  </h2>

                  <p>
                    {
                      item.description
                    }
                  </p>
                </div>

                {!item.unlocked && (
                  <h2>
                    🔒
                  </h2>
                )}
              </div>
            )
          )}
        </div>

        <button
          className="primary-btn"
          style={{
            marginTop:
              "30px",
          }}
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          🏠 Dashboard
        </button>
      </div>
    </motion.div>
  );
}

export default Achievements;