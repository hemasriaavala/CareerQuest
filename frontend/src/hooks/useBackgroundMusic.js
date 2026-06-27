import { useEffect, useRef, useState } from 'react';

export function useBackgroundMusic(filename) {
  // Use a ref to store the audio object so it persists across renders
  const audioRef = useRef(new Audio(`/sounds/${filename}.mp3`));
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.2;

    const playAudio = () => {
      if (isPlaying) {
        audio.play().catch((err) => {
          console.warn("Autoplay blocked, waiting for interaction:", err);
        });
      } else {
        audio.pause();
      }
    };

    // Attempt to play immediately
    playAudio();

    // Browser Autoplay Fix: 
    // Listen for the first user interaction anywhere on the page
    // to start the audio if the initial play() was blocked.
    const handleInteraction = () => {
      if (isPlaying) {
        audio.play().catch(() => {});
      }
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [isPlaying, filename]);

  const toggleMusic = () => setIsPlaying(!isPlaying);
  
  return { toggleMusic, isPlaying };
}