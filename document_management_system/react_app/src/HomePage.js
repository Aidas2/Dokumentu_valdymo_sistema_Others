import React, { Component } from 'react';
import axios from 'axios';
import { Button, Icon, Badge } from 'antd';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import ZipDownload from './ZipDownload';
import UserDocumentCountDisplay from './user/UserDocumentCountDisplay';
import UserSearch from './Form/UserSearch';
import reqwest from 'reqwest';
import DocumentSearch from './Form/DocumentSearch';
import UserDocumentSearch from './Form/UserDocumentSearch';
import UserReceivedDocumentSearch from './Form/UserReceivedDocumentSearch';


export class HomePage extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          email:this.props.currentUser.email,
          user:{},
          currentUser: ' ',
          documentsReceived:[],
          count:0,
          allCount: 0,
          submittedCount: 0,
          confirmedCount: 0,
          rejectedCount:0,
          documents:[],
          notSubmitted:'',
          isActive: true,
        }; 
        
        const user = props.currentUser;
          console.log("props", user) 
          console.log("COUNT ", this.props.count)
    }

      componentDidMount = () => { 
        axios.get(`http://localhost:8099/api/users/${this.state.email}/test/info`)
            .then(response => {
              console.log("response", response)
                this.setState({
                    allCount: response.data[0],
                    submittedCount: response.data[1],
                    confirmedCount: response.data[2],
                    rejectedCount: response.data[3],
                    notSubmitted: response.data[0] - response.data[1]
                });
            })
            .catch(error => {
                this.setState({
                    error: 'Error while fetching data.'
                });
            });
          
         axios.get(`http://localhost:8099/api/users/${this.state.email}`)
          .then(result => {
          const user = result.data
          this.setState({user});
          console.log("USERIS", user)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      handleDownlaod = (index, filename) => {
    
        axios(`http://localhost:8099/api/users/${this.state.email}/download/documentsCsv`, {
          method: 'GET',
          responseType: 'blob' 
      })
      .then(response => {
        console.log("Response", response.data);
        if(response.data.type === 'text/csv'){
          const file = new Blob(
            [response.data], 
            {type: 'text/csv'},
          );
          const fileURL = URL.createObjectURL(file);
          //download file      
            let a = document.createElement('a');
            a.href = fileURL;
            a.download = filename;
            a.click();
        } 
            })
        .catch(error => {
                console.log(error);
          }); 
        }

        hideAlert() {
          this.setState({
            isActive: false,
          });
        }
      
  render() {
    console.log('not submitted ', this.state.notSubmitted)
    
    return ( 
      <div className="container homepage" id="homepage-container">
      <div id="signed-in-user">
      <span>Sveiki, {this.state.user.name + ' ' + this.state.user.surname}</span>
      </div>
      {this.state.isActive && 
      <div>
      {this.state.notSubmitted > 0 && 
      <div className="alert alert-warning alert-dismissible fade show alert-notsubmitted" role="alert" id="myAlert">Jūsų siunčiamų dokumentų dėžutėje yra {this.state.notSubmitted} nepateiktas(-i) dokumentas(-ai)
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.hideAlert()}>
      <span aria-hidden="true">&times;</span>
      </button>
      </div> 
      }
      </div>
      }
    
      {this.state.user.admin &&
      <div className="user-search-container">
      <UserSearch/>
      </div>
      }
      {this.state.user.admin &&
      <div className="user-search-container">
      <DocumentSearch/>
      </div>
      }
      <div className="user-search-container">
      <UserDocumentSearch user={this.state.user}/>
      </div>
      <div className="user-search-container">
      <UserReceivedDocumentSearch user={this.state.user}/>
      </div>
        <div className="container" id="homepage-download-btn">
          <div className="row">
          <ZipDownload email={this.state.email} />
          <button className="btn btn-light" onClick={this.handleDownlaod.bind(this)}>Atsisiųsti dokumentų aprašą</button> 
          </div>
        </div>       
      </div>   
    )
  }
}


export default HomePage
