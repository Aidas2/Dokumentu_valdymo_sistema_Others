import React, { Component } from 'react'
import {Link } from "react-router-dom";
import { Button } from 'antd';
import axios from 'axios';
import {notification } from 'antd';
import UserDocumentComponent from './document/UserDocumentComponent';


export class UserDocument extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
         
          document: props.current,
          submitted: false,
          confirmed:false,
          rejected:false,
        };
        console.log("dokas", this.state.document)
      }

    deleteDocument(number){
        alert("Ar tikrai norite ištrinti šį dokumentą?")
        axios.delete(`http://localhost:8099/api/documents/${number}`)
        .then(result => {
            console.log(result);
            this.props.deleteItem(number);
        //   const document = result.data
        // this.setState({document});
        const responseStatus = result.status
        console.log(result)
        if(responseStatus >= 200 && responseStatus < 300){ 
        alert('Dokumentas ištrintas !') }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
  render() {
  
    const {document} = this.state
    return (
        <tr key={document.number}>
        <UserDocumentComponent document={document}/>
        <td>
        <Link to={`/dokumentas/${document.number}`}>
        <Button type="primary">
             Peržiūrėti 
        </Button>
        </Link>
        </td>
        {document.userDocuments.map(el=>(String (el.submitted)) === 'true'? 
        <td>
        <Button type="danger disabled">Trinti</Button>
        </td> :
         <td>
        <Button type="danger" onClick={() => this.deleteDocument(document.number)}> Trinti </Button>
        </td>
         )}
        {document.userDocuments.map(el=>(String (el.submitted)) === 'true'? 
        <td>
            <Button type="default disabled">Redaguoti</Button>
        </td> :
        <td>
        <Link to={`/redaguoti/dokumentas/${document.number}`}>
        <Button type="default">
            Redaguoti
        </Button>
        </Link>
        </td>
        )}
      </tr>
      
      );
  }
}

export default UserDocument;   