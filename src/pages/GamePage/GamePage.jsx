import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCardValue } from "../../utils/game-functions";
//Components
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PlayingCard from "../../components/PlayingCard/PlayingCard";

const GamePage = () => {
  const navigate = useNavigate();
  const { name, deckCount } = useSelector((state) => state.userInfo);
  const { userMoney } = useSelector((state) => state.gameInfo);
  //States
  const [userDeck, setUserDeck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [isGameStart, setIsGameStart] = useState(false);
  const [deck, setDeck] = useState({ id: "", remaining: 0 });

  useEffect(() => {
    if (name === "" || userMoney === 0) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (isGameStart) {
      starterDecks(deck.id);
    }
  }, [isGameStart]);
  const deckSelector = async () => {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
    );

    setIsGameStart(true);
    setDeck({ id: res.data.deck_id, remaining: res.data.remaining });
  };
  const starterDecks = async (deckId) => {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw?count=4`
    );

    setDeck((currDeck) => {
      return { ...currDeck, remaining: res.data.remaining };
    });
    setUserDeck([res.data.cards[0], res.data.cards[1]]);
    setDealerDeck([res.data.cards[2], res.data.cards[3]]);
  };

  async function gameStarter() {
    deckSelector();
  }
  console.log(dealerDeck);
  return (
    <main className="flex-grow flex flex-col items-center  justify-center min-h-full">
      <div className="flex h-36 items-center justify-center flex-col">
        <p className="text-white">Card Remaining: {deck.remaining}</p>
        <p className="text-white">DEALER</p>
      </div>
      <div className="flex">
        {dealerDeck.map((card, idx) => {
          return (
            <PlayingCard
              key={idx}
              suit={card.suit}
              value={card.value}
            ></PlayingCard>
          );
        })}
      </div>
      <div className="flex-grow  w-full flex justify-center items-center">
        {!isGameStart && (
          <div className="flex flex-col justify-center items-center">
            <p className="italic text-lg font-bold text-red-600 mb-4">
              Press START button.
            </p>
            <ButtonComponent
              value={"start"}
              clickHandler={(e) => {
                e.preventDefault();
                gameStarter();
              }}
              position={"bg-red-600"}
            >
              START
            </ButtonComponent>
          </div>
        )}
        {isGameStart && <div>BAŞLADI</div>}
      </div>

      <div className="flex h-36 flex-col ">
        <div className="flex">
          {userDeck.map((card, idx) => {
            return (
              <PlayingCard key={idx} suit={card.suit} value={card.value} />
            );
          })}
        </div>
        <p className="text-white">PLAYER : {name}</p>
        <p className="text-white">Money : {userMoney} $</p>
      </div>
    </main>
  );
};

export default GamePage;
