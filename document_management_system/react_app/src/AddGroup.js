import React, { Component } from 'react';
import axios from 'axios';
import {notification } from 'antd';

export class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            name:'',      
            id:this.props.id,
          };
          console.log("URL",this.state.id)
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleSelectChange = this.handleSelectChange.bind(this);
        }  

    componentDidMount = () => {
        axios.get('http://localhost:8099/api/group')
        .then(result => {
            const groups = result.data;
            console.log(groups);
          this.setState({ 
            groups
          })
      })
          .catch(function (error) {
              console.log(error);
            }); 
    }
    
    handleSelectChange(e) {  
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        var existing = this.state.name
        existing.toString()
      
     for (var i =0, len = this.props.userGroups.length; i < len; i ++) {
       if(this.props.userGroups[i].name.indexOf(existing) !== -1){ 
       notification.error({
        message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
        description: 'Vartotojas jau priskirtais šiai grupei'
      })
      return;
     }
    }
  
       axios.post(`http://localhost:8099/api/users/${this.state.id}/${this.state.name}/add`)
      .then(response => {
        console.log("Response", response);
        const responseStatus = response.status
       console.log(responseStatus)
      if(responseStatus >= 200 && responseStatus < 300){ 
        notification.success({
          message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
          description: 'Vartotojas priskirtas grupei'
      });    
       }
    })
    .catch(error => {
      if(error.status >= 400 && error.status == 500) {
          notification.error({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
          });  
        }})

       this.setState({
            name:''
        })
        this.props.onResultChange(this.state.name)
      }

  render() {
    const options = this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)
    return (
      <div className="col-lg-8 col-md-8 add-group">

        <h6>Pridėti vartotojo grupę</h6>
            <form onSubmit={this.handleSubmit}>
            <div className="add-user-group-select">
            <label className="control-label">Pasirinkite vartotojo grupę</label>
                <select value={this.state.name} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                    {options}
                </select>
            </div>
            <button className="btn btn-primary" type="submit">Pridėti</button>
            <br/>
            </form>
      </div>
    )
  }
}

export default AddGroup
