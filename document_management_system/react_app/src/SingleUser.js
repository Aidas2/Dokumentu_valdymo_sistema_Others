import React, { Component } from 'react';
import { Button, notification, Icon, Tag } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import AddGroup from './AddGroup';
import UserDocumentListContainer from './UserDocumentListContainer'
import {jszip} from 'jszip';
import {Link} from 'react-router-dom';
import SingleUserComponent from './user/SingleUserComponent';


export class SingleUser extends Component {

    constructor(props) {
        super(props)
          
        this.state = {
           id: this.props.match.params.email, 
           user: {},
           currentUser:this.props.currentUser.admin,
           groups:[],
           userGroups:[],
           groupsArray:[],
           email:'',
           allDocumentsCount:'',
           submittedDocumentsCount:0,
           confirmedDocumentsCount:0,
           rejectedDocumentsCount:0
        }
        console.log('PROPS', props)
        console.log("id", this.state.id);
        this.handleResultChange = this.handleResultChange.bind(this);
      }
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/users/${this.state.id}`)
          .then(result => {
            const user = result.data
          this.setState({user});
          const userGroups = result.data.userGroups
          this.setState({userGroups})
          const email = user.email
          this.setState({email})
          console.log("USERIS", user)
          console.log("EMAIL", email)
          console.log('Grupes', userGroups)
          const allDocumentsCount = result.data.userDocuments.length
          this.setState({allDocumentsCount});
          console.log('count all', allDocumentsCount)
          let submitted = [];
          result.data.userDocuments.forEach(function(item){
            if(item.submitted == true){
              console.log(item)
              submitted.push(item) }
            })
            const submittedDocumentsCount = submitted.length
            this.setState({submittedDocumentsCount});
          console.log('count submitted', submittedDocumentsCount)
          let confirmed = [];
          result.data.userDocuments.forEach(function(item){
            if(item.confirmed == true){
              confirmed.push(item) }
            })
            const confirmedDocumentsCount = confirmed.length
            this.setState({confirmedDocumentsCount});

            let rejected = [];
          result.data.userDocuments.forEach(function(item){
            if(item.rejected == true){
              rejected.push(item) }
            })
            const rejectedDocumentsCount = rejected.length
            this.setState({rejectedDocumentsCount});
          })
          .catch(function (error) {
            console.log(error);
          });
      }

       handleResultChange(value) {
        var name = value;
        var newGroup = {name};
        var newArray = this.state.userGroups.slice();       
        newArray.push(newGroup);   
        this.setState({userGroups:[...newArray]})
      }
  
      DeleteUser = (event) => {
          axios.delete(`http://localhost:8099/api/users/${this.state.id}`)
          .then(response => {
            console.log("Response", response);
            const responseStatus = response.status
           if(responseStatus >= 200 && responseStatus < 300){ 
            notification.success({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Vartotojas ištrintas sėkmingai!'
          });    
          this.props.history.push('/vartotojai')           }
        })
        .catch(error => {
          if(error.status === 500) {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida įkeliant dokumentą, perkraukite puslapį ir bandykite dar kartą!'
              });                    
          } else {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: error.message || 'Atsiprašome įvyko klaida, bandykite dar kartą!'
              });                                            
          }
        });
        }

      handleRemove(index) {
        let userGroups = this.state.userGroups
         let groupIdx = this.state.userGroups.findIndex((group) => group.name === index); //find array elem index by name/index
        console.log("Index", groupIdx)
          const newList = this.state.userGroups.splice(groupIdx, 1); //delets element and returns removed element
         this.setState({ userGroups: [...userGroups] }); 

         axios.delete(`http://localhost:8099/api/users/${this.state.id}/${index}/remove`)
             .then(res => {
               console.log(res)
           })
           .catch(function (error) {
               console.log(error);
           }); 
       }  
    render() {
      return (
        <div className="container single-user">
              <SingleUserComponent user={this.state.user} 
              allDocumentsCount={this.state.allDocumentsCount}
              submittedDocumentsCount={this.state.submittedDocumentsCount}
              confirmedDocumentsCount={this.state.confirmedDocumentsCount}
              rejectedDocumentsCount={this.state.rejectedDocumentsCount}
              />                
              <div className="container user-groups"> 
              <div className="row"> 
                {String(this.state.currentUser) === 'true'?
                
                <div className="col-lg-4 col-md-4">
                      <h5>Vartotojo grupės: </h5>                    
                    {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}><Tag>{group.name}</Tag>
                  &nbsp;<Icon type="close-circle" onClick={this.handleRemove.bind(this, group.name)}/>
                        </li>))}</ul>}
                </div> : 
                <div className="container user-groups">
                      <h5>Jūsų grupės: </h5> 
                      {(!this.state.userGroups.length) ? <span>Vartotojas nerpriskirtas grupei</span> : 
                        <ul>{this.state.userGroups.map((group) => (<li key={group.id}>{group.name}</li>))}</ul>}
                </div>
                     }
                    {String(this.state.currentUser) === 'true'?
                      <AddGroup 
                      userGroups={this.state.userGroups}
                      onResultChange={this.handleResultChange}
                      id={this.state.id}/> 
                      : <span></span>
                        }
                  </div> 
                </div>        
              
              <div id="delete-user">
              
                    {String(this.state.currentUser) === 'true'?
                 <Button type="danger" onClick={this.DeleteUser.bind(this)}> Trinti vartototoją </Button>
                      : <span></span> }   
                 </div>
          </div>
              
      );
    }
}

export default SingleUser
