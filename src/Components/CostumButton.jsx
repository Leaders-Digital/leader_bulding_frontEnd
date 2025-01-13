/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function CostumButton({
  className,
  onClick,
  children,
  height = "50px",
  width = "100%",
  text = "Click me",
  type = "button",
  ...props
}) {
  return (
    <div style={{ width }}>
      <button
        type={type}
        onClick={onClick}
        className={`bg-Golden relative text-black text-[20px] rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out h-[56px] w-full`}
      >
        {text}
      </button>
    </div>
  );
}

export default CostumButton;
