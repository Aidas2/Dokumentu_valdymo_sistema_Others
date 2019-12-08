import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

class Group extends React.Component {
  handleRemove = () => {
    this.props.onGroupDeleted(this.props.group);
    const url = "http://localhost:8081/api/groups/" + this.props.group.title;
    axios.delete(url).catch(err => {
      console.log(err);
    });
  };
  render() {
    return (
      <TableRow key={this.props.key}>
      <TableCell component="th" scope="row">{this.props.group.title}</TableCell>
        <TableCell align="right">
          <Button type="submit" variant="outlined" color="secondary" onClick={this.handleRemove}>
          Ištrinti
        </Button>
        {/* <button type="submit" onClick={e => this.editGroup(e, Group)}>
                  Redaguoti
                </button> */}
        </TableCell>
      </TableRow>
    );
  }
}
Group.Prototypes = {
  title: PropTypes.string.isRequired
};

export default Group;
