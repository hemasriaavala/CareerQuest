import api from "./api";

export const getMission = async (
  age,
  career,
  journey,
  level,
  taskType
) => {

  const response = await api.post(
    "/mission",
    {
      age,
      career,
      journey,
      level,
      taskType
    }
  );

  return response.data;
};