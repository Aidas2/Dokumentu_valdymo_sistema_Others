import React from "react";

export default function NewPasswordComponent(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="h6 text-uppercase mb-0">Keisti slaptažodį</h3>
      </div>
      <div className="card-body">
        <form
          className="form-horizontal"
          onSubmit={event => props.onSubmit(event)}
        >
          <div className="form-group row">
            <label className="col-md-3 form-control-label">
              Naujas slaptažodis
            </label>
            <div className="col-md-9">
              <input
                placeholder="Įveskite naują  slaptažodį"
                onChange={event => props.onChange(event)}
                type="password"
                name={props.name}
                pattern={props.pattern}
                // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
                className="form-control form-control-success"
              />
              <small className="form-text text-muted ml-3">
                Turi būti bent vienas skaičius, viena mažoji ir viena didžioji
                raidė, ir mažiausiai susidėti iš 8 simbolių
              </small>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-9 ml-auto">
              <input
                type="submit"
                value="Pakeisti"
                className="btn submitButton"
              />
            </div>
          </div>
        </form>
        <div className="form-group row">
          <div className="col-md-9 ml-auto">
            {/* <input
              onClick={() => props.goBack()}
              type="submit"
              value="Grįžti atgal"
              className="btn goBackButton"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
