import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withRouter, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Icon from "@material-ui/core/Icon";
import { IconButton } from "@material-ui/core";

class DocumentContainer extends React.Component {
  handleRemoveAlert = () => {
    confirmAlert({
      title: "Patvirtinkite trynimą",
      message: "Ar tikrai norite ištrinti dokumentą?",
      buttons: [
        {
          label: "Taip",
          onClick: () => this.handleRemove()
        },
        {
          label: "Ne"
        }
      ]
    });
  };

  handleRemove = () => {
    this.props.onDocumentDeleted(this.props.document);
    const url = "http://localhost:8081/api/documents/" + this.props.document.id;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onDocumentSubmitted(this.props.document);
    const url =
      "http://localhost:8081/api/documents/Status/submitted/" +
      this.props.document.id;
    axios
      .put(url)
      // .then((res) => {
      //   console.log(res + "dokumento statusas pakeistas");
      //   axios.get("http://localhost:8081/api/documents/" + )
      // })
      .then(response => {
        console.log(response);
        this.props.history.push("/submitted-documents");
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkState = () => {
    if (this.props.status === "SUKURTAS") {
    }
  };

  render() {
    return (
      <TableRow hover key={this.props.id}>
        <TableCell>{this.props.document.id}</TableCell>
        <TableCell>{this.props.document.author}</TableCell>
        <TableCell>{this.props.document.title}</TableCell>
        <TableCell>{this.props.document.type}</TableCell>
        <TableCell>{this.props.document.description}</TableCell>
        <TableCell>
          {this.props.document.attachment}
          <IconButton>
            <Icon onClick={() => this.props.downloadFile()}>
              move_to_inbox
            </Icon>
          </IconButton>
        </TableCell>
        <TableCell>
          <div style={{ display: "flex" }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}
            >
              Pateikti
            </Button>
            &nbsp;
            <Button
              type="submit"
              variant="outlined"
              color="default"
              component={Link}
              to="/document-edit"
            >
              Redaguoti
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="outlined"
              onClick={this.handleRemoveAlert}
            >
              Ištrinti
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(DocumentContainer);
