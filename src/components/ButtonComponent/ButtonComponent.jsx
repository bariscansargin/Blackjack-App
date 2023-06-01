import React from "react";
import cn from "classnames";

const ButtonComponent = ({ value, children, position, clickHandler }) => {
  const buttonStyles = cn("border-none outline-none py-1 px-2 rounded-lg text-white " + position, {
    "bg-green-600 hover:bg-green-500 ": value === "start",
    "bg-red-600 hover:bg-red-500": value === "reset",
  });
  return (
    <div
      onClick={(e) => {
        clickHandler(e, value);
      }}
      className={buttonStyles}
    >
      {children}
    </div>
  );
};

export default ButtonComponent;
