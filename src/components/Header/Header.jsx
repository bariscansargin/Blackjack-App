import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="h-20 flex flex-col justify-center items-center">
      <p className="text-white font-bold text-2xl italic">BLACKJACK</p>
      {(location.pathname === "/game" || location.pathname === "/info") && (
        <Link to={"/"} className="text-white mt-2 mb-4 hover:text-red-400">
          {"<-"}Back to form
        </Link>
      )}
    </header>
  );
};

export default Header;
