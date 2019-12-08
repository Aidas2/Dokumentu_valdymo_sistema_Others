import React, { Component } from 'react';
import { Button, Card } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Link } from "react-router-dom";

export class SingleGroup extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           groupName: this.props.match.params.name, //is index.js 
           group: {},
           groupUsers:[]
        }
        console.log("id", this.state.groupName);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/group/${this.state.groupName}`)
          .then(result => {
            const group = result.data
          this.setState({group});
          const groupUsers = result.data.groupUsers
          this.setState({groupUsers})
          console.log("Grupe", groupUsers)
        //   console.log('Useriai', groupUsers)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  
      DeleteItem = (event) => {
          axios.delete(`http://localhost:8099/api/group/${this.state.groupName}`)
          .then(result => {
            const group = result.data
          this.setState({group});
          })
          .catch(function (error) {
            console.log(error);
          });
          this.props.history.push('/pagrindinis') 
      }
      
  
    render() {
     console.log("params url: ", this.props.match.params.groupName)
     console.log('GRUPE', this.state.group)
      return (
        <div className="container" id="single_item_container">
         <Card title={this.state.group.name} bordered={false}>
         <div>
              <h6>Grupės vartotojai: </h6> 
              {(!this.state.groupUsers.length) ? <span>Grupei vartotojai neprisikirti</span> : <ul>{this.state.groupUsers.map((user) => (<li key={user.email}><Link to={`/vartotojas/${user.email}`}>{user.name} {user.surname}</Link></li>))}</ul>}
              </div>
        </Card>
        </div>
      );
  }
}
export default SingleGroup;
