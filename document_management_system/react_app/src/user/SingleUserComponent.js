import React from 'react';
import { Row, Col } from 'antd';


const SingleUserComponent = (props) => (
<div className="user-description container">
<table className="table table-striped" cellpadding = "5" id="user-description-table">
	<tbody>
		<tr>
			<td>Vardas</td>
			<td>Pavardė </td>
			<td>El. paštas</td>
			<td>Įgaliojimai</td>
		</tr>
		<tr>
    <td>{props.user.name}</td>
    <td>{props.user.surname}</td>
    <td>{props.user.email}</td>
    <td>{String(props.user.admin) === 'true' ? 'administratorius': 'vartototojas'}</td>
		</tr>
		<tr>
			<td>Sukurta</td>
			<td>Pateikta</td>
			<td>Atmesta</td>
			<td>Patvirtinta</td>
		</tr>
		<tr>
			<td>{props.allDocumentsCount}</td>
			<td>{props.submittedDocumentsCount}</td>
			<td>{props.confirmedDocumentsCount}</td>
			<td>{props.rejectedDocumentsCount}</td>
		</tr>
	</tbody>
</table>
</div>
  );
  
  export default SingleUserComponent; 