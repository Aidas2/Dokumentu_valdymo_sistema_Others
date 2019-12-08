import React, { Component } from 'react';
import { Button, notification } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import UserDocumentComponent from './document/UserDocumentComponent';

export class ReceivedDocument extends Component {
    
    constructor(props) {
        super(props);
       
        this.state = {
          document: props.current
        };
        console.log("gautas dokas", this.state.document)
      }

  render() {
    const {document} = this.state
    return (
        <tr key={document.number}>
         <UserDocumentComponent document={document}/>
        <td>
        <Link to={`/gautas/dokumentas/${document.number}`}>
        <Button type="primary">
             Peržiūrėti
        </Button>
        </Link>
        </td>
      </tr>
      
      );
  }
}

export default ReceivedDocument

