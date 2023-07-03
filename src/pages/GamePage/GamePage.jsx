import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gameActions } from "../../redux/features/game";
//Components
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PlayingCard from "../../components/PlayingCard/PlayingCard";
import Scoreboard from "../../components/Scoreboard/Scoreboard";
//Constants
import { DEALER_MUST_HIT_AT_UNTIL, BLACKJACK } from "../../../lib/constants";
// Utils
import { getDeckValue } from "../../utils/game-functions";

const GamePage = () => {
  //Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Redux
  const { name, deckCount } = useSelector((state) => state.userInfo);
  const { userMoney } = useSelector((state) => state.gameInfo);
  //States
  const [continueDraw, setContinueDraw] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [deck, setDeck] = useState({ id: "", remaining: 0 });
  const [userDeck, setUserDeck] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [validMoney, setValidMoney] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [betAmount, setBetAmount] = useState(10);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [userDeckScore, setUserDeckScore] = useState(0);
  const [dealerDeckScore, setDealerDeckScore] = useState(0);
  const [infoMessage, setInfoMessage] = useState(
    "Please enter your bet. (Min: 10$)"
  );

  useEffect(() => {
    if (name === "" || userMoney === 0) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!isGameStart) return;

    starterDecks(deck.id);
  }, [isGameStart]);

  useEffect(() => {
    if (userDeck.length < 0) return;

    setUserDeckScore(getDeckValue(userDeck));
  }, [userDeck]);

  useEffect(() => {
    if (userDeckScore <= BLACKJACK) return;

    setDealerTurn(true);
  }, [userDeckScore]);

  useEffect(() => {
    if (dealerDeck.length === 0) return;

    setDealerDeckScore(getDeckValue(dealerDeck));

    if (dealerDeck.length > 2) {
      setContinueDraw((current) => !current);
    }
  }, [dealerDeck]);

  useEffect(() => {
    if (!dealerTurn) return;

    if (doesDealerWin()) {
      setInfoMessage(`Dealer won ! You lost ${betAmount} $`);
    } else if (isItDraw()) {
      setInfoMessage("DRAW");
      dispatch(gameActions.exchangeMoney(betAmount));
    } else if (doesUserWin()) {
      setInfoMessage(`${name} won ${betAmount * 2} $`);
      dispatch(gameActions.exchangeMoney(betAmount * 2));
    } else {
      setTimeout(() => {
        dealerDrawCard();
      }, [500]);
      return;
    }
    setGameOver(true);
  }, [dealerTurn, continueDraw]);

  const doesDealerWin = () =>
    userDeckScore > BLACKJACK ||
    (userDeckScore < dealerDeckScore &&
      dealerDeckScore >= DEALER_MUST_HIT_AT_UNTIL &&
      dealerDeckScore <= BLACKJACK);

  const isItDraw = () =>
    dealerDeckScore >= DEALER_MUST_HIT_AT_UNTIL &&
    userDeckScore === dealerDeckScore;

  const doesUserWin = () =>
    (userDeckScore > dealerDeckScore || dealerDeckScore > BLACKJACK) &&
    userDeckScore <= BLACKJACK &&
    dealerDeckScore >= DEALER_MUST_HIT_AT_UNTIL;

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
    } else if (betAmount > userMoney) {
      setInfoMessage("Don't have enough money !");
    } else {
      setInfoMessage(
        "Press hit for draw a card or press stay! Your bet = " +
          betAmount +
          " $"
      );
      setValidMoney(true);
      dispatch(gameActions.exchangeMoney(-betAmount));
    }
  }

  async function hitCard(e) {
    e.preventDefault();
    if (userDeckScore > 21) return;

    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.id}/draw?count=1`
    );
    setDeck((currDeck) => {
      return { ...currDeck, remaining: res.data.remaining };
    });

    setUserDeck((currDeck) => [...currDeck, res.data.cards[0]]);
  }

  async function dealerDrawCard() {
    if (dealerDeckScore > BLACKJACK) return;

    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deck.id}/draw?count=1`
    );

    setDeck((currDeck) => {
      return { ...currDeck, remaining: res.data.remaining };
    });

    setDealerDeck((currDeck) => [...currDeck, res.data.cards[0]]);
  }

  function dealerTurnHandler() {
    setDealerTurn(true);
    setInfoMessage("Dealer Turn");
  }
  function resetGame() {
    if (userMoney < 10) {
      setInfoMessage("Don't have enough money.");
      setTimeout(() => {
        navigate("/");
      }, 700);
      return;
    }
    setIsGameStart(false);
    setDeck({ id: "", remaining: 0 });
    setUserDeck([]);
    setDealerDeck([]);
    setValidMoney(false);
    setBetAmount(10);
    setDealerTurn(false);
    setUserDeckScore(0);
    setDealerDeckScore(0);
    setInfoMessage("Please enter your bet. (Min: 10$)");
    setGameOver(false);
  }

  return (
    <main className={"flex flex-col items-center  justify-center grow mb-12"}>
      {isGameStart && (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-white text-sm italic mb-4">
              Card Remaining: {deck.remaining}
            </p>
            <p className="mb-4 text-red-700 font-bold">DEALER</p>
          </div>
          <div className="flex w-screen justify-center flex-wrap lg:w-[700px] gap-1">
            {dealerDeck.map((card, idx) => {
              return (
                <PlayingCard
                  key={idx}
                  suit={card.suit}
                  value={card.value}
                  hidden={(idx === 1 && !dealerTurn) || !validMoney}
                />
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
            {dealerTurn && (
              <Scoreboard type={"Dealer"} deckValue={dealerDeckScore} />
            )}
            <div className="flex">
              {validMoney && !dealerTurn && (
                <ButtonComponent
                  value={"hit"}
                  position={"mr-4"}
                  clickHandler={(e) => {
                    hitCard(e);
                  }}
                >
                  HIT
                </ButtonComponent>
              )}
              {validMoney && !dealerTurn && (
                <ButtonComponent
                  value={"stay"}
                  clickHandler={() => {
                    dealerTurnHandler();
                  }}
                >
                  STAY
                </ButtonComponent>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              {!validMoney && (
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
              )}
              <div className="flex items-center justify-center">
                {!validMoney && (
                  <ButtonComponent
                    value={"hit"}
                    clickHandler={betValidation}
                    position={"mr-2 mb-2 "}
                  >
                    BET
                  </ButtonComponent>
                )}
              </div>
              <div className="w-full py-8 px-4 bg-green-700 rounded-lg shadow-lg my-2 border  ">
                <p className="text-white text-center">{infoMessage}</p>
              </div>
              {gameOver && (
                <ButtonComponent
                  value={"hit"}
                  clickHandler={resetGame}
                  position={"mr-2 mb-2"}
                >
                  PLAY AGAIN
                </ButtonComponent>
              )}

              {validMoney && (
                <Scoreboard type={"User"} deckValue={userDeckScore} />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex h-36 flex-col ">
        <div className="w-screen flex items-center justify-center flex-wrap lg:w-[700px] gap-1">
          {userDeck.map((card, idx) => {
            return (
              <PlayingCard
                key={idx}
                suit={card.suit}
                value={card.value}
                hidden={!validMoney}
              />
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <div className=" border bg-green-700 rounded-lg shadow-lg shadow-green-700 p-4 flex justify-center flex-col">
            <p className="text-white mt-4 text-md font-bold">PLAYER : {name}</p>
            <p className="text-white text-md font-bold">
              Money : {userMoney} $
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
