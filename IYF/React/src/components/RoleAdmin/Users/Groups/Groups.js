import React, { Component } from "react";
import PropTypes from "prop-types";
import Group from "./Group";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActionsWrapped from "../../../../helpers/TablePaginationActions";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";

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

class Groups extends Component {
  render() {
    const { classes } = this.props;
    const { groups, rowsPerPage, page } = this.props;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, groups.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {this.props.groups
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .reverse()
                .map(group => (
                  <Group
                    onGroupDeleted={this.props.onGroupDeleted}
                    group={group}
                    key={group.id}
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
                  count={groups.length}
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
        </div>
      </Paper>
    );
  }
}
Groups.propTypes = {
  groups: PropTypes.array.isRequired
};
export default withStyles(styles)(Groups);
