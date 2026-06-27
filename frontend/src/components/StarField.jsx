import { useMemo, useEffect } from "react";

function StarField({
  stars = 150,
  shootingStars = true,
}) {

  const starPositions = useMemo(
    () =>
      [...Array(stars)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 50 + 50,
        delay: Math.random() * 50,
      })),
    [stars]
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--shoot-time",
      `${Math.random() * 10 + 5}s`
    );
  }, []);

  return (
    <div className="star-field">
      <div className="stars">
        {starPositions.map((star, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
      {shootingStars && (
        <div className="shooting-stars">
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
          <div className="shooting-star"></div>
        </div>
      )}
    </div>
  );
};

export default StarField;