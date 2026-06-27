import api from "./api";

export const getAchievements =
  async (userId) => {

    const response =
      await api.get(
        `/achievements/${userId}`
      );

    return response.data;
  };