import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { evaluateMission } from "../services/evaluateService";

function MemoryGame() {
  const navigate = useNavigate();

  // 🔄 Dynamic mission state tracking to handle network timing latencies
  const [mission, setMission] = useState({});
  const [cards, setCards] = useState([]);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    const loadMission = () => {
      const storedMission = JSON.parse(localStorage.getItem("current_mission") || "{}");
      setMission(storedMission);
    };

    loadMission();

    window.addEventListener("storage", loadMission);
    return () => window.removeEventListener("storage", loadMission);
  }, []);

  // 🔮 UNLIMITED ENGINE: Regenerate card layout dynamically whenever mission metadata updates
  useEffect(() => {
    const rawCards = mission.cards || mission.game_payload?.cards || mission.items;
    if (Array.isArray(rawCards) && rawCards.length > 0) {
      setCards(rawCards);
      return;
    }
    
    // Fallback: Generate a unique puzzle on the fly based on the AI text context
    const descriptionText = mission.description || mission.instruction || "Brain Focus Power Quest";
    const words = descriptionText.split(" ").slice(0, 4);
    const dynamicPairs = [...words, ...words];
    
    // Fisher-Yates Shuffle so games are never identical
    setCards(dynamicPairs.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    hasSubmitted.current = false;
  }, [mission]);

  const title = mission.title || mission.career || "Memory Challenge";
  const instruction = mission.instruction || mission.description || "Match all pairs.";
  const totalXP = mission.xp || mission.xp_reward || 20;

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const flipCard = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(index)) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;

    const [a, b] = flipped;
    setDisabled(true);

    if (cards[a] === cards[b]) {
      setMatched((prev) => [...prev, a, b]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 800);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0 && !hasSubmitted.current) {
      hasSubmitted.current = true;
      submitGame();
    }
  }, [matched, cards]);

  const submitGame = async () => {
    try {
      setLoading(true);
      const score = 100;
      const userId = Number(localStorage.getItem("user_id"));

      const result = await evaluateMission({
        user_id: userId,
        career: mission.career || "Explorer",
        challenge_type: "MEMORY",
        status: "Completed",
        xp_earned: totalXP,
        score: score,
      });

      localStorage.setItem("earned_xp", totalXP);
      localStorage.setItem("score", score);
      
      if (result) {
        if (result.total_xp) localStorage.setItem("user_xp", result.total_xp);
        if (result.level) localStorage.setItem("user_level", result.level);
        if (result.streak) localStorage.setItem("user_streak", result.streak);
      }

      navigate("/result");
    } catch (error) {
      // 🛠️ FIX: Changed Python print() to Javascript console.error to avoid terminal crash
      console.error("Unable to submit mission to API backend node:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}
    >
      <div className="dashboard-card" style={{ maxWidth: "600px", width: "100%", padding: "30px", background: "rgba(30, 27, 57, 0.85)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h1 style={{ textAlign: "center", color: "#fff", marginBottom: "10px" }}>🧠 {title}</h1>
        <h3 style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: "30px", fontSize: "16px", fontWeight: "normal" }}>{instruction}</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: cards.length > 6 ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
            gap: "15px",
            marginBottom: "20px"
          }}
        >
          {cards.map((card, index) => {
            const show = flipped.includes(index) || matched.includes(index);

            return (
              <button
                key={index}
                className="primary-btn"
                onClick={() => flipCard(index)}
                style={{
                  height: "100px",
                  fontSize: card.length > 2 ? "14px" : "32px",
                  background: show ? "rgba(0, 229, 255, 0.2)" : "rgba(255,255,255,0.05)",
                  border: show ? "2px solid #00e5ff" : "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "transform 0.1s"
                }}
              >
                {show ? card : "❓"}
              </button>
            );
          })}
        </div>

        {loading && (
          <p style={{ marginTop: "20px", textAlign: "center", color: "#00e5ff", fontWeight: "bold" }}>
            Transmitting puzzle score data to station... 📡
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default MemoryGame;