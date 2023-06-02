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
  });

  useEffect(() => {
    if (name === "" || userMoney === 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    console.log(state.deckId);
  }, [state.deckId]);
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
    console.log(
      "Card =" + res.data.cards[0].value,
      "Value = " + getCardValue(res.data.cards[0].value)
    );
    return res.data;
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
        {console.log()}
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
