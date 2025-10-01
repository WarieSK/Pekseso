/**
 * src/utils/gameUtils.js
 * Obsahuje pomocné funkcie pre logiku hry.
 */

// Premieša prvky v poli pomocou Fisher-Yates algoritmu
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
