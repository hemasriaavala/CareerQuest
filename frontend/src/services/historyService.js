import api from "./api";

export const getHistory =
  async (userId) => {

    const response =
      await api.get(
        `/history/${userId}`
      );

    return response.data;
  };