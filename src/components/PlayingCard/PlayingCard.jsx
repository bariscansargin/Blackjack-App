import React from "react";
import {
  getCardColor,
  getCardSuitIcon,
  getCardText,
} from "../../utils/game-functions";

const PlayingCard = ({ value, suit }) => {
  const cardColor = getCardColor(suit);

  const cardSuitIcon = () => {
    return <span className={cardColor}>{getCardSuitIcon(suit)}</span>;
  };

  return (
    <div className="flex flex-col border w-16 bg-white p-1 rounded-md shadow-lg ml-2">
      <div className={"w-full flex justify-start " + cardColor}>
        <p className={cardColor}>{getCardText(value)}</p>
      </div>

      <div className=" flex flex-col justify-center items-center w-full flex-grow h-12">
        <p className="text-sm">{cardSuitIcon()}</p>
        <p className="text-sm">{cardSuitIcon()}</p>
        <p className="text-sm">{cardSuitIcon()}</p>
      </div>

      <div className={"w-full flex justify-end " + cardColor}>
        {getCardText(value)}
      </div>
    </div>
  );
};

export default PlayingCard;
