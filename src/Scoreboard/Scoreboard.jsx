import React from "react";
import classNames from "classnames";

const Scoreboard = ({ deckValue, type }) => {
  const scorebardClasses = classNames(" text-md italic mt-2", {
    "text-white": deckValue < 21,
    "text-red-700": deckValue > 21,
    "text-green-300": deckValue === 21,
  });
  return (
    <div className={scorebardClasses}>
      <p>
        {type} Score = {deckValue}
        {deckValue === 21 && <span>( BLACKJACK!)</span>}
      </p>
    </div>
  );
};

export default Scoreboard;
