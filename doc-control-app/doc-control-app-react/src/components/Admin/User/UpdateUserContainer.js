import React, { Component } from "react";
import Axios from "axios";
import NewPasswordComponent from "./NewPasswordComponent";
import ButtonComponent from "../../Utilities/ButtonComponent";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      isAdmin: false,
      isLocked: false,
      showAddGroupsButton: false
    };
  }

  componentDidMount = () => {
    Axios.get("/api/users/" + this.props.match.params.username)
      .then(res => {
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          username: res.data.username,
          isAdmin: res.data.admin,
          isLocked: res.data.locked,
          showAddGroupsButton: res.data.admin
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  capitalizeFirstLetter = string => {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  onUpdateClickHandler = event => {
    event.preventDefault();
    let firstname = this.capitalizeFirstLetter(this.state.firstname);
    let lastname = this.capitalizeFirstLetter(this.state.lastname);
    let email = this.state.email.toLocaleLowerCase();

    this.setState(
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        isAdmin: JSON.parse(this.state.isAdmin),
        showAddGroupsButton: this.state.isAdmin
      },
      () => {
        Axios.put("/api/users/" + this.props.match.params.username, this.state)
          .then(res => {
            console.log(res.data);
            console.log(this.props);
            this.props.showResponseMessage(
              "Vartotojo duomenys atnaujinti",
              "success",
              2500
            );
            //this.props.history.push("/");
          })
          .catch(err => {
            this.props.showResponseMessage(
              "Įvyko klaida atnaujinant duomenis",
              "danger",
              2500
            );
          });
      }
    );
  };

  onUpdatePasswordHandler = event => {
    // console.log("Username to change pass:", this.props.match.params.username);
    // console.log("New password: ", this.state.password);
    let newPassword = { password: this.state.password };
    event.preventDefault();
    Axios.put(
      "/api/users/" + this.props.match.params.username + "/changepassword",
      newPassword
    )
      .then(res => {
        this.props.showResponseMessage(
          "Slaptažodis sėkmingai pakeistas",
          "success",
          2500
        );
      })
      .catch(err => {
        this.props.showResponseMessage(
          "Įvyko klaida keičiant slaptažodį",
          "warning",
          2500
        );
      });
  };

  toggleLockUser = username => {
    Axios.put("/api/users/" + username + "/toggleLock")
      .then(res => {
        let locked = res.data;
        this.props.showResponseMessage(
          "Vartotojas sėkmingai " + (locked ? "užrakintas" : "atrakintas"),
          "success",
          2500
        );
        this.setState({ isLocked: locked });
      })
      .catch(err => {
        let errorMsg =
          err.response.data.message === "OWN_USER_LOCK"
            ? "Įvyko klaida. Vartotojas bandė  " +
              (this.state.islocked ? "atrakinti" : "užrakinti") +
              " save"
            : "Įvyko klaida rakinant vartotoją";
        this.props.showResponseMessage(errorMsg, "warning", 2500);
      });
  };

  onValueChangeHandler = event => {
    if (event.target.name === "isAdmin") {
      this.setState({
        [event.target.name]: JSON.parse(event.target.value)
      });
    } else this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };
  goEditGroups = () => {
    this.props.history.push(
      "/users/groups/" + this.props.match.params.username
    );
  };
  options = () => {
    if (this.state.isAdmin) {
      return (
        <React.Fragment>
          <option selected value={true}>
            Administratorius
          </option>
          <option value={false}>Paprastas vartotojas</option>
        </React.Fragment>
      );
    } else
      return (
        <React.Fragment>
          <option value={true}>Administratorius</option>
          <option selected value={false}>
            Paprastas vartotojas
          </option>
        </React.Fragment>
      );
  };

  showAddGroupsButton = () => {
    return !this.state.showAddGroupsButton ? (
      <ButtonComponent
        disabled={true}
        onClick={() => this.goEditGroups()}
        type="submit"
        value="Pridėti grupes"
        className="btn submitButtonAlt"
      />
    ) : null;
  };

  showToggleLockButton = () => {
    return (
      <ButtonComponent
        disabled={true}
        onClick={() =>
          this.toggleLockUser(this.state.username, this.state.isLocked)
        }
        type="submit"
        value={this.state.isLocked ? "Atrakinti" : "Užrakinti"}
        className={
          "btn " + (this.state.isLocked ? "submitButton" : "deleteButton")
        }
      />
    );
  };

  render() {
    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="py-5">
            <div className="col-lg-12 mb-5">
              <div className="card">
                <div className="card-header">
                  <h3 className="h6 text-uppercase mb-0">
                    Vartotojo atnaujinimas
                  </h3>
                </div>
                <div className="card-body">
                  <p>Pakeiskite norimus laukus.</p>
                  <form
                    className="form-horizontal"
                    onSubmit={event => this.onUpdateClickHandler(event)}
                  >
                    <div className="form-group row">
                      <label className="col-md-3 form-control-label">
                        Vardas
                      </label>
                      <div className="col-md-9">
                        <input
                          minLength="2"
                          maxLength="50"
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="firstname"
                          value={this.state.firstname}
                          //pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
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
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="lastname"
                          value={this.state.lastname}
                          //pattern="^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$"
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
                          disabled
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="username"
                          value={this.state.username}
                          className="disabled form-control form-control-warning"
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-3 form-control-label">
                        El. paštas
                      </label>
                      <div className="col-md-9">
                        <input
                          onChange={event => this.onValueChangeHandler(event)}
                          type="email"
                          name="email"
                          value={this.state.email}
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
                        Rolė
                      </label>
                      <div className="col-md-9">
                        <select
                          onChange={event => this.onValueChangeHandler(event)}
                          type="text"
                          name="isAdmin"
                          required
                          className="form-control form-control-warning"
                        >
                          {/* <option value={true}>Administratorius</option>
                          <option value={false}>Paprastas vartotojas</option> */}
                          {this.options()}
                        </select>
                      </div>
                    </div>

                    <ButtonComponent
                      type="submit"
                      value="Pakeisti"
                      className="btn submitButton"
                    />
                  </form>

                  {this.showAddGroupsButton()}
                  {this.showToggleLockButton()}

                  {/* <ButtonComponent
                    onClick={() => this.goBack()}
                    type="submit"
                    value="Grįžti atgal"
                    className="btn goBackButton"
                  /> */}
                </div>
              </div>
            </div>
            <div className="col-lg-12 mb-5">
              <NewPasswordComponent
                onSubmit={this.onUpdatePasswordHandler}
                onChange={this.onValueChangeHandler}
                goBack={this.goBack}
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
