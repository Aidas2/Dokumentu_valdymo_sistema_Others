import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button"
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import { withStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  }
});


class Document extends React.Component {
  handleRemove = () => {
    this.props.onDocumentDeleted(this.props.document);
    const url =
      "http://localhost:8081/api/documents/" + this.props.document.title;
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
if(this.props.status === "SUKURTAS"){
  
}
  }
  
  render() {
    return (
        <TableRow hover key={this.props.id}>
          <TableCell >
            {this.props.document.author}
          </TableCell>
          <TableCell >
            {this.props.document.title}
          </TableCell>
          <TableCell >
            {this.props.document.type}
          </TableCell>
          <TableCell >
            {this.props.document.description}
          </TableCell>
          <TableCell  />
          <TableCell align="right">
            <Button
              type="submit"
              color="default"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Pateikti
            </Button>{""}
            <Button
              type="submit"
              color="primary"
              variant="contained"
            component={Link}
            to="/detailed-document"
            >
              Daugiau
            </Button>
          <Icon 
          style={{}}
          component={Link}
            to="/create-new-document">reorder</Icon>

          <DeleteForeverIcon onClick={this.handleRemove} style={{fontSize: 32, color:red[800]}}/>
            
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

export default Document;
