import React from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

class User extends React.Component {
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
      <div>
        <TableRow key={this.props.id}>
          <TableCell component="th" scope="row">
            {this.props.user.userName}
          </TableCell>
          <TableCell component="th" scope="row">
            {this.props.user.firstName}
          </TableCell>
          <TableCell component="th" scope="row">
            {this.props.user.lastName}
          </TableCell>
          <TableCell component="th" scope="row">
            {this.props.user.email}
          </TableCell>
          <TableCell align="right">
            <Button type="submit" color="secondary" onClick={this.handleRemove}>
              Ištrinti
            </Button>
            {/* <button type="submit" onClick={e => this.editType(e, Type)}>
                  Redaguoti
                </button> */}
          </TableCell>
        </TableRow>
      </div>
    );
  }
}
// UsersList.Prototypes = {
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired
// };

export default User;
