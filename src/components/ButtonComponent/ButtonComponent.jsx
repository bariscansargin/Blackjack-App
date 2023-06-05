import React from "react";
import cn from "classnames";

const ButtonComponent = ({
  value,
  children,
  position,
  clickHandler,
  disabled
  
}) => {
  const buttonStyles = cn(
    "border-none outline-none py-1 px-2 rounded-lg text-white cursor-pointer disabled:hidden " +
      position,
    {
      "bg-green-600 hover:bg-green-500 ": value === "start",
      "bg-red-600 hover:bg-red-500": value === "reset" || value === "stay",
      "bg-green-900 hover:bg-green-800": value === "hit",
    }
  );
  return (
    <button
      onClick={(e) => {
        clickHandler(e, value);
      }}
      className={buttonStyles}
      disabled= {disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
