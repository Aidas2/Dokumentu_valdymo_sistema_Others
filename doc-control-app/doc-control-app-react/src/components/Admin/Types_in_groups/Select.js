import React from "react";

export default function Select(props) {
  return (
    <div className="py-3">
      <div className="input-group-prepend">
        <span className="groups">{props.title}</span>
      </div>

      <div className="input-group mb-1">
        <select
          multiple
          className="form-control"
          size="5"
          onChange={props.onChange}
          name={props.name}
        >
          {props.options}
        </select>
        <div className="input-group ">
          <button
            type="submit"
            className={props.buttonStyle}
            onClick={props.onClick}
          >
            {props.buttonTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
