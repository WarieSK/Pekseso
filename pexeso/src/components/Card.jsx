// src/components/Card.jsx (2D Verzia)
import React from "react";
import "./Card.css";

const Card = ({ card, onClick }) => {
  // Ak je karta spárovaná, vrátime len prázdny kontajner, ktorý zmizne (opacity 0)
  if (card.isMatched) {
    return <div className="card matched-card" />;
  }

  const handleClick = () => {
    // Ak je karta už otočená, alebo je už spárovaná, neklikáme
    if (card.isFlipped || card.isMatched) return;
    onClick(card.id);
  };

  return (
    <div
      // Kľúčové: trieda 'flipped' riadi zobrazenie líca alebo rubu v CSS
      className={`card ${card.isFlipped ? "flipped" : "unflipped"}`}
      onClick={handleClick}
    >
      {/* V 2D verzii stačí zmeniť pozadie/obsah kontajnera, 
          ale ponecháme img pre jednoduchú manipuláciu s obrázkom. */}
      <div className="card-content">
        {/* Líc karty (obrázok) sa zobrazí len v stave 'flipped' */}
        {card.isFlipped ? (
          <img src={card.image} alt="Pexeso fotka" />
        ) : (
          // Rub karty (znak ?) sa zobrazí v stave 'unflipped'
          <span className="card-back-symbol">?</span>
        )}
      </div>
    </div>
  );
};

export default Card;
