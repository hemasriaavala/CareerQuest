import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import StarField from "./components/StarField";
// 1. Import your custom background music hook
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";

function App() {
  // 2. Initialize the background music with the filename 'startadventure'
  // This will loop automatically across your entire application
  useBackgroundMusic('startadventure'); 

  return (
    <div 
      className="app-container" 
      style={{ 
        position: "relative", 
        minHeight: "100vh", 
        overflowX: "hidden",
        backgroundColor: "#0d0b21"
      }}
    >
      {/* Global background layer */}
      <StarField stars={60} />
      
      {/* Primary routing system core shell */}
      <AppRoutes />
    </div>
  );
}

export default App;