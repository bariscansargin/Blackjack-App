import React from "react";
import cn from "classnames";

const ButtonComponent = ({ value, children, position, clickHandler,disabled}) => {
  const buttonStyles = cn(
    "border-none outline-none py-1 px-2 rounded-lg text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed " +
      position,
    {
      "bg-green-600 hover:bg-green-500 ": value === "start",
      "bg-red-600 hover:bg-red-500":
        value === "reset" || value === "stay" || value === "backward",
      "bg-green-700 hover:bg-green-800": value === "hit" || value === "forward",
    }
  );
  return (
    <button
      onClick={(e) => {
        clickHandler(e, value);
      }}
      className={buttonStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
