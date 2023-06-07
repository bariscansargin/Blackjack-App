import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userInfoActions } from "../../redux/features/user-info";
import { gameActions } from "../../redux/features/game";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { DECK_NUMBERS } from "../../../lib/constants";
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
          {DECK_NUMBERS.map((number, idx) => {
            return <option key={idx}>{number}</option>;
          })}
        </select>

        {state.routeChange && ( //LOADER
          <div role="status" className="flex items-center justify-center mt-4">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          </div>
        )}
        {state.errors && state.errors.length > 0 && (
          <div className="flex flex-col ">
            {state.errors.map((error, idx) => {
              return (
                <p className="text-white text-sm mt-4" key={idx}>
                  - {error}
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
