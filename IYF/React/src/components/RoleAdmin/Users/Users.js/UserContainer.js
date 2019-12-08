import React from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react-confirm-alert"; 

class UserContainer extends React.Component {
  handleRemoveAlert = () => {
    confirmAlert({
      title: 'Patvirtinkite trynimą',
      message: 'Ar tikrai norite ištrinti vartotoją?',
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
    this.props.onTypeDeleted(this.props.user);
    const url =
      "http://localhost:8081/api/docUsers/delete" + this.props.user.id;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
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
            {this.props.user.roles}
          </TableCell>
          <TableCell >
          <Button type="submit" variant="outlined" color="secondary" onClick={this.handleRemoveAlert}>
              Ištrinti
            </Button>
            {/* <button type="submit" onClick={e => this.editType(e, Type)}>
                  Redaguoti
                </button> */}
          </TableCell>
        </TableRow>
    );
  }
}
// UsersList.Prototypes = {
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired
// };

export default UserContainer;
