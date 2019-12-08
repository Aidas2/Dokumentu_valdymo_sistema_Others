import React from "react";
import "./FileTransferStyles.css";

const Filler = props => {
  return (
    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${props.percentage}%` }}>
      {props.percentage} %
    </div>
  );
};

export default Filler;
