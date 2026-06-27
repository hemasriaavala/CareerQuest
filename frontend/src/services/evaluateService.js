import api from "./api";

export const evaluateMission = async (data) => {
  const response = await api.post("/evaluate", data);
  return response.data;
};