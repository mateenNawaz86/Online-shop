import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner = () => {
  return (
    <>
      <BallTriangle
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </>
  );
};

export default Spinner;
