import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Settings() {
  const navigate = useNavigate();

  const [sound, setSound] =
    useState(
      localStorage.getItem(
        "sound"
      ) !== "false"
    );

  const [music, setMusic] =
    useState(
      localStorage.getItem(
        "music"
      ) !== "false"
    );

  const toggleSound = () => {
    const value = !sound;

    setSound(value);

    localStorage.setItem(
      "sound",
      value
    );
  };

  const toggleMusic = () => {
    const value = !music;

    setMusic(value);

    localStorage.setItem(
      "music",
      value
    );
  };

  const handleReset = () => {
    alert(
      "Progress reset will be available in a future update."
    );
  };

  const handleLogout = () => {
    const ok =
      window.confirm(
        "Switch Explorer?"
      );

    if (!ok) return;

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "user_id"
    );

    localStorage.removeItem(
      "user_name"
    );

    localStorage.removeItem(
      "user_age"
    );

    localStorage.removeItem(
      "user_xp"
    );

    localStorage.removeItem(
      "user_level"
    );

    localStorage.removeItem(
      "user_missions"
    );

    localStorage.removeItem(
      "user_badge"
    );

    localStorage.removeItem(
      "user_streak"
    );

    localStorage.removeItem(
      "mission"
    );

    localStorage.removeItem(
      "result"
    );

    localStorage.removeItem(
      "selected_career"
    );

    localStorage.removeItem(
      "selected_journey"
    );

    navigate("/");
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="dashboard-card">

        <h1 className="page-title">
          ⚙️ Settings
        </h1>

        <div className="settings-list">

          <button
            className="setting-card"
            onClick={toggleSound}
          >
            🔊 Sound :
            {sound
              ? " ON"
              : " OFF"}
          </button>

          <button
            className="setting-card"
            onClick={toggleMusic}
          >
            🎵 Music :
            {music
              ? " ON"
              : " OFF"}
          </button>

          <button
            className="setting-card reset-btn"
            onClick={handleReset}
          >
            🗑 Reset Progress
          </button>

          <button
            className="setting-card logout-btn"
            onClick={handleLogout}
          >
            🚪 Switch Explorer
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >
            🏠 Dashboard
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default Settings;