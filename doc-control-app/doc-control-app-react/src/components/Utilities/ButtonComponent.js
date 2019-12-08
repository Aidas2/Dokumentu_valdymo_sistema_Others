import React from "react";

const ButtonComponent = props => {
  let disabled;
  if (props.disabled === undefined || props.disabled === true) {
    disabled = false;
  } else {
    disabled = true;
  }
  return (
    <div className="form-group row">
      <div className="col-md-9 ml-auto">
        <input
          disabled={disabled}
          type={props.type}
          value={props.value}
          className={props.className}
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

export default ButtonComponent;
