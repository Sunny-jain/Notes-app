import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 100 }) => {
  return (
    <div className="spin">
      <Spinner
        style={{ width: size, height: size }}
        animation="border"
      />
    </div>
  );
};

export default Loading;
