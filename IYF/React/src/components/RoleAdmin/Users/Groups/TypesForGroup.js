import React from "react";
import { Form, FormGroup, Input, FormText, Container } from "reactstrap";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import fetchTypes from "../../../../helpers/fetchTypes";

class TypesForGroup extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            types: [], 
            title: "",
        };
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    addNewTypeForGroup = e => {
        e.preventDefault();
        const newGroupType = {
            title: this.state.title
        };
        this.props.onGroupAdded(newGroupType);
        axios
            .post("http://localhost:8081/api/groups"
            + this.state.type + "/docTypes/" + newGroupType)
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount = () => {
        fetchTypes().then(answer => {
            this.setState({ types: answer });
        });
    };

    onInputChange = event => {
        console.log(event.target.value);
        this.setState({ title: event.target.value });
    };

    changeGroup = e => {
        let value = e.target.value;
        this.setState({ group: value });
    };

    changeType = e => {
        let value = e.target.value;
        this.setState({ type: value });
    };

    onInputTypeChange = event => {
        this.setState({
            type: event.target.value
        });
    };

    onInputGroupChange = event => {
        this.setState({
            group: event.target.value
        });
    };

    render() {
        return (
          <div>
            <br />
            <Paper>
              <Container>
                <br />
                <h3>Grupių tipų nustatymas</h3>
                <Form onSubmit={this.addNewTypeForGroup}>
                  <FormGroup>
                    <Input
                      type="select"
                      name="backdrop"
                      id="backdrop"
                      placeholder="Dokumento tipas"
                      onChange={this.changeGroup}
                    >
                      <option value="select">Pasirinkite grupę</option>
                      {this.props.groups.map(group => (
                        <option value={group.title}>
                          {group.title}
                        </option>
                      ))}
                    </Input>
                    <FormText>Pasirinkite grupę</FormText>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="select"
                      name="selectMulti"
                      id="selectMulti"
                      placeholder="Dokumento tipas"
                      onChange={this.changeType}
                      multiple
                    >
                      <option value="select">
                        Pasirinkite dokumento tipą
                      </option>
                      {this.state.types.map(type => (
                        <option value={type.title}>{type.title}</option>
                      ))}
                    </Input>
                    <FormText>
                      Pasirinkite, kokius dokumentų tipus grupė galės
                      <b> atmesti</b>
                    </FormText>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="select"
                      name="selectMulti2"
                      id="selectMulti2"
                      placeholder="Dokumento tipas"
                      onChange={this.changeType}
                      multiple
                    >
                      <option value="select">
                        Pasirinkite dokumento tipą
                      </option>
                      {this.state.types.map(type => (
                        <option value={type.title}>{type.title}</option>
                      ))}
                    </Input>
                    <FormText>
                      Pasirinkite, kokius dokumentų tipus grupė galės
                      <b> patvirtinti</b>
                    </FormText>
                  </FormGroup>
                  <br />
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Priskirti
                  </Button>
                </Form>
              </Container>
              <br />
            </Paper>
          </div>
        );
    }
}

export default TypesForGroup;
