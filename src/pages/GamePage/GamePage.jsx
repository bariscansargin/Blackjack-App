import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gameActions } from "../../redux/features/game";
import { getCardValue } from "../../utils/game-functions";
//Components
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import PlayingCard from "../../components/PlayingCard/PlayingCard";
import Scoreboard from "../../Scoreboard/Scoreboard";
//Constants
import { DEALER_MUST_HIT_AT_UNTIL, BLACKJACK } from "../../../lib/constants";
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
    if (userDeckScore > BLACKJACK) {
      setDealerTurn(true);
    }
  }, [userDeckScore]);
  useEffect(() => {
    if (dealerDeck.length > 0) {
      const dealerDeckValue = dealerDeck.reduce((acc, card) => {
        acc += getCardValue(card.value);
        return acc;
      }, 0);
      setDealerDeckScore(dealerDeckValue);
    }
    if (dealerDeck.length > 2) {
      setContinueDraw((current) => !current);
    }
  }, [dealerDeck]);

  useEffect(() => {
    if (!dealerTurn) return;
    if (doesDealerWin()) {
      setInfoMessage(`Dealer won ! You lost ${betAmount} $`);
      dispatch(gameActions.exchangeMoney(betAmount));
    } else if (isItDraw()) {
      setInfoMessage("DRAW");
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
    dealerTurn &&
    dealerDeckScore >= DEALER_MUST_HIT_AT_UNTIL &&
    userDeckScore === dealerDeckScore;
  const doesUserWin = () =>
    dealerTurn &&
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
    }
  }

  async function hitCard(e) {
    e.preventDefault();
    if (userDeckScore <= 21) {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw?count=1`
      );
      setDeck((currDeck) => {
        return { ...currDeck, remaining: res.data.remaining };
      });

      setUserDeck((currDeck) => [...currDeck, res.data.cards[0]]);
    }
  }

  async function dealerDrawCard() {
    if (dealerDeckScore < 21) {
      const res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck.id}/draw?count=1`
      );

      setDeck((currDeck) => {
        return { ...currDeck, remaining: res.data.remaining };
      });

      setDealerDeck((currDeck) => [...currDeck, res.data.cards[0]]);
    }
  }

  function dealerTurnHandler() {
    setDealerTurn(true);
    setInfoMessage("Dealer Turn");
  }
  function resetGame() {
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
    <main className={"flex flex-col items-center  justify-center flex-grow"}>
      {isGameStart && (
        <>
          <div className="flex items-center justify-center flex-col">
            <p className="text-white">Card Remaining: {deck.remaining}</p>
            <p className="text-white mb-4">DEALER</p>
          </div>
          <div className="flex w-screen items-center justify-center flex-wrap">
            {dealerDeck.map((card, idx) => {
              return (
                <PlayingCard
                  key={idx}
                  suit={card.suit}
                  value={card.value}
                  hidden={idx === 1 && !dealerTurn}
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
              <Scoreboard type={"Dealers"} deckValue={dealerDeckScore} />
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
                {!validMoney && (
                  <ButtonComponent
                    value={"hit"}
                    clickHandler={betValidation}
                    position={"mr-2 mb-2 "}
                  >
                    BET
                  </ButtonComponent>
                )}

                {gameOver && (
                  <ButtonComponent
                    value={"hit"}
                    clickHandler={resetGame}
                    position={"mr-2 mb-2"}
                    disabled={gameOver}
                  >
                    PLAY AGAIN
                  </ButtonComponent>
                )}
              </div>
              <p className="text-white text-center px-2">{infoMessage}</p>
              <Scoreboard type={"Users"} deckValue={userDeckScore} />
            </div>
          </div>
        )}
      </div>

      <div className="flex h-36 flex-col ">
        <div className="w-screen flex items-center justify-center flex-wrap">
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
