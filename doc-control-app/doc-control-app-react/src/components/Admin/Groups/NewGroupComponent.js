import React from "react";
import ButtonComponent from "../../Utilities/ButtonComponent";

export default function NewGroupComponent(props) {
  return (
    <div>
      <section>
        <div className="col-lg-12 mb-5">
          <div className="card">
            <div className="card-header">
              <h3 className="h6 text-uppercase mb-0">Nauja grupė</h3>
            </div>
            <div className="card-body">
              <form onSubmit={props.onSubmitAdd}>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">
                    Grupės pavadinimas
                  </label>
                  <div className="col-md-9">
                    <input
                      minLength="2"
                      maxLength="30"
                      placeholder="Pavadinimas"
                      onChange={props.onChange}
                      type="text"
                      name={props.newTitle}
                      value={props.newTitleValue}
                      className="form-control form-control-success"
                      pattern={props.pattern}
                      required
                    />
                  </div>
                </div>

                <ButtonComponent
                  type="submit"
                  value="Pridėti"
                  className="btn submitButton"
                />
              </form>

              {/* <ButtonComponent
                type="submit"
                value="Grįžti atgal"
                className="btn goBackButton"
                onClick={props.onClickGoBack}
              /> */}
            </div>
          </div>
        </div>
      </section>
      <div className="line" />
      <section className="">
        <div className="col-lg-12 mb-5">
          <div className="card">
            <div className="card-header">
              <h3 className="h6 text-uppercase mb-0">Atnaujinti grupes</h3>
            </div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-3 form-control-label">
                  Visos grupės
                </label>

                <div className="col-md-9 ml-auto select">
                  <select
                    size="5"
                    onChange={props.onChange}
                    name="selectedGroupTitle"
                    multiple=""
                    className="form-control rounded"
                  >
                    {props.showGroups}
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={props.onSubmitUpdate}>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">
                    Naujas pavadinimas
                  </label>
                  <div className="col-md-9">
                    <input
                      minLength="2"
                      maxLength="30"
                      placeholder="Naujas pavadinimas"
                      onChange={props.onChange}
                      type="text"
                      name={props.nameForUpdate}
                      value={props.valueForUpdate}
                      className="form-control form-control-success"
                      pattern={props.pattern}
                      required
                    />
                  </div>
                </div>

                <ButtonComponent
                  type="submit"
                  value="Atnaujinti"
                  className="btn submitButton"
                />
              </form>

              <ButtonComponent
                onClick={props.onDeleteClick}
                type="submit"
                value="Ištrinti"
                className="btn deleteButton"
              />

              {/* <ButtonComponent
                onClick={props.onClickGoBack}
                type="submit"
                value="Grįžti atgal"
                className="btn goBackButton"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
