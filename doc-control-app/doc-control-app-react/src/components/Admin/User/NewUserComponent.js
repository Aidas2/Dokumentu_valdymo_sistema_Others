import React from "react";
import ButtonComponent from "../../Utilities/ButtonComponent";

export default function NewUserComponent(props) {
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="py-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">
                  Naujo vartotojo forma
                </h3>
              </div>
              <div className="card-body">
                <p>Užpildykite visus laukus.</p>
                <form
                  className="form-horizontal"
                  onSubmit={e => props.onSubmit(e)}
                >
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label">
                      Vardas
                    </label>
                    <div className="col-md-9">
                      <input
                        minLength="2"
                        maxLength="50"
                        type="text"
                        name="firstname"
                        placeholder="Vardas"
                        pattern={props.namePattern}
                        title={props.namePatternTitle}
                        onChange={event => props.onChange(event)}
                        required
                        className="form-control form-control-success"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 form-control-label">
                      Pavardė
                    </label>
                    <div className="col-md-9">
                      <input
                        minLength="2"
                        maxLength="50"
                        type="text"
                        name="lastname"
                        placeholder="Pavardė"
                        //pattern={props.namePattern}
                        title={props.namePatternTitle}
                        onChange={event => props.onChange(event)}
                        required
                        className="form-control form-control-warning"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 form-control-label">
                      Vartotojo vardas
                    </label>
                    <div className="col-md-9">
                      <input
                        minLength="2"
                        maxLength="15"
                        type="text"
                        name="username"
                        placeholder="Vartotojo vardas"
                        onChange={event => props.onChange(event)}
                        pattern={props.usernamePattern}
                        title={props.usernamePatternTitle}
                        required
                        className="form-control form-control-warning"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-3 form-control-label">
                      El. paštas
                    </label>
                    <div className="col-md-9">
                      <input
                        type="email"
                        name="email"
                        placeholder="El. paštas"
                        pattern={props.emailPattern}
                        title={props.emailPatternTitle}
                        onChange={event => props.onChange(event)}
                        required
                        className="form-control form-control-warning"
                      />
                      <small className="form-text text-muted ml-3">
                        pvz@pvz.lt
                      </small>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 form-control-label">
                      Slaptažodis
                    </label>
                    <div className="col-md-9">
                      <input
                        onChange={event => props.onChange(event)}
                        autoComplete="new-password"
                        type="password"
                        name="password"
                        placeholder="Slaptažodis"
                        pattern={props.passwordPattern}
                        title={props.passwordPatternTitle}
                        required
                        className="form-control form-control-warning"
                      />
                      <small className="form-text text-muted ml-3">
                        Turi būti bent vienas skaičius, viena mažoji ir viena
                        didžioji raidė, ir mažiausiai susidėti iš 8 simbolių
                      </small>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 form-control-label">Rolė</label>
                    <div className="col-md-9">
                      <select
                        onChange={event => props.onChange(event)}
                        type="text"
                        name="isAdmin"
                        required
                        className="form-control form-control-warning"
                      >
                        <option value={false}>Paprastas vartotojas</option>
                        <option value={true}>Administratorius</option>
                      </select>
                    </div>
                  </div>

                  <ButtonComponent
                    type="submit"
                    value="Pridėti"
                    className="btn submitButton"
                  />
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
