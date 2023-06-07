import React from "react";
import {
  getCardColor,
  getCardSuitIcon,
  getCardText,
} from "../../utils/game-functions";
import { cardBack } from "../../utils/card-design";

const PlayingCard = ({ value, suit, hidden }) => {
  const cardColor = getCardColor(suit);
  const starsArr = cardBack()
  const cardSuitIcon = () => {
    return <span className={cardColor}>{getCardSuitIcon(suit)}</span>;
  };

  return (
    <>
      {!hidden && (
        <div className="flex flex-col border w-16 bg-white p-1 rounded-md shadow-lg sm:ml-2 ">
          <div className={"w-full flex justify-start " + cardColor}>
            <p className={cardColor}>{hidden ? "?" : getCardText(value)}</p>
          </div>

          <div className=" flex flex-col justify-center items-center w-full flex-grow h-12">
            <p className="text-sm">{hidden ? "?" : cardSuitIcon()}</p>
            <p className="text-sm">{hidden ? "?" : cardSuitIcon()}</p>
            <p className="text-sm">{hidden ? "?" : cardSuitIcon()}</p>
          </div>

          <div className={"w-full flex justify-end " + cardColor}>
            {hidden ? "?" : getCardText(value)}
          </div>
        </div>
      )}
      {hidden && (
        <div className="flex flex-wrap border w-16 bg-red-700 p-4 rounded-md shadow-lg sm:ml-2 ">
          {starsArr.map((star,idx) => {
            return <span key={idx} className="text-white">{star}</span>;
          })}
        </div>
      )}
    </>
  );
};

export default PlayingCard;
