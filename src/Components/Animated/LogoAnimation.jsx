/* eslint-disable no-unused-vars */
// LogoAnimation.js
import React from "react";
import { useSpring, animated } from "react-spring";
import logo from "../../assets/logo_building.png";

const LogoAnimation = () => {
  const animation = useSpring({
    from: {
      opacity: 0,
      transform: "scale(0.5) translateY(0px)",
    },
    to: [
      {
        opacity: 1,
        transform: "scale(1) translateY(0px)",
      },
    ],
    config: { tension: 180, friction: 30 },
    delay: 200,
    loop: { reverse: true },
  });

  return (
    <animated.div
      style={animation}
      className="flex justify-center items-center h-full"
    >
      <img src={logo} alt="logo" className="h-[600px] w-[600px]" />
    </animated.div>
  );
};

export default LogoAnimation;
