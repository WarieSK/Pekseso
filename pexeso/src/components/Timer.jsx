import "./Timer.css";

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

// Použijeme forwardRef, aby sme mohli volať metódy priamo z App.jsx
const Timer = forwardRef(({ isRunning, onTimeUpdate }, ref) => {
  const [time, setTime] = useState(0);

  // Exponovanie metód pre rodičovskú komponentu (App.jsx)
  useImperativeHandle(ref, () => ({
    // Metóda na vrátenie aktuálneho času
    getCurrentTime: () => time,
    // Metóda na resetovanie času pri novej hre
    reset: () => setTime(0),
  }));

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          // Volanie callbacku, aby App.jsx vedela o aktuálnom čase (voliteľné)
          if (onTimeUpdate) {
            onTimeUpdate(newTime);
          }
          return newTime;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    // Cleanup
    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h2>Čas: {formatTime(time)}</h2>
    </div>
  );
});

export default Timer;
