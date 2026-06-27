import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import your 10 game engines from the games directory folder
import QuizGame from "../games/QuizGame";
import SimulationGame from "../games/SimulationGame";
import RolePlaygame from "../games/RolePlaygame";
import BuilderGame from "../games/BuilderGame";
import SortingGame from "../games/SortingGame";
import MemoryGame from "../games/MemoryGame";
import Patterngame from "../games/Patterngame";
import PuzzleGame from "../games/PuzzleGame";
import ReactionGame from "../games/ReactionGame";
import CreativityGame from "../games/CreativityGame";

function Game() {
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    // Read the structured AI mission storage block safely
    const savedMission = localStorage.getItem("mission");
    
    if (!savedMission) {
      console.warn("⚠️ No active mission found in localStorage. Returning to dashboard.");
      navigate("/dashboard");
      return;
    }

    try {
      setMission(JSON.parse(savedMission));
    } catch (e) {
      console.error("🔥 Error parsing mission payload data:", e);
      navigate("/dashboard");
    }
  }, [navigate]);

  // While localStorage is loading, keep our arcade spinner active
  if (!mission) {
    return (
      <div className="screen">
        <div className="loading-card">
          <div className="loader"></div>
          <h1>🎮 Loading Game...</h1>
          <p>Preparing your adventure 🚀</p>
        </div>
      </div>
    );
  }

  const gameType = mission.gameType ? mission.gameType.toLowerCase() : "quiz";

  // Dynamic router logic injection instead of pushing missing sub-URLs
  switch (gameType) {
    case "quiz":
      return <QuizGame mission={mission} />;
    case "simulation":
      return <SimulationGame mission={mission} />;
    case "roleplay":
      return <RolePlaygame mission={mission} />;
    case "builder":
      return <BuilderGame mission={mission} />;
    case "sorting":
      return <SortingGame mission={mission} />;
    case "memory":
      return <MemoryGame mission={mission} />;
    case "pattern":
      return <Patterngame mission={mission} />;
    case "puzzle":
      return <PuzzleGame mission={mission} />;
    case "reaction":
      return <ReactionGame mission={mission} />;
    case "creativity":
      return <CreativityGame mission={mission} />;
    default:
      console.warn(`⚠️ Unrecognized game engine structure '${gameType}'. Defaulting to Quiz view.`);
      return <QuizGame mission={mission} />;
  }
}

export default Game;