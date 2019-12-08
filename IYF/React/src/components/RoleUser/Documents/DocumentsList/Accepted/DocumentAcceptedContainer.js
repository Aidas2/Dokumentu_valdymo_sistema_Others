import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import "react-confirm-alert/src/react-confirm-alert.css";

class DocumentAcceptedContainer extends React.Component {
  render() {
    return (
      <TableRow hover key={this.props.id}>
        <TableCell>{this.props.document.id}</TableCell>
        <TableCell>{this.props.document.author}</TableCell>
        <TableCell>{this.props.document.title}</TableCell>
        <TableCell>{this.props.document.type}</TableCell>
        <TableCell>{this.props.document.description}</TableCell>
        <TableCell>{this.props.document.submissionDate}</TableCell>
        <TableCell>{this.props.document.approvingDate}</TableCell>
      </TableRow>
    );
  }
}
export default DocumentAcceptedContainer;
