import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="h-12 flex justify-center items-center ">
      <p className="text-white text-sm mr-4">Made by <span className="italic text-white">Barışcan Sargın</span></p>
      <Link to={"https://github.com/bariscansargin"}>
        <DiGithubBadge className="w-8 h-8 text-white" />
      </Link>
    </footer>
  );
};

export default Footer;

