import React from "react";
import { Link } from "react-router-dom";
import "./DocumentStyle.css";

const UserSubmittedDocumentsComponent = props => {
  var linkas = "/submittedDocuments/" + props.id;
  return (
    <tr>
      <td className="font-weight-bold">{props.documentId}</td>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td>{props.type}</td>
      <td>{props.state}</td>
      <td>{props.submissionDate}</td>
      <td>
        <Link
          style={{ textDecoration: "none", color: "black", cursor: "default" }}
          to={linkas}
        >
          {" "}
          <i
            className="fas fa-info-circle fa-2x blue"
            title="Dokumento informacija"
          />{" "}
        </Link>{" "}
        &nbsp;
      </td>
    </tr>
  );
};

export default UserSubmittedDocumentsComponent;
