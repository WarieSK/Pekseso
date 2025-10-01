import React, { useState } from "react";
import "./App.css"; // <-- importujeme CSS

import { useMemoryGame } from "./hooks/useMemoryGame";
import Settings from "./components/Settings";
import GameBoard from "./components/GameBoard";
import Timer from "./components/Timer";
import ResultModal from "./components/ResultModal";
import ThemeSwitch from "./components/ThemeSwitch";
import ImageGalleryModal from "./components/ImageGalleryModal";

// Hook na načítanie obrázkov
const useImageLoader = (imageUrls) => {
  const [allLoaded, setAllLoaded] = useState(false);

  React.useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setAllLoaded(true);
      return;
    }

    Promise.all(
      imageUrls.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
          })
      )
    ).then(() => setAllLoaded(true));
  }, [imageUrls]);

  return allLoaded;
};

const App = ({ availableImages }) => {
  const [showGallery, setShowGallery] = useState(false);
  const allImagesLoaded = useImageLoader(availableImages);

  const {
    gameState,
    cards,
    numPairs,
    matchedCards,
    showModal,
    finalTime,
    timerRef,
    initializeGame,
    handleCardClick,
    handleNewGameFromUI,
  } = useMemoryGame();

  if (!allImagesLoaded) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Načítavam zdroje...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Pexeso</h1>
        <p>
          Ahoj, Klára. Tu je jednoduchá hra pexesa. Snáď ťa (aspoň na chvíľu)
          pobaví.
        </p>
        <p>PS: Fotky viem aj pridať xD</p>
      </header>

      {gameState === "settings" && <Settings onStartGame={initializeGame} />}

      {gameState !== "settings" && (
        <main className="main">
          <Timer isRunning={gameState === "playing"} ref={timerRef} />
          <p>
            Nájdené páry:{" "}
            <strong>
              {matchedCards.length} / {numPairs}
            </strong>
          </p>
          <GameBoard cards={cards} onCardClick={handleCardClick} />
          <button onClick={handleNewGameFromUI}>Nová Hra</button>
        </main>
      )}

      {showModal && !showGallery && (
        <ResultModal
          finalTime={finalTime}
          onNewGame={handleNewGameFromUI}
          onShowGallery={() => setShowGallery(true)}
        />
      )}

      {showGallery && (
        <ImageGalleryModal
          availableImages={availableImages}
          onClose={() => setShowGallery(false)}
        />
      )}
    </div>
  );
};

export default App;
