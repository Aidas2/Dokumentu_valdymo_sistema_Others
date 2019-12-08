import React from "react";
import { Link } from "react-router-dom";

const UserCreatedDocumentsComponent = props => {
  var linkas = "/createdDocuments/" + props.id;
  return (
    <tr>
      <td className="font-weight-bold">{props.documentId}</td>
      <td>{props.title}</td>
      <td>{props.description}</td>
      <td>{props.type}</td>
      <td>{props.creationDate}</td>
      <td>
        <Link
          style={{ textDecoration: "none", color: "black", cursor: "default" }}
          to={linkas}
        >
          <i
            className="mygtukas fas fa-info-circle fa-2x blue"
            title="Dokumento informacija"
          />
        </Link>
        &nbsp;
        <Link
          style={{ textDecoration: "none", color: "black", cursor: "default" }}
          to={`/admin/Documents/${props.id}`}
        >
          <i
            className="mygtukas far fa-edit fa-2x text-warning"
            title="Dokumento redagavimas"
          />
        </Link>
        &nbsp;
        <i
          className="mygtukas fas fa-trash fa-2x red"
          title="Dokumento trynimas"
          onClick={() => {
            props.handleDelete(props.id);
          }}
        />
        &nbsp;
        <i
          className="mygtukas blue fas fa-check-circle fa-2x green"
          title="Dokumento pateikimas"
          onClick={() => {
            props.handleSubmit(props.id);
          }}
        />
      </td>
    </tr>

    // <div className="container-fluid">
    //     <div className="row">
    //         <div className="col-2">
    //             <p>{props.id}</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.title}</p>
    //         </div>
    //         <div className="col-2">
    //             <p>{props.description}</p>
    //         </div>
    //         <div className="col-1">
    //             <p>{props.type}</p>
    //         </div>
    //         <div className="col-1">
    //             <p>{props.creationDate}</p>
    //         </div>
    //         <div className="col-2">
    //             <Link to={linkas}> <i className="fas fa-info-circle"></i> </Link> &nbsp;
    //             <Link to={`/admin/Documents/${props.id}`}> <i className="far fa-edit"></i> </Link> &nbsp;
    //             <i className="fas fa-trash" onClick={() => {props.handleDelete(props.id)}}></i> &nbsp;
    //             <i className="fas fa-file-signature" onClick={() => {props.handleSubmit(props.id)}}></i>

    //              {/* Čia yra UTF simboliai-ikonos
    //             <Link to={linkas}>&#9997;</Link> |&nbsp;
    //             <Link to={linkas}>&#128465;</Link> |&nbsp;
    //             <Link to={linkas}>&#8505;</Link> |&nbsp;
    //             <Link to={linkas}>&#128196; </Link> */}
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-12">
    //             <hr/>
    //         </div>
    //     </div>
    // </div>
  );
};

export default UserCreatedDocumentsComponent;
