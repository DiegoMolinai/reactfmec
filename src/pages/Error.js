import React from "react";
import { useSpring, animated } from "react-spring";
import "../styles/Error.css";

const Error = () => {
  const springProps = useSpring({
    number: 404,
    from: { number: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="error-container">
      <h1 id="h1">
        <animated.span>
          {springProps.number.to((number) => Math.floor(number))}
        </animated.span>
      </h1>
      <h2 id="h2">Página no encontrada</h2>
      <p id="p">Lo siento, la página que estás buscando no existe.</p>
    </div>
  );
};

export default Error;
