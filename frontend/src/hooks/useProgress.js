import { useState } from "react";
import {
  getDashboard,
} from "../services/progressService";

function useProgress() {
  const [progress,
    setProgress] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const loadProgress =
    async (
      userId
    ) => {
      try {
        setLoading(true);

        const data =
          await getDashboard(
            userId
          );

        setProgress(
          data
        );

        return data;
      } finally {
        setLoading(false);
      }
    };

  return {
    progress,
    loading,
    loadProgress,
  };
}

export default useProgress;