import { useState, useEffect, useCallback, useRef } from "react";
import { shuffleArray } from "../utils/gameUtils";
import { availableImages } from "../utils/imageLoader";

/**
 * Custom hook useMemoryGame
 * Spravuje celú hernú logiku, stav a časovač.
 * @returns {object} Stavové premenné a funkcie pre App.jsx.
 */
export const useMemoryGame = () => {
  // Stav hry
  const [gameState, setGameState] = useState("settings"); // 'settings', 'playing', 'finished'
  const [cards, setCards] = useState([]);
  const [numPairs, setNumPairs] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]); // ID kariet, ktoré sú práve otočené
  const [matchedCards, setMatchedCards] = useState([]); // PairID nájdených párov
  const [showModal, setShowModal] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  // Referencia na Timer komponent
  const timerRef = useRef();

  // --- Inicializácia/Reset Hry ---
  const initializeGame = useCallback((pairs) => {
    if (availableImages.length < pairs) {
      // V reálnej app by sa namiesto alertu použil modal/notifikácia
      console.error(
        `Nedostatok obrázkov! K dispozícii je len ${availableImages.length} jedinečných obrázkov.`
      );
      setGameState("settings");
      return;
    }

    // Reset Timer pri spustení novej hry
    if (timerRef.current && timerRef.current.reset) {
      timerRef.current.reset();
    }

    // Vytvorenie a premiešanie kariet
    const shuffledImages = shuffleArray([...availableImages]);
    const selectedImages = shuffledImages.slice(0, pairs);

    let newCards = [];
    selectedImages.forEach((image, index) => {
      const pairId = index;
      const baseCard = { pairId, image, isFlipped: false, isMatched: false };
      newCards.push({ ...baseCard, id: index * 2 });
      newCards.push({ ...baseCard, id: index * 2 + 1 });
    });

    const finalCards = shuffleArray(newCards);

    setNumPairs(pairs);
    setCards(finalCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setShowModal(false);
    setGameState("playing");
  }, []);

  // --- Logika Otočenia Karty ---
  const handleCardClick = useCallback(
    (cardId) => {
      const card = cards.find((c) => c.id === cardId);
      if (
        gameState !== "playing" ||
        card.isFlipped ||
        card.isMatched ||
        flippedCards.length === 2
      ) {
        return;
      }

      setCards((prevCards) =>
        prevCards.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );

      setFlippedCards((prevFlipped) => [...prevFlipped, cardId]);
    },
    [cards, flippedCards.length, gameState]
  );

  // --- Kontrola zhody ---
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [id1, id2] = flippedCards;
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      if (card1.pairId === card2.pairId) {
        // Pár nájdený!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.pairId === card1.pairId
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );
          setMatchedCards((prev) => [...prev, card1.pairId]);
          setFlippedCards([]);
        }, 500);
      } else {
        // Pár nenájdený!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === id1 || c.id === id2 ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  // --- Kontrola Konca Hry ---
  useEffect(() => {
    if (
      gameState === "playing" &&
      numPairs > 0 &&
      matchedCards.length === numPairs
    ) {
      setGameState("finished");

      // Získať konečný čas
      if (timerRef.current && timerRef.current.getCurrentTime) {
        const time = timerRef.current.getCurrentTime();
        setFinalTime(time);
      }

      // Zobraziť modal
      setShowModal(true);
    }
  }, [matchedCards, numPairs, gameState]);

  // Funkcia na reštart hry (volaná z modalu alebo tlačidla Nová hra)
  const handleNewGameFromUI = () => {
    setShowModal(false);
    setGameState("settings");
  };

  return {
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
    setGameState, // Pre tlačidlo "Nová Hra" mimo modalu
  };
};
