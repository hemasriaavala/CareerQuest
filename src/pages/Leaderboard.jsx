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
  getLeaderboard
} from "../services/leaderboardService";

function Leaderboard() {
  const navigate =
    useNavigate();

  const [players,
    setPlayers] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard =
    async () => {
      try {

        const data =
          await getLeaderboard();

        setPlayers(
          data.leaderboard
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

  const getMedal =
    (rank) => {
      switch (rank) {
        case 1:
          return "🥇";
        case 2:
          return "🥈";
        case 3:
          return "🥉";
        default:
          return "🏅";
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
          🏆 Leaderboard
        </h1>

        {players.length === 0 ? (

          <div
            className="mission-box"
          >
            <h2>
              No players yet
            </h2>

            <p>
              Start exploring
              careers 🚀
            </p>
          </div>

        ) : (

          <div
            className="leaderboard-list"
          >

            {players.map(
              (player) => (
                <div
                  key={player.id}
                  className="leaderboard-card"
                >

                  <div
                    className="leader-left"
                  >

                    <h1>
                      {
                        getMedal(
                          player.rank
                        )
                      }
                    </h1>

                    <div>

                      <h2>
                        {
                          player.name
                        }
                      </h2>

                      <p>
                        {
                          player.badge
                        }
                      </p>

                    </div>

                  </div>

                  <div>

                    <h2>
                      ⭐
                      {" "}
                      {
                        player.xp
                      }
                      {" XP"}
                    </h2>

                    <p>
                      Level
                      {" "}
                      {
                        player.level
                      }
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

export default Leaderboard;