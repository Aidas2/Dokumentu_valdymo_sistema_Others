import React from "react";
import { Form, FormGroup, Input, FormText, Container } from "reactstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class NewGroup extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      title: "", // pradinis
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
      //gavimas praeito state
    }));
  }

  addNewGroup = e => {
    e.preventDefault();
    const newGroup = {
      title: this.state.title
    };
    this.props.onGroupAdded(newGroup);
    axios
      .post("http://localhost:8081/api/groups", newGroup)
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      title: ""
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
            <h3>Sukurti naują grupę</h3>
            <Form onSubmit={this.addNewGroup}>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Pavadinimas"
                  onChange={this.onInputChange}
                  required
                />
                <FormText>Nurodykite grupės pavadinimą</FormText>
              </FormGroup>
              <Button variant="contained" type="submit" color="primary">
                Pridėti
              </Button>
            </Form>
          </Container>
          <br />
        </Paper>
      </div>
    );
  }
}

export default NewGroup;
