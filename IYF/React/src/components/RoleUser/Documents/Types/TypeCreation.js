import React from "react";
import { Form, Input, FormGroup, FormText, Container } from "reactstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class TypeCreation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      title: ""
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  // addNewType = (title) => {
  //   axios.post("http://localhost:8081/api/documents/types", {
  //     title, completed:false
  //   })
  //   .then(res=>this.setState({types:
  //   [...this.state.types, res.data]}))
  // }
  //neveikia

  addNewType = e => {
    e.preventDefault();
    const newType = {
      title: this.state.title
    };
    this.props.onTypeAdded(newType);
    axios
      .post("http://localhost:8081/api/documents/types", newType)
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div>
        <br />
        <Paper>
          <Container>
            <br />
            <h3>Sukurti naują tipą</h3>
            <Form onSubmit={this.addNewType}>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  id="titlet"
                  placeholder="Pavadinimas"
                  onChange={this.onInputChange}
                  required
                />
                <FormText>Nurodykite tipo pavadinimą</FormText>
              </FormGroup>
              <Button variant="contained" type="submit" color="primary">
                Pridėti
              </Button>
              <br />
            </Form>
          </Container>
          <br />
        </Paper>
      </div>
    );
  }
}

export default TypeCreation;
