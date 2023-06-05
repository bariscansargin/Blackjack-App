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
  const [state, setState] = useState({
    isGameStart: false,
    deckId: "",
    dealerDeck: [],
    userDeck: [],
    card: {},
  });

  useEffect(() => {
    if (name === "" || userMoney === 0) {
      navigate("/");
    }
  });

  async function deckSelector() {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deckCount}`
    );
    setState({ ...state, deckId: res.data.deck_id, isGameStart: true });
  }
  async function drawCard() {
    const res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${state.deckId}/draw/?count=1`
    );

    return setState({
      ...state,
      card: { suit: res.data.cards[0].suit, value: res.data.cards[0].value },
    });
  }
  function gameStarter() {
    deckSelector();
  }

  return (
    <main className="flex-grow flex flex-col items-center  justify-center min-h-full">
      <div className="flex h-36 items-center justify-center">
        <p className="text-white">DEALER</p>
      </div>
      <div className="flex-grow  w-full flex justify-center items-center">
        {!state.isGameStart && (
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
        {state.isGameStart && (
          <PlayingCard suit={state.card.suit} value={state.card.value} />
        )}
      </div>
      <div className="flex h-36 items-start justify-center flex-col">
        <div>
          <button onClick={drawCard}>REFETCH</button>
        </div>
        <p className="text-white">PLAYER : {name}</p>
        <p className="text-white">Money : {userMoney} $</p>
      </div>
    </main>
  );
};

export default GamePage;
