import React from "react";
import classNames from "classnames";

const Scoreboard = ({ deckValue, type }) => {
  const scorebardClasses = classNames("text-white text-md italic mt-2", {
    "text-red-700": deckValue > 21,
  });
  return (
    <div className={scorebardClasses}>
      <p>
        {type} Score = {deckValue} / 21
      </p>
    </div>
  );
};

export default Scoreboard;
