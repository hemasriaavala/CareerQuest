import api from "./api";

export const getRecommendations =
  async (userId) => {
    const response =
      await api.get(
        `/recommendation/${userId}`
      );

    return response.data;
  };