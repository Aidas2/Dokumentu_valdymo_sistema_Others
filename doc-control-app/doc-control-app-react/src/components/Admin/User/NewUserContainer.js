import React, { Component } from "react";
import Axios from "axios";
import NewUserComponent from "./NewUserComponent";
export default class NewUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      username: "",
      isAdmin: false
    };
  }

  onValueChangeHandler = event => {
    console.log("New user onChangeHandler");
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let firstname = this.capitalizeFirstLetter(this.state.firstname);
    let lastname = this.capitalizeFirstLetter(this.state.lastname);
    let username = this.state.username.toLocaleLowerCase();
    let email = this.state.email.toLocaleLowerCase();

    this.setState(
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        isAdmin: JSON.parse(this.state.isAdmin),
        email: email
      },
      () => {
        Axios.post("/api/users", this.state)
          .then(res => {
            this.props.showResponseMessage(
              "Vartotojas sėkmingai sukurtas",
              "success",
              2500
            );
            this.props.history.push("/");
          })
          .catch(err => {
            this.props.showResponseMessage(
              err.response.data.message,
              "danger",
              2500
            );
          });
      }
    );
  };

  capitalizeFirstLetter = string => {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleMessageInput = (message, messageType, timeout) => {
    let data = {
      message: message,
      messageType: messageType,
      show: true
    };
    this.setState({ showMessage: data }, () => {
      let data = {
        message: "",
        messageType: "",
        show: false
      };
      setTimeout(() => {
        this.setState({ showMessage: data });
      }, timeout);
    });
  };

  render() {
    return (
      <React.Fragment>
        <NewUserComponent
          onSubmit={this.onSubmitHandler}
          onChange={this.onValueChangeHandler}
          namePattern="^([A-Za-z]+[ąčęėįšųūĄČĘĖĮŠŲŪ]?)+$"
          namePatternTitle="Naudokite tik raides"
          usernamePattern="^[a-zA-Z][a-zA-Z0-9-_\.]{2,15}$"
          usernamePatternTitle="Vartotojo vardas turi prasidėti raide, jokių specialių simbolių, nuo 2 iki 15 simbolių."
          emailPattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          emailPatternTitle=""
          passwordPattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          passwordPatternTitle="Turi būti bent vienas skaičius, viena mažoji ir viena didžioji
                raidė, ir mažiausiai susidėti iš 8 simbolių"
        />
      </React.Fragment>
    );
  }
}
