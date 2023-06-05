import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCardValue } from "../../utils/game-functions";
//Components
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PlayingCard from "../../components/PlayingCard/PlayingCard";
import Scoreboard from "../../Scoreboard/Scoreboard";

const GamePage = () => {
  //Hooks
  const navigate = useNavigate();
  //Redux
  const { name, deckCount } = useSelector((state) => state.userInfo);
  const { userMoney } = useSelector((state) => state.gameInfo);
  //States
  const [isGameStart, setIsGameStart] = useState(false);
  const [deck, setDeck] = useState({ id: "", remaining: 0 });
  const [userDeck, setUserDeck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [validMoney, setValidMoney] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [userDeckScore, setUserDeckScore] = useState(0);
  const [dealerDeckScore, setDealerDeckScore] = useState(0);
  const [infoMessage, setInfoMessage] = useState(
    "Please enter your bet.(Min: 10$)"
  );

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

  useEffect(() => {
    if (userDeck.length > 0) {
      const userDeckValue = userDeck.reduce((acc, card) => {
        acc += getCardValue(card.value);
        return acc;
      }, 0);
      setUserDeckScore(userDeckValue);
    }
  }, [userDeck]);
  useEffect(() => {
    if (dealerDeck.length > 0) {
      const dealerDeckValue = dealerDeck.reduce((acc, card) => {
        acc += getCardValue(card.value);
        return acc;
      }, 0);
      setDealerDeckScore(dealerDeckValue);
    }
  }, [dealerDeck]);


  
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

  function gameStarter() {
    deckSelector();
  }
  function betValidation(e) {
    e.preventDefault();
    if (betAmount < 10) {
      setInfoMessage("Please enter valid money (min: 10$) ");
    } else {
      setInfoMessage(
        "Press hit for draw a card or press stay! Your bet = " +
          betAmount +
          " $"
      );
      setValidMoney(true);
    }
  }
  async function hitCard(e) {
    e.preventDefault();
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.id}/draw?count=1`
    );
    setDeck((currDeck) => {
      return { ...currDeck, remaining: res.data.remaining };
    });

    setUserDeck((currDeck) => [...currDeck, res.data.cards[0]]);
  }
  function dealerTurnHandler() {
    setDealerTurn(true);
    setInfoMessage("Dealer Turn");
  }

  return (
    <main className={"flex flex-col items-center  justify-center flex-grow"}>
      {isGameStart && (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-white">Card Remaining: {deck.remaining}</p>
            <p className="text-white mb-4">DEALER</p>
          </div>
          <div className="flex w-screen items-center justify-center border">
            {dealerDeck.map((card, idx) => {
              return (
                <PlayingCard key={idx} suit={card.suit} value={card.value} />
              );
            })}
          </div>
        </>
      )}
      <div className="flex justify-center items-center">
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
        {isGameStart && (
          <div className="my-12 flex flex-col items-center justify-center">
            <Scoreboard type={"Dealers"} deckValue={dealerDeckScore} />
            <div className="flex">
              <ButtonComponent
                value={"hit"}
                position={"mr-4"}
                clickHandler={(e) => {
                  hitCard(e);
                }}
                disabled={!validMoney || dealerTurn}
              >
                HIT
              </ButtonComponent>
              <ButtonComponent
                value={"stay"}
                clickHandler={() => {
                  console.log("Clicked");
                  dealerTurnHandler();
                }}
                disabled={!validMoney || dealerTurn}
              >
                STAY
              </ButtonComponent>
            </div>
            <div className="flex flex-col items-center justify-center">
              <input
                placeholder="Enter your bet"
                type="number"
                min={10}
                value={betAmount}
                className="mr-2 my-2 px-1 py-1 rounded-lg shadow-lg active:outline-cyan-500 border-none active:border-none"
                onChange={(e) => {
                  setBetAmount(e.target.value);
                }}
              />
              <div className="flex items-center justify-center">
                <ButtonComponent
                  value={"hit"}
                  clickHandler={betValidation}
                  position={"mr-2 mb-2 "}
                  disabled={validMoney || dealerTurn}
                >
                  BET
                </ButtonComponent>
              </div>
              <p className="text-white text-center px-2">{infoMessage}</p>
              <Scoreboard type={"Users"} deckValue={userDeckScore} />
            </div>
          </div>
        )}
      </div>

      <div className="flex h-36 flex-col ">
        <div className="w-screen flex items-center justify-center border">
          {userDeck.map((card, idx) => {
            return (
              <PlayingCard key={idx} suit={card.suit} value={card.value} />
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="text-white mt-4">PLAYER : {name}</p>
          <p className="text-white">Money : {userMoney} $</p>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
