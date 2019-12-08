import React from 'react';


const UserDocumentComponent = (props) => (
    <span>
    <td>{props.document.title}</td>
    <td>{props.document.description}</td>
    <td>{(props.document.type !=null) ? props.document.type.title : 'tipas nepriskirtas'}</td>
    <td>{props.document.userDocuments.map(el=>(String (el.submitted)=== 'true')? 'Pateiktas' : ' Nepateiktas')}</td>
    <td>{props.document.createdDate}</td>
    </span>
  );
  
  export default UserDocumentComponent;  