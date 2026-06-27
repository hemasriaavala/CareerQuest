import { useState } from "react";
import { getMission } from "../services/api";

function useMission() {
  const [mission,
    setMission] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const generateMission =
    async (
      payload
    ) => {
      try {
        setLoading(true);

        const data =
          await getMission(
            payload
          );

        setMission(data);

        localStorage.setItem(
          "mission",
          JSON.stringify(
            data
          )
        );

        return data;
      } finally {
        setLoading(false);
      }
    };

  return {
    mission,
    loading,
    generateMission,
  };
}

export default useMission;