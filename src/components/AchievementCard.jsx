function AchievementCard({
  badge = "🏅",
  title = "Achievement",
  description = "",
  unlocked = false,
}) {
  return (
    <div
      className={
        unlocked
          ? "achievement-card"
          : "achievement-card locked"
      }
    >
      <h1>{badge}</h1>

      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {!unlocked && <h2>🔒</h2>}
    </div>
  );
}

export default AchievementCard;