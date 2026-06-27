import {
  useEffect,
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  useNavigate
} from "react-router-dom";

import {
  getHistory
} from "../services/historyService";

function History() {
  const navigate =
    useNavigate();

  const [history,
    setHistory] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory =
    async () => {
      try {

        const userId =
          Number(
            localStorage.getItem(
              "user_id"
            )
          );

        const data =
          await getHistory(
            userId
          );

        setHistory(
          data.history
        );

      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  if (loading) {
    return (
      <div className="screen">
        Loading...
      </div>
    );
  }

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
      <div
        className="dashboard-card"
      >

        <h1
          className="page-title"
        >
          📜 Mission History
        </h1>

        {history.length === 0 ? (

          <div
            className="mission-box"
          >
            <h2>
              No missions yet
            </h2>

            <p>
              Start your first
              adventure 🚀
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                navigate(
                  "/careers"
                )
              }
            >
              Start Mission
            </button>

          </div>

        ) : (

          <div
            className="history-list"
          >

            {history.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="history-card"
                >

                  <div>
                    <h2>
                      🚀
                      {" "}
                      {
                        item.mission
                      }
                    </h2>

                    <p>
                      Score:
                      {" "}
                      {
                        item.score
                      }
                    </p>
                  </div>

                  <div
                    className="history-right"
                  >
                    <h3>
                      🏆 +
                      {
                        item.xp
                      }
                      {" XP"}
                    </h3>

                    <p>
                      {new Date(
                        item.completed_at
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>

              )
            )}

          </div>

        )}

        <button
          className="primary-btn"
          style={{
            marginTop:
              "30px"
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

export default History;