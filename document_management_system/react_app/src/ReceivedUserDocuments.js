import React from 'react';
import axios from 'axios';
import ReceivedDocument from './ReceivedDocument';
import { Button, notification, Icon } from 'antd';
import {Link} from 'react-router-dom'
import LoadingIndicator from './layout/LoadingIndicator';


export const DocumentContext = React.createContext("def value"); 
 

class ReceivedUserDocuments extends React.Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
          documentsReceived: this.props.history.location.state.documentsReceived,
          email: this.props.match.params.email,
          error: '',
          // count: this.props.history.location.state.count,
        }
      
    }

    deleteItem(number) {
      this.setState(prevState=>{
          const newItems = prevState.documentsReceived.filter((document)=>document.number!==number);
          return {
            documentsReceived: newItems
          }
      })
    }  
    
      render() {

        const { error, documentsReceived } = this.state;
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                </div>
            );
        }
        var rows = [];
  
        documentsReceived.map((document) => (                                        
              rows.push(<ReceivedDocument current={document} key={document.number} 
                deleteItem={this.deleteItem} email={this.state.email} />)                    
                ))
       const {count} = this.state
       console.log(count)
        return (
      <div className="container" id="list_container">
        <div className="container user_document_list">
        <h3>Gauti dokumentai</h3>
        <table className="table table-striped">
            <thead>
             
            </thead>
            {documentsReceived.length === 0 ? 
            <tbody>Gautų dokumentų nėra.</tbody>:
            <tbody>{rows}</tbody>}
        </table>
        
        </div> 
      </div>  
        )
      }
  }
 
export default ReceivedUserDocuments;