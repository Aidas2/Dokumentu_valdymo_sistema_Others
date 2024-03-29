import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class TypeController extends React.Component {
  handleRemove = () => {
    this.props.onTypeDeleted(this.props.type);
    const url =
      "http://localhost:8081/api/documents/types" + this.props.type.title;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };
  render() {
    return (
      <TableRow key={this.props.id}>
        <TableCell component="th" scope="row">
          {this.props.type.title}
        </TableCell>
        <TableCell align="right">
                <Button type="submit" variant="outlined" color="secondary" onClick={this.handleRemove}>
            Ištrinti
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

TypeController.Prototypes = {
  title: PropTypes.string.isRequired
};

export default TypeController;
