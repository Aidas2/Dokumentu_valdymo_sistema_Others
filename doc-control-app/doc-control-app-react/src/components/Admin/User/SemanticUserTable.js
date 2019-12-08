import React from "react";
// import Swal from "sweetalert2";

export default function SemanticUserTable(props) {
  // let confirmDeltetion = () => {
  //   Swal.fire({
  //     title: "Ar tikrai norite ištrinti?",
  //     // text: "You will not be able to recover this imaginary file!",
  //     type: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Taip, ištrinti!",
  //     cancelButtonText: "Ne, palitki"
  //   }).then(result => {
  //     if (result.value) {
  //       Swal.fire(
  //         "Ištrinta!",
  //         "Vartotojas pašalintas iš duomenų bazės."
  //         // "success"
  //       );
  //       props.delete();
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire("Atšaukta", "Vartotojo duomenys palikti");
  //     }
  //   });
  // };

  return (
    <tr>
      <th scope="row">{props.number}</th>
      <td>{props.firstname}</td>
      <td>{props.lastname}</td>
      <td>{props.username}</td>
      <td>{props.email}</td>
      <td>{props.isAdmin}</td>
      <td>{props.isLocked ? "Užrakintas" : "Atrakintas"}</td>
      <td>
        <i className="fas fa-info mx-1 fa-3x blue" onClick={props.update} />
        <i
          className={
            "fas mx-1 fa-3x red " +
            (props.isLocked ? "fa-lock-open" : "fa-lock")
          }
          onClick={props.toggleLock}
        />
      </td>
    </tr>
  );
}
