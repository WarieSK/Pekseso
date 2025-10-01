import React from "react";
import Card from "./Card";
import "./GameBoard.css"; // Pre usporiadanie kariet (CSS Grid)

const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="game-board">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default GameBoard;
