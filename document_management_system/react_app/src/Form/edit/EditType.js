import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class EditType extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           typeTitle: this.props.match.params.title, //is index.js 
           title:'',
           type: {},
           redirect: false,            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/visi-tipai' />
        }
      }
      handleTitleChange = (title) => (event) => {
        const { type } = this.state;
        const newType = {
          ...type,
          [title]: event.target.value,          
        };
        this.setState({ type: newType });   
      }

      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/types/${this.state.typeTitle}`)
        .then(result => {
          const type = result.data
        this.setState({type});
        console.log("Type from edit", result.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    

    handleSubmit(e) {
        e.preventDefault();
       
        axios.put(`http://localhost:8099/api/types/${this.state.typeTitle}/edit`, {
            title: this.state.type.title
        })
        .then(function(response) {
            console.log(response);
            console.log('Send this in a PUT request:',this.state.title );
        }).catch(function (error) {
            console.log(error);
        })
        this.setRedirect();
      }

  render() {
    return (
      <div className="container new-form"> 
      <div className="container" id="type_form">
        <h5>Redaguoti dokumento tipą</h5>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group has-error form-group has-success">
          <label className="control-label" for="inputError1">Dokumento tipo pavadinimas</label>
          <input type="text" onChange={this.handleTitleChange('title')} value={this.state.type.title} className="form-control" id="inputError1" required/>
        </div>
       
        {this.renderRedirect()}
          <button className="btn btn-primary" type="submit">Išsaugoti</button>
        </form>          
      </div>
      </div>
    )
  }
}

export default EditType
