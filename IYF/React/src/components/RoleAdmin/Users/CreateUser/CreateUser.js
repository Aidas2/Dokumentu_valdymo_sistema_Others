import React from "react";
import { Form, FormGroup, Input, FormText, Container } from "reactstrap";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      user: "",
      users: [],
      firstName: "",
      lastName: "",
      role: "user",
      roles: "ROLE_USER",
      password: "",
      userName: "",
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  addNewUser = e => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      role: this.state.role,
      roles: this.state.roles,
      userName: this.state.userName
    };
    axios
      .post("http://localhost:8081/api/docUsers/create", newUser)
      .then(response => {
        this.props.history.push("/users");
      })
      .catch(error => {
        console.log(error);
      });
  };

  onInputUserNameChange = event => {
    this.setState({
      userName: event.target.value
    });
  };

  onInputFirstNameChange = event => {
    this.setState({
      firstName: event.target.value
    });
  };

  onInputLasNameChange = event => {
    this.setState({
      lastName: event.target.value
    });
  };

  onInputPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <Paper>
          <Container>
            <br />
            <h3>Vartotojo kūrimo forma</h3>
            <p className="lead">
              <i>Užpildykite visus laukus</i>
            </p>
            <Form onSubmit={this.addNewUser}>
              <FormGroup>
                <Input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Prisijungimo vardas"
                  required
                  onChange={this.onInputUserNameChange}
                />
                <FormText>Nurodykite asmens prisijungimo vardą</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Vardas"
                  required
                  onChange={this.onInputFirstNameChange}
                />
                <FormText>Nurodykite asmens vardą</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Pavardė"
                  required
                  onChange={this.onInputLasNameChange}
                />
                <FormText>Nurodykite asmens pavardę</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  required
                  onChange={this.onInputPasswordChange}
                />
                <FormText>Nurodykite asmens slaptažodį</FormText>
              </FormGroup>
              <br />
              <Button variant="contained" color="primary" type="submit">
                Pridėti
              </Button>{" "}
              <Link to={"/users"}>
                <Button variant="contained" color="default">
                  Grįžti
                </Button>{" "}
              </Link>
            </Form>
            <br />
          </Container>
        </Paper>
      </div>
    );
  }
}

export default withRouter(CreateUser);
