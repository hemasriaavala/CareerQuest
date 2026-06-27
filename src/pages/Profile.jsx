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
  getProfile
} from "../services/profileService";

function Profile() {
  const navigate =
    useNavigate();

  const [profile,
    setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        const userId =
          Number(
            localStorage.getItem(
              "user_id"
            )
          );

        const data =
          await getProfile(
            userId
          );

        setProfile(
          data
        );
      } catch (error) {
        console.error(
          error
        );

        alert(
          "Unable to load profile."
        );
      }
    };

  if (!profile) {
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
          👤 Profile
        </h1>

        <div
          className="profile-avatar"
        >
          🤖
        </div>

        <h1
          className="profile-name"
        >
          {profile.name}
        </h1>

        <div
          className="profile-grid"
        >

          <div
            className="profile-item"
          >
            🎂 Age:
            {" "}
            {profile.age}
          </div>

          <div
            className="profile-item"
          >
            ⭐ XP:
            {" "}
            {profile.xp}
          </div>

          <div
            className="profile-item"
          >
            🏆 Level:
            {" "}
            {profile.level}
          </div>

          <div
            className="profile-item"
          >
            🔥 Streak:
            {" "}
            {profile.streak}
          </div>

          <div
            className="profile-item"
          >
            📚 Missions:
            {" "}
            {profile.missions}
          </div>

          <div
            className="profile-item"
          >
            🏅 Achievements:
            {" "}
            {profile.total_achievements}
          </div>

        </div>

        <div
          className="badge-card"
        >
          🏅
          {" "}
          {profile.badge}
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >
          🏠 Back to Dashboard
        </button>

      </div>
    </motion.div>
  );
}

export default Profile;