import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
           email: this.props.match.params.email, //is index.js 
           name:'',
           surname: '',
           password: '',
           admin:'',
           user: {},
           redirect: false,             
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/vartotojai' />
        }
      }
      handleNameChange = (name) => (event) => {
        const { user } = this.state;
        const newUser = {
          ...user,
          [name]: event.target.value,          
        };
        this.setState({ user: newUser });   
        console.log("Naujas vardas", this.state.user.name)      
      }
      handleSurnameChange = (surname) => (event) => {
        const { user } = this.state;
        const newUser = {
          ...user,
          [surname]: event.target.value,          
        };
        this.setState({ user: newUser });   
        console.log("Nauja pavardė", this.state.user.surname)      
      }
      handlePasswordChange = (password) => (event) => {
        const { user } = this.state;
        const newUser = {
          ...user,
          [password]: event.target.value,          
        };
        this.setState({ user: newUser });   
        console.log("Naujas slaptažodis", this.state.user.password)      
      }
 
      handleSelectChange(e) {  
        this.setState({ admin: e.target.value });
      }



      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/users/${this.state.email}`)
        .then(result => {
          const user = result.data
        this.setState({user});
        console.log("User form edit", user)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
       
        axios.put(`http://localhost:8099/api/users/${this.state.email}/edit`, {
            // name : this.refs.name.value,
            name: this.state.user.name,
            surname: this.state.user.surname,
            password: this.state.user.password,
            admin: this.state.user.admin


        })
        .then(function(response) {
            console.log(response);
                  }).catch(function (error) {
            console.log(error);
        })
        this.setRedirect();
      }
  render() {
        return (
        <div className="container">
        <div className="user_form">
        <h4>Redaguoti vartotoją</h4>
        <form id="new-document" onSubmit={this.handleSubmit}>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Vartotojo vardas</label>
          <input type="text" onChange={this.handleNameChange('name')} value={this.state.user.name} className="form-control" id="inputError1" />
        </div>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Vartotojo pavardė</label>
          <input type="text" onChange={this.handleSurnameChange('surname')} value={this.state.user.surname} className="form-control" id="inputError1" />
        </div>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Vartotojo slaptažodis</label>
          <input type="password" onChange={this.handlePasswordChange('password')} value={this.state.user.password} placeholder="Naujas slaptažodis" className="form-control" id="inputError1" />
        </div>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Administratorius</label>
          <select onChange={this.handleSelectChange} 
                className="form-control" id="ntype" >
                  <option value="">...</option>
                  <option value="true">Taip</option>
                   <option value="false">Ne</option>
                </select>
        </div>
         {this.renderRedirect()}
          <button className="btn btn-primary" type="submit">Išsaugoti</button>
        </form>
        </div>          
      </div>
    )
  }
}

export default EditUser
