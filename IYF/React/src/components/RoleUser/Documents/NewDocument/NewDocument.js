import React from "react";
import {
  Form,
  FormGroup,
  Input,
  FormText,
  Container,
  Col,
  Row
} from "reactstrap";
import axios from "axios";
import fetchTypes from "../../../../helpers/fetchTypes";
import { withRouter, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Upload from "./upload/Upload";

class CreateNew extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      type: "",
      types: [],
      title: "",
      description: "",
      author: "",
      status: "SUKURTAS",
      approvingDate: null,
      dropdownOpen: false,
      rejectionDate: null,
      rejectionReason: "Labai reikejo",
      submissionDate: null,
      attachments: 1,
      userName: "Belekas",
      selectedType: null
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  componentDidMount = () => {
    fetchTypes().then(answer => {
      this.setState({ types: answer });
    });
  };

  addNewDocument = e => {
    e.preventDefault();
    const newDocument = {
      title: this.state.title,
      type: this.state.type,
      description: this.state.description,
      author: this.state.author,
      user_name: this.state.userName,
      state: this.state.status,
      approvingDate: this.state.approvingDate,
      dropdownOpen: this.state.dropdownOpen,
      rejection_date: this.state.rejectionDate,
      rejection_reason: this.state.rejectionReason,
      submission_date: this.state.submissionDate,
      attachments: this.state.attachments
    };

    axios
      .post("http://localhost:8081/api/documents", newDocument)
      .then(response => {
        console.log(response);
        this.props.history.push("/documents");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFIleUpload = () => {};

  onInputTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  onInputTypeChange = event => {
    this.setState({
      type: event.target.value
    });
  };

  onInputDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  onInputAuthorChange = event => {
    this.setState({
      author: event.target.value
    });
  };

  changeType = e => {
    let value = e.target.value;
    this.setState({ type: value });
  };

  render() {
    return (
      <div>
        <br />
        <Paper>
          <Container>
            <br />
            <h3>Dokumento kūrimo forma</h3>
            <p className="lead">
              <i>Užpildykite visus laukus</i>
            </p>
            <Form onSubmit={this.addNewDocument}>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Input
                      type="select"
                      name="backdrop"
                      id="backdrop"
                      placeholder="Dokumento tipas"
                      onChange={this.changeType}
                      required
                    >
                      <option value="select">
                        Pasirinkite dokumento tipą
                      </option>
                      {this.state.types.map(type => (
                        <option value={type.title}>{type.title}</option>
                      ))}
                    </Input>
                    <FormText>Nurodykite dokumento tipą</FormText>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Dokumento pavadinimas"
                  onChange={this.onInputTitleChange}
                  required
                  helpMessage="Pick one!"
                />
                <FormText>Nurodykite tikslų dokumento pavadinimą</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="p"
                  id="p"
                  placeholder="Aprašymas"
                  required
                  onChange={this.onInputDescriptionChange}
                />
                <FormText>Trumpas dokumento aprašymas</FormText>
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="author"
                  id="author"
                  placeholder="Autoriaus vardas"
                  onChange={this.onInputAuthorChange}
                  required
                />
                <FormText>Nurodykite autorių</FormText>
              </FormGroup>
              <br />
              {/* <FileUpl
                fileNameGetter={this.fileNameGetter}
                handleFIleUpload={this.handleFIleUpload}
              /> */}
              <Upload />
              <br />
              <Button variant="contained" type="submit" color="primary">
                Pridėti
              </Button>{" "}
              <Button
                variant="contained"
                type="submit"
                color="default"
                component={Link}
                to="/documents"
              >
                Grįžti
              </Button>{" "}
            </Form>
          </Container>
          <br />
        </Paper>
        <br />
      </div>
    );
  }
}

export default withRouter(CreateNew);
