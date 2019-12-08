import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import SingleInput from '../components/singleInput';
import UploadFile from '../UploadFile';
import {notification } from 'antd';
import 'antd/dist/antd.css';


class Form extends Component {
  
  constructor(props) {
      super(props);
      var today = new Date(),
          date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+'-'+today.getHours()+'-'+today.getMinutes();
      this.state = {
        user: this.props.currentUser,
        documents: [],
        groups: [],
        userGroups:[],
        userType:[],
        serTypes:[],
        redirect: false,
        types: [],
        typeTitle: '',
        title: '',
        description: '',
        email: props.currentUser.email,
        date: date,
        uniqueNumber:'',
        documentTypes:[],
        file:null,
        fileName: '',
        displayAddFiles: false,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
      this.handleDocumentTitleChange = this.handleDocumentTitleChange.bind(this);
      this.handleDocumentDescriptionChange = this.handleDocumentDescriptionChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }
  
    componentDidMount = () => {
      axios.get('http://localhost:8099/api/types/typeGroup')
      .then(result => {
          const types = result.data;
          this.setState({ 
            types
          })
          console.log("tipai", types)
          var groups = [];
          types.forEach(element => {
            groups.push(element.group.name);
          });
          this.setState({
            groups
          })
        })
        .catch(function (error) {
            console.log(error);
          }); 

        axios.get(`http://localhost:8099/api/types/${this.state.email}/userDocumentTypes`)
         .then(result => {
          const tipai = result.data;
          var documentTypes = [];
          tipai.forEach(element => {
            documentTypes.push(element.title);
          });

          this.setState({ 
            documentTypes
          })
      
        })
        .catch(function (error) {
            console.log(error);
          }); 
           
    }
    handleDocumentTitleChange(e) {  
      this.setState({ title: e.target.value });
    }

    handleDocumentDescriptionChange(e) {
      this.setState({ description: e.target.value });
    }

    handleSelectChange(e) {  
      this.setState({ typeTitle: e.target.value });
    }

    handleClearForm(e) {
      e.preventDefault();
      this.setState({
      title: '',
      description: '',
      typeTitle: '',
    });
    }
  
  handleSubmit(e) {
      e.preventDefault();

  const uniqueNumber = this.state.date + '-' + this.state.user.name.charAt(0).toUpperCase() + this.state.user.surname.charAt(0).toUpperCase();

  this.fileUpload(this.state.file).then((response)=>{
    console.log(response.data)
  })
  this.handleClearForm(e);   
  // const fileName = this.state.date + '-' + this.state.file.name; 
  // console.log("FILENAME PLUS DATE", this.state.fileName);

  axios.post('http://localhost:8099/api/documents/new', {
   
    title: this.state.title,
    description: this.state.description,
    typeTitle: this.state.typeTitle,
    email:this.state.email,
    uniqueNumber: uniqueNumber,
    fileName: this.state.file.name
      })
      .then(response => {
          console.log("Response", response);
          const responseStatus = response.status
         console.log(responseStatus)
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumentas sukurtas sėkmingai!'
        });    
          this.props.history.push(`/dokumentas/${uniqueNumber}`) }
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
                description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
            });                                            
        }
    });
}

onChange(e) {
  this.setState({file:e.target.files[0]})

  switch (e.target.name) {
    // Updated this
    case 'selectedFile':
      if(e.target.files.length > 0) {
          // Accessed .name from file 
          this.setState({ fileName: e.target.files[0].name });
      }
    break;
    default:
      this.setState({ [e.target.name]: e.target.value });
   }
}
fileUpload(file){
  const url = 'http://localhost:8099/api/file/uploadFile';
  const formData = new FormData();
  formData.append('file',file)
  formData.append('fileName', this.state.date + + this.state.user.name.charAt(0).toUpperCase() + this.state.user.name.charAt(0).toUpperCase())
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }
  return  axios.post(url, formData,config)
}

  render() {
    const { fileName } = this.state;
    let selected = null;
 
    selected = fileName 
       ? ( <span>Pasirinkta - {fileName}</span>) 
       : ( <span>Pasirinkite dokumentą...</span> );
 
      const options = this.state.documentTypes.map(type =>
        <option key={type} value={type}>{type}</option>  
      )
      return (
       
        <div className="container new-document">
          <h4>Sukurti naują dokumentą</h4>
          <form id="new-document" onSubmit={this.handleSubmit}>
          <SingleInput 
            inputType={'text'}
            title={'Dokumento pavadinimas'}
            name={'title'}
            controlFunc={this.handleDocumentTitleChange}
            content={this.state.title}
            placeholder={'Dokumento pavadinimas'}
           /> 
          <SingleInput 
            inputType={'text'}
            title={'Dokumento aprasymas'}
            name={'description'}
            controlFunc={this.handleDocumentDescriptionChange}
            content={this.state.description}
            placeholder={'Dokumento aprasymas'}
           /> 
          <div>
              <label className="control-label">Pasirinkite dokumento tipą</label>
              <select value={this.state.typeTitle} onChange={this.handleSelectChange} 
              className="form-control" id="ntype" required>
               <option value="">...</option>
            {options}
              </select>
          </div>
          <br></br>
          <div className="custom-file" id="customFile" lang="es">
          <input type="file" className="custom-file-input" name="selectedFile" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.onChange} required/>
          <label className="custom-file-label" htmlFor="file">{selected}</label>
          </div>
          <br></br>
          <br></br>
          <button className="btn btn-primary" type="submit">Saugoti dokumentą</button>
          </form>
          <br></br>
        </div>
      
      ) 
    }

}
const username = {
  border:'solid 1 px grey',
  backgroundColor: 'yellow',
}

export default Form;
