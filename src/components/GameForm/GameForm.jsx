import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../redux/features/user-info";
import { gameActions } from "../../redux/features/game";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
const numbers = [1, 2, 3, 4, 5, 6];
const GameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    deckCount: 1,
    initialUserMoney: 10,
    betValidation: false,
    routeChange: false,
    errors: [],
  });

  function resetHandler(e) {
    e.preventDefault();

    setState({
      username: "",
      deckCount: 1,
      errors: [],
      routeChange: false,
      initialUserMoney: 0,
    });
    return;
  }
  function startHandler(e) {
    e.preventDefault();
    if (state.username.length < 3) {
      setState({
        ...state,
        errors: [...state.errors, "Username must be at least 3 characters."],
      });
    } else if (state.initialUserMoney < 10) {
      setState({
        ...state,
        errors: [...state.errors, "You should pay at least 10 $"],
      });
    } else {
      dispatch(
        userInfoActions.getUserInfo({
          username: state.username,
          deckCount: state.deckCount,
        })
      );
      dispatch(gameActions.initialMoney(state.initialUserMoney));
      setState({ ...state, routeChange: true });
      setTimeout(() => {
        navigate("/game");
      }, 1000);
    }
  }

  return (
    <form className="px-4 py-8 bg-green-900 rounded-xl border border-green-300 shadow-md shadow-green-300 mb-2">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-white mb-2 text-lg">
          Name
        </label>
        <input
          name="username"
          className="px-4 py-2 rounded-md mb-2"
          value={state.username}
          onChange={(e) => {
            setState({ ...state, username: e.target.value });
          }}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="money" className="text-white mb-2 text-lg">
          İnitial Money{" ($)"}
        </label>
        <input
          name="money"
          className="px-4 py-2 rounded-md"
          value={state.initialUserMoney}
          min={10}
          step={10}
          type="number"
          onChange={(e) => {
            setState({ ...state, initialUserMoney: e.target.value });
          }}
        />
      </div>

      <div className="flex flex-col mt-4">
        <label htmlFor="deck-count" className="text-white mb-2 text-lg">
          Deck Count
        </label>
        <select
          name="deck-count"
          className="w-full px-4 py-2 rounded-md"
          onChange={(e) => {
            setState({ ...state, deckCount: e.target.value });
          }}
          value={state.deckCount}
        >
          {numbers.map((number, idx) => {
            return <option key={idx}>{number}</option>;
          })}
        </select>

        {state.routeChange && (
          <p className="text-sm mt-4 text-white">Game page loading...</p>
        )}
        {state.errors && state.errors.length > 0 && (
          <div className="flex flex-col ">
            {state.errors.map((error, idx) => {
              return (
                <p className="text-white text-sm mt-4" key={idx}>
                  - {error} !
                </p>
              );
            })}
          </div>
        )}

        <div className="flex justify-center items-center mt-8">
          <ButtonComponent value={"reset"} clickHandler={resetHandler}>
            RESET
          </ButtonComponent>
          <ButtonComponent
            position={"ml-6"}
            clickHandler={startHandler}
            value={"start"}
          >
            START
          </ButtonComponent>
        </div>
      </div>
    </form>
  );
};

export default GameForm;
