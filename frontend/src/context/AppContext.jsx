import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AppContext =
  createContext(null);

export function AppProvider({
  children,
}) {
  const [loading,
    setLoading] =
    useState(true);

  const [userId,
    setUserId] =
    useState(null);

  const [user,
    setUser] =
    useState("Explorer");

  const [age,
    setAge] =
    useState(8);

  const [xp,
    setXp] =
    useState(0);

  const [level,
    setLevel] =
    useState(1);

  const [missions,
    setMissions] =
    useState(0);

  const [streak,
    setStreak] =
    useState(1);

  const [badge,
    setBadge] =
    useState(
      "Career Explorer"
    );

  const refreshUser =
    () => {
      setUserId(
        Number(
          localStorage.getItem(
            "user_id"
          )
        ) || null
      );

      setUser(
        localStorage.getItem(
          "user_name"
        ) ||
          "Explorer"
      );

      setAge(
        Number(
          localStorage.getItem(
            "user_age"
          )
        ) || 8
      );

      setXp(
        Number(
          localStorage.getItem(
            "user_xp"
          )
        ) || 0
      );

      setLevel(
        Number(
          localStorage.getItem(
            "user_level"
          )
        ) || 1
      );

      setMissions(
        Number(
          localStorage.getItem(
            "user_missions"
          )
        ) || 0
      );

      setStreak(
        Number(
          localStorage.getItem(
            "user_streak"
          )
        ) || 1
      );

      setBadge(
        localStorage.getItem(
          "user_badge"
        ) ||
          "Career Explorer"
      );
    };

  const resetUser =
    () => {
      localStorage.clear();

      setUserId(null);
      setUser(
        "Explorer"
      );
      setAge(8);
      setXp(0);
      setLevel(1);
      setMissions(0);
      setStreak(1);
      setBadge(
        "Career Explorer"
      );
    };

  useEffect(() => {
    refreshUser();
    setLoading(false);
  }, []);

  const value = {
    loading,

    userId,
    setUserId,

    user,
    setUser,

    age,
    setAge,

    xp,
    setXp,

    level,
    setLevel,

    missions,
    setMissions,

    streak,
    setStreak,

    badge,
    setBadge,

    refreshUser,
    resetUser,
  };

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context =
    useContext(
      AppContext
    );

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
}