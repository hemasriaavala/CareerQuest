// services/sound.js
let backgroundMusic = null;

export const playBackgroundMusic = (src) => {
  // If it's already playing, don't restart it
  if (backgroundMusic && !backgroundMusic.paused) return;

  backgroundMusic = new Audio(src);
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.4;
  
  backgroundMusic.play().catch(e => console.error("Autoplay blocked", e));
};