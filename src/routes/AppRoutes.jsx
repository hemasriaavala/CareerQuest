import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Pages */
import Splash from "../pages/Splash";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Careers from "../pages/Careers";
import CareerJourney from "../pages/CareerJourney";
import TaskType from "../pages/TaskType";
import Loading from "../pages/Loading";
import Mission from "../pages/Mission";
import Game from "../pages/Game";
import Camera from "../pages/Camera";
import Result from "../pages/Result";

import Profile from "../pages/Profile";
import History from "../pages/History";
import Achievements from "../pages/Achievements";
import Leaderboard from "../pages/Leaderboard";
import Settings from "../pages/Settings";

/* Games */
import BuilderGame from "../games/BuilderGame";
import PuzzleGame from "../games/PuzzleGame";
import QuizGame from "../games/QuizGame";
import SimulationGame from "../games/SimulationGame";
import CreativityGame from "../games/CreativityGame";
import MemoryGame from "../games/MemoryGame";
import SortingGame from "../games/SortingGame";
import PatternGame from "../games/PatternGame"; // ✅ Fixed casing path mismatch to match disk
import ReactionGame from "../games/ReactionGame";
import RolePlayGame from "../games/RolePlayGame";

function AppRoutes() {
  return (
    <Routes>
      {/* Main Flow */}
      <Route path="/" element={<Splash />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/journey" element={<CareerJourney />} />
      <Route path="/tasktype" element={<TaskType />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/game" element={<Game />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/result" element={<Result />} />

      {/* User Pages */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/history" element={<History />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/settings" element={<Settings />} />

      {/* Game Engines */}
      <Route path="/quiz" element={<QuizGame />} />
      <Route path="/sorting" element={<SortingGame />} />
      <Route path="/memory" element={<MemoryGame />} />
      <Route path="/puzzle" element={<PuzzleGame />} />
      <Route path="/reaction" element={<ReactionGame />} />
      <Route path="/builder" element={<BuilderGame />} />
      <Route path="/simulation" element={<SimulationGame />} />
      <Route path="/creativity" element={<CreativityGame />} />
      <Route path="/roleplay" element={<RolePlayGame />} />
      <Route path="/pattern" element={<PatternGame />} />

      {/* Invalid Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;