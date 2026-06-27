import axios from "axios";

// Points directly to your root Uvicorn server address
const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Global interceptor utility to sanitize broken database/AI payloads
 */
const sanitizeMissionPayload = (mission) => {
  if (!mission) return mission;

  const targetPlaceholder = "read through your active game engine rules";
  
  // Immersive, contextual replacements based on the mission type
  const fallbackInstructions = {
    PATTERN: "Identify the hidden sequence pattern logic and select the missing element.",
    QUIZ: "Analyze the technical aptitude scenario carefully and select the best resolution.",
    CODING: "Review the logic constraints and complete the structural function implementation.",
    DEFAULT: "Deploy your professional skills to analyze the scenario and execute the mission."
  };

  // Check both common variants: 'instruction' or 'description'
  const textKey = mission.instruction ? 'instruction' : mission.description ? 'description' : null;
  
  if (textKey && mission[textKey].toLowerCase().includes(targetPlaceholder)) {
    // Detect challenge type or default to standard fallback
    const type = (mission.challenge_type || mission.gameType || "DEFAULT").toUpperCase();
    mission[textKey] = fallbackInstructions[type] || fallbackInstructions.DEFAULT;
  }

  return mission;
};

/**
 * Fetch the complete kid dashboard stats by User ID
 * Matches API Endpoint: GET /dashboard/{user_id}
 */
export const getDashboard = async (userId) => {
  try {
    // Injects userId right into the URL path, matching your FastAPI specification exactly!
    const response = await axios.get(`${API_BASE_URL}/dashboard/${userId}`);
    let data = response.data;

    // 🕵️‍♂️ Global Clean Up: Intercept active mission texts before they render
    if (data && data.current_mission) {
      data.current_mission = sanitizeMissionPayload(data.current_mission);
    }

    return data;
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    throw error;
  }
};