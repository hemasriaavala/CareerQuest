import axios from "axios";

// Direct root link to your FastAPI Uvicorn server port
const API_BASE_URL = "http://127.0.0.1:8000"; 

export const registerUser = async (userData) => {
  try {
    // This MUST hit exactly /register with NO /api prefix and NO trailing slash
    const response = await axios.post(`${API_BASE_URL}/register`, {
      name: userData.name,
      age: Number(userData.age)
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration API call:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  return await registerUser(userData);
};