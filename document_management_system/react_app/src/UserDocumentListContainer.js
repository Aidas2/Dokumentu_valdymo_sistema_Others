import React, { Component } from 'react';
import axios from 'axios';
import DocumentListContainer from './DocumentListContainer';
import LoadingIndicator from './layout/LoadingIndicator';
import UserDocument from './UserDocument';


export class UserDocumentListContainer extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
      documents:[],
      // email: this.props.email,
      email: this.props.match.params.email,
      error:'',
      userDocuments: [],
      filter:'',
      isLoading: false,
      confirmed:''
    }
  this.fetchData = this.fetchData.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
}

setconfirmed(value) {
  this.setState({ confirmed: value });
}
  fetchData() {
    this.setState({
      isLoading: true
    });
      axios.get(`http://localhost:8099/api/documents/${this.state.email}/documents`)
          .then(response => {
            console.log(response)
              this.setState({
                  documents: response.data,
                  isLoading: false,
              }); 
          })
          .catch(error => {
              this.setState({
                  error: 'Error while fetching data.',
                  isLoading: false

              });
          });
      }

  componentWillMount() {
      this.fetchData();
  }
  
  deleteItem(number) {
      this.setState(prevState=>{
          const newItems = prevState.documents.filter((document)=>document.number!==number);
          return {
              documents: newItems
          }
      })
    }
      
  render() {
   
    const { documents, error } = this.state;

    console.log("dokumentai", documents)
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                </div>
            );
        }
    
    var rows = [];
  

    documents.map((document) => (                                        
          rows.push(<UserDocument current={document} key={document.number} 
            deleteItem={this.deleteItem} getConfirmedStatus={ color => this.setConfirmed(color)} />)                    
            ))

    
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
    <button btn btn-default onClick={this.changeView} value='confirmed'>Patvirtinti</button>
    <h4>Vartotojo dokumentai</h4>
    {this.state.isLoading ? <LoadingIndicator/> :
    <table className="table table-striped">
        <thead>
         {/* add tabs  */}
        </thead>
        {documents.length === 0 ? 
            <tbody>Jūs dar nesukūrėte dokumentų</tbody>:
            <tbody>{rows}</tbody>}
    </table>
    }
    </div> 
    </div> 
    )
  }
}

export default UserDocumentListContainer

