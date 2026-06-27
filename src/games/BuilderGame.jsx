import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function BuilderGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking
  const [mission, setMission] = useState({});

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    loadMission();

    // Listen for storage events if updates finish out-of-sync with render
    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  const title = mission.title || mission.career || "Bridge Builder";
  const instruction = mission.instruction || mission.description || "Build your structure.";
  
  // 🔮 UNLIMITED ENGINE: Fallback dynamically calculates unique block counts based on AI text values
  const getTargetBlocks = () => {
    const rawTarget = mission.target_blocks || mission.targetBlocks || mission.game_payload?.target_blocks;
    if (rawTarget && !isNaN(rawTarget)) return Number(rawTarget);
    
    // Auto-generate target blocks based on length constraints if AI forgets to declare a limit
    const calculatedCount = ((title.length + instruction.length) % 5) + 4; // Yields a dynamic number between 4 and 8
    return calculatedCount;
  };

  const targetBlocks = getTargetBlocks();
  const totalXP = mission.xp || mission.xp_reward || 20;

  const colors = [
    "#ff6b6b",
    "#4d7cff",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
  ];

  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset block array layout if the active mission targets switch under-the-hood
  useEffect(() => {
    setBlocks([]);
  }, [mission]);

  const addBlock = (color) => {
    if (blocks.length >= targetBlocks) return;

    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        color,
      },
    ]);
  };

  const removeBlock = () => {
    setBlocks((prev) => prev.slice(0, -1));
  };

  const finishMission = async () => {
    if (blocks.length !== targetBlocks) return;

    try {
      setLoading(true);
      const score = 100;
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Builder",
        challenge_type: "BUILDER",
        status: "success",
      });

      localStorage.setItem("earned_xp", totalXP);
      localStorage.setItem("score", score);
      
      if (result) {
        if (result.total_xp || result.xp) localStorage.setItem("user_xp", result.total_xp ?? result.xp);
        if (result.level) localStorage.setItem("user_level", result.level);
      }

      navigate("/result");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Unable to save your block structure to the game station.");
    } finally {
      setLoading(false);
    }
  };

  const isStructureComplete = blocks.length === targetBlocks;

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}
    >
      <div className="dashboard-card" style={{ maxWidth: "500px", width: "100%", background: "rgba(30, 27, 57, 0.85)", borderRadius: "24px", padding: "30px", border: "1px solid rgba(255,255,255,0.1)" }}>

        <h1 style={{ textAlign: "center", color: "#fff", fontSize: "28px", margin: 0 }}>
          {title.startsWith("🧱") ? title : `🧱 ${title}`}
        </h1>

        <h2 style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "16px", marginTop: "12px", fontWeight: "400" }}>
          {instruction}
        </h2>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <span style={{
            background: isStructureComplete ? "rgba(46, 204, 113, 0.2)" : "rgba(255, 255, 255, 0.06)",
            border: isStructureComplete ? "1px solid #2ecc71" : "1px solid rgba(255,255,255,0.1)",
            color: isStructureComplete ? "#2ecc71" : "#fff",
            padding: "8px 16px",
            borderRadius: "50px",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "all 0.3s ease"
          }}>
            {isStructureComplete ? "🎉 Target Reached! Ready to Launch!" : `Blocks: ${blocks.length} / ${targetBlocks}`}
          </span>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "220px",
            background: "rgba(0, 0, 0, 0.2)",
            border: isStructureComplete ? "3px dashed #2ecc71" : "3px dashed rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
            marginTop: "25px",
            padding: "20px",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignContent: "center",
            justifyContent: "center",
            transition: "border 0.3s ease"
          }}
        >
          <AnimatePresence>
            {blocks.length === 0 ? (
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                style={{ color: "#fff", margin: 0, fontSize: "15px" }}
              >
                Tap blocks below to build your project!
              </motion.h3>
            ) : (
              blocks.map((block) => (
                <motion.div
                  key={block.id}
                  initial={{ scale: 0, y: -30 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "14px",
                    background: block.color,
                    border: "3px solid white",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.3)"
                  }}
                />
              ))
            )}
          </AnimatePresence>
        </div>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", marginBottom: "10px", fontWeight: "600", textTransform: "uppercase" }}>
            Choose a building color:
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: blocks.length >= targetBlocks ? 1 : 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addBlock(color)}
                disabled={blocks.length >= targetBlocks}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: color,
                  border: "2px solid white",
                  cursor: blocks.length >= targetBlocks ? "not-allowed" : "pointer",
                  opacity: blocks.length >= targetBlocks ? 0.4 : 1,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "15px", marginTop: "35px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
          <button
            onClick={removeBlock}
            disabled={blocks.length === 0}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              background: "rgba(255, 77, 77, 0.1)",
              border: "1px solid rgba(255, 77, 77, 0.3)",
              color: "#ff4d4d",
              cursor: blocks.length === 0 ? "not-allowed" : "pointer",
              opacity: blocks.length === 0 ? 0.5 : 1,
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            🗑 Remove Block
          </button>

          <button
            onClick={finishMission}
            disabled={!isStructureComplete || loading}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              background: isStructureComplete ? "#00e5ff" : "rgba(255,255,255,0.05)",
              border: "none",
              color: isStructureComplete ? "#000" : "rgba(255,255,255,0.3)",
              cursor: !isStructureComplete ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: isStructureComplete ? "0 4px 15px rgba(0, 229, 255, 0.3)" : "none",
              transition: "all 0.3s ease"
            }}
          >
            {loading ? "Testing Construction... 📡" : "🚀 Launch Test"}
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default BuilderGame;