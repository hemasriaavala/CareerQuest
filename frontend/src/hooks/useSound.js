function useSound() {
  const playSound = (file) => {
    const audio = new Audio(file);
    
    // Wrap the play command in a promise handler to catch autoplay blocks
    audio.play().catch((error) => {
      console.warn("Sound play prevented by browser policy:", error);
    });
  };

  return {
    playSound,
  };
}

export default useSound;