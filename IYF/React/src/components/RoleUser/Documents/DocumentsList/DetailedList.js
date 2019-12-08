import React from "react";
import { Table, Container, Row, Input } from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";

class DetailedList extends React {
  constructor() {
    super()
    this.state = {
      id: 0,
      author: "",
      type: "",
      title: "",
      describtion: "",
      submissionDate: null,
      approvingDate: null,
      rejectionDate: null,
      addressee: "",
      rejectionReason: null,
      attachments: 0,
      state: "SUKURTAS",
      modalActive: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
  }

  componentWillMount() {
    this.getProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }

  handleRemove = document => {
      const url = `http://localhost:8081/api/documents/{id}`;
    axios
      .delete(url)
      .then(res => {
        this.setState(previousState => {
          return {
            document: previousState.document.filter(d => d.id !== document.id)
          };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

    componentDidMount = () => {
        axios.get("http://localhost:8081/api/documents")
            .then((answer) => {
                this.setState({ documents: answer.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Autorius</th>
                  <th>Tipas</th>
                  <th>Pavadinimas</th>
                  <th>Aprašymas</th>
                  <th>Pateikimo data</th>
                  <th>Patvirtinimo data</th>
                  <th>Atmetimo data</th>
                  <th>Adresatas</th>
                  <th>Atmetimo priežastis</th>
                  <th>Pridėtukai</th>
                  <th>Būsena</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.props.id}</td>
                  <td>{this.props.author}</td>
                  <td>{this.props.type}</td>
                  <td>{this.props.title}</td>
                  <td>{this.props.description}</td>
                  <td>{this.props.submissionDate}</td>
                  <td>{this.props.approvingDate}</td>
                  <td>{this.props.rejectionDate}</td>
                  <td>{this.props.addressee}</td>
                  <td>{this.props.rejectionReason}</td>
                  <td>{this.props.attachments}</td>
                  <td>{this.props.state}</td>
                </tr>
                <button
                  type="submit"
                  onClick={e => this.removeDocument(e, document)}
                >
                  Ištrinti
                </button>
                <button
                  type="submit"
                  onClick={e => this.editDocument(e, document)}
                >
                  Redaguoti
                </button>
                <button
                  type="submit"
                  onClick={e => this.sendDocument(e, document)}
                >
                  Siųsti
                </button>
                <form>
                  <Input
                    type="textarea"
                    name="describtion"
                    id="describtion"
                    placeholder="Adresatas"
                  />
                  <button
                    type="submit"
                    onClick={e => this.sendDocument(e, document)}
                  >
                    Siųsti
                  </button>
                </form>
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}
DetailedList.Prototypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  describtion: PropTypes.string.isRequired,
  submissionDate: PropTypes.object.isRequired,
  approvingDate: PropTypes.object.isRequired,
  rejectionDate: PropTypes.object.isRequired,
  addressee: PropTypes.string.isRequired,
  rejectionReason: PropTypes.object.isRequired,
  attachments: PropTypes.element.isRequired,
  state: PropTypes.string.isRequired
};

export default DetailedList;
