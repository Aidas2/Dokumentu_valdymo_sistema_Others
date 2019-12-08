import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActionsWrapped from "../../../../helpers/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import User from './UserContainer';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});


class UsersComponent extends React.Component {
  render() {
    const { classes } = this.props;
    const { users, rowsPerPage, page } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Prisijungimo vardas</TableCell>
                  <TableCell>Vardas</TableCell>
                  <TableCell>Pavardė</TableCell>
                <TableCell>Rolė</TableCell>
                <TableCell>Veiksmas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <User
                    onUserDeleted={this.props.onUserDeleted}
                    user={user}
                    userName={user.userName}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    roles={user.roles}
                    id={user.id}
                  />
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.props.handleChangePage}
                  onChangeRowsPerPage={this.props.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UsersComponent);

