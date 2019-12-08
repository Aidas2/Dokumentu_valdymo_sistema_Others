import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, notification, Icon } from 'antd';
import axios from 'axios';

export class Type extends Component {
  
    DeleteItem = (title) => {
      console.log("props type", this.props.type.title)
        axios.delete(`http://localhost:8099/api/types/${this.props.type.title}`)
        .then(response => {
          console.log("Response", response);
          this.props.deleteType(title);
          const responseStatus = response.status
         console.log(responseStatus)
        if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Įrašas ištrintas sėkmingai!'
        }); 
         }
      })
      .catch(error => {
        console.log(error)
            notification.error({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Įrašo ištrinti negalima! Tipas priskirtas egzistuojančiam dokumentui.'
            });                    
    })
    }
    
  render() {
     
    return (
        <tr>
        <td>{this.props.type.title}</td>
        <td>
        <Link to={`/tipas/${this.props.type.title}`} >
        <Button type="default">
            Peržiūrėti 
        </Button>
        </Link>
        </td>
        <td>
        <Icon type="delete" style={{ fontSize: '20px', color:'red' }}  onClick={() => this.DeleteItem(this.props.type.title)} />
        </td>
        <td>
        <Link to={`/redaguoti/tipas/${this.props.type.title}`}>
        <Icon type="edit" style={{ fontSize: '20px'}}/>
        </Link>
        </td>
      </tr>);
    
  }
}

export default Type
