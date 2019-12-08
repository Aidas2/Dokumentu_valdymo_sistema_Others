import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export class EditGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
           groupName: this.props.match.params.name, //is index.js 
           name:'',
           group: {},
           redirect: false,             
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/visos-grupes' />
        }
      }
      handleNameChange = (name) => (event) => {
        const { group } = this.state;
        const newGroup = {
          ...group,
          [name]: event.target.value,          
        };
        this.setState({ group: newGroup });   
        console.log("Naujas dokumentas", this.state.group)      
      }

      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/group/${this.state.groupName}`)
        .then(result => {
          const group = result.data
        this.setState({group});
        console.log("Group from edit", group)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
       
        axios.put(`http://localhost:8099/api/group/${this.state.groupName}/edit`, {
            // name : this.refs.name.value,
            name: this.state.group.name,
        })
        .then(function(response) {
            console.log(response);
            console.log('Send this in a PUT request:',this.state.name );
        }).catch(function (error) {
            console.log(error);
        })
        this.setRedirect();
      }
  render() {
    return (
      <div className="container new-form"> 
      <div className="container" id="type_form">
        <h5>Redaguoti vartotojų grupę</h5>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Grupės pavadinimas</label>
          <input type="text" onChange={this.handleNameChange('name')} value={this.state.group.name} className="form-control" id="inputError1" required/>
        </div>
        {this.renderRedirect()}
          <button className="btn btn-primary" type="submit">Išsaugoti</button>
        </form>          
      </div>
      </div>
    )
  }
}

export default EditGroup
