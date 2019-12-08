import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button"
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class DocumentSubmittedContainer extends React.Component {
  handleRemoveAlert = () => {
    confirmAlert({
      title: 'Kodėl norite atmesti dokumentą',
      message: 'Nurodykite priežastį',
      input: 'text',
      buttons: [
        {
          label: 'Tvirtinu',
          onClick: () => this.handleRefuse()
        },
        {
          label: 'Nenoriu',
        }
      ]
    });
  };


  handleRemove = () => {
    this.props.onDocumentDeleted(this.props.document);
    const url =
      "http://localhost:8081/api/documents/" + this.props.document.id;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };
  handleSubmit = () => {
    this.props.onDocumentSubmitted(this.props.document);
    const url =
      "http://localhost:8081/api/documents/" + this.props.document.title;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };

  checkState = () => {
    if (this.props.status === "SUKURTAS") {

    }
  }

  render() {
    return (
      <TableRow hover key={this.props.id}>
        <TableCell>{this.props.document.id}</TableCell>
        <TableCell>{this.props.document.author}</TableCell>
        <TableCell>{this.props.document.title}</TableCell>
        <TableCell>{this.props.document.type}</TableCell>
        <TableCell>{this.props.document.description}</TableCell>
        <TableCell>{this.props.document.submissionDate}</TableCell>
        <TableCell align="right">
          <div style={{ display: "flex" }}>
            <Button
              type="submit"
              color="default"
              variant="outlined"
              onClick={this.handleAcception}
              style={{ maxWidth: "90px", minWidth: "90px" }}
            >
              Patvirtinti
            </Button>
            &nbsp;
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={this.handleRefuseAlert}
              style={{ maxWidth: "90px", minWidth: "90px" }}
            >
              Atmesti{"      "}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
}
// Document.Prototypes = {
//     id: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     describtion: PropTypes.string.isRequired,
// };

export default DocumentSubmittedContainer;
