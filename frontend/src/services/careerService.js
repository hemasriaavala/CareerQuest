import api from "./api";

export const getCareers =
  async () => {
    const response =
      await api.get(
        "/careers"
      );

    return response.data;
  };