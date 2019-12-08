import React from "react";
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class DocumentRefusedContainer extends React.Component {
  handleRemoveAlert = () => {
    confirmAlert({
      title: 'Patvirtinkite trynimą',
      message: 'Ar tikrai norite ištrinti dokumentą?',
      buttons: [
        {
          label: 'Taip',
          onClick: () => this.handleRemove()
        },
        {
          label: 'No',
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
        <TableCell>{this.props.document.rejectionDate}</TableCell>
        <TableCell>{this.props.document.rejectionReason}</TableCell>
      </TableRow>
    );
  }
}
export default DocumentRefusedContainer;
