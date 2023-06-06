import React from "react";
import GameForm from "../../components/GameForm/GameForm";
import { Link } from "react-router-dom";

const InfoPage = () => {
  return (
    <main className=" flex-grow flex flex-col items-center mt-4 ">
      <p className="text-white text-md mb-12  ">Fill the form to get start!</p>
      <GameForm />
      <Link to={"/info"} className=" bg-gray-600 text-white rounded-lg px-1 py-2 mt-4 hover:bg-gray-400 hover:text-black ">How to play ?</Link>
    </main>
  );
};

export default InfoPage;
