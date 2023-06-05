import React from "react";
import GameForm from "../../components/GameForm/GameForm";

const InfoPage = () => {
  return (
    <main className=" flex-grow flex flex-col items-center mt-4 ">
      <p className="text-white text-md mb-12  ">Fill the form to get start!</p>
      <GameForm />
    </main>
  );
};

export default InfoPage;
