import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export class EditDocument extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           number: this.props.match.params.number, //is index.js 
           document: {},  
           documents: [],
           types: [],
           typeTitle: '',
           redirect: false,
           documentTypes:[]        
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={`/dokumentas/${this.state.number}`} />
        }
      }

      handleSelectChange(e) {  
        this.setState({ typeTitle: e.target.value });
      }
      componentDidMount = () => {
        axios.get(`http://localhost:8099/api/documents/${this.state.number}`)
        .then(result => {
          const document = result.data
        this.setState({document});
        console.log("Document from edit", document)
        })
        .catch(function (error) {
          console.log(error);
        });

        //pass user email form context
      //   axios.get(`http://localhost:8099/api/types/${this.state.email}/userDocumentTypes`)
      //   .then(result => {
      //    const tipai = result.data;
      //    var documentTypes = [];
      //    tipai.forEach(element => {
      //      documentTypes.push(element.title);
      //    });

      //    this.setState({ 
      //      documentTypes
      //    })
      //    console.log("DOKU TIPAI", documentTypes)
     
      //  })
      //  .catch(function (error) {
      //      console.log(error);
      //    }); 
  }

     handleChangeFor = (title, description) => (event) => {
        const { document } = this.state;
        const newDocument = {
          ...document,
          [title]: event.target.value,          
          [description]: event.target.value,
        };
        this.setState({ document: newDocument });
        console.log("Naujas dokumentas", this.state.document)
      }
   
    handleSubmit(e) {
        e.preventDefault();
       
        axios.put(`http://localhost:8099/api/documents/${this.state.number}/edit`, {
            title : this.refs.title.value,
            description : this.refs.description.value,
            typeTitle: this.state.typeTitle,
        })
        .then(function(response) {
            console.log(response);
            console.log('Send this in a PUT request:',this.refs.title.value );
        }).catch(function (error) {
            console.log(error);
        })

        this.setRedirect();
      }
  render() {
    // const options = this.state.documentTypes.map(type =>
    //   <option key={type} value={type}>{type}</option>)
        return (   
          <div className="container new-form"> 
          <div className="container" id="type_form">
            <h5>Redaguoti dokumentą</h5>
            <form onSubmit={this.handleSubmit}>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Pavadinimas</label>
              <input type="text" ref="title" onChange={this.handleChangeFor('title')} value={this.state.document.title} className="form-control" id="inputError1" required/>
            </div>
            <div className="form-group has-error form-group has-success">
              <label className="control-label" for="inputError1">Aprašymas</label>
              <input type="text" ref="description"  onChange={this.handleChangeFor('description')} value={this.state.document.description} className="form-control" id="inputError1" required/>
            </div>
            <div>
            </div>
            
            {this.renderRedirect()}
              <button className="btn btn-primary" type="submit">Išsaugoti</button>
            </form>          
          </div>
          </div>
        ) 
  }
}

export default EditDocument
