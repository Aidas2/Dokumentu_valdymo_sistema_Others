import React, {Component} from 'react';   
import SingleInput from './../components/singleInput';
import axios from 'axios';
import 'antd/dist/antd.css';
import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH } from './../index';
 import { Form, Input, Button, notification } from 'antd';


 class TypeFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        types: []
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleTypeTitleChange = this.handleTypeTitleChange.bind(this);
   
    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    }); 
  }
  
  handleTypeTitleChange(e) {  
    this.setState({ title: e.target.value });
  }
  
  handleFormSubmit(e) {  
    e.preventDefault();

    const { types } = this.state,
    title = this.state.title
    this.setState({
      types: [...types, {
        title,
      }]
    })
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/types/new', {
      title: this.state.title,
        })
        .then(response => {
          console.log(response);
          const responseStatus = response.status
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Dokumento tipas sukurtas sėkmingai!'
        });
        }
      })
        .catch(error => {
          if(error.status === 401) {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                    
          } else {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: error.message || 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                                            
          }
      });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    title: '',
  });
  }


  render() {
    return (
      <div className="container new-form">
      <form className="container" id="type_form" onSubmit={this.handleFormSubmit}>
        <h5>Sukurti dokumento tipą </h5>
        <SingleInput 
        inputType={'text'}
        title={'Dokumento tipas'}
        name={'title'}
        controlFunc={this.handleTypeTitleChange}
        content={this.state.title}
        placeholder={'Dokumento tipo pavadinimas'}
        /> 
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Saugoti"/>
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Išvalyti įvestus duomenis</button>
      </form>
      </div>
    );
    }
}
export default TypeFormContainer;

//  const FormItem = Form.Item;

// class TypeFormContainer extends Component {  
//   constructor(props) {
//     super(props);
//     this.state = {
//         name: '',
//         types: []
//       };
//     this.handleFormSubmit = this.handleFormSubmit.bind(this);
//     this.handleClearForm = this.handleClearForm.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);

//     notification.config({
//       placement: 'topRight',
//       top: 70,
//       duration: 3,
//     }); 
//   }
//   handleInputChange(event, validationFun) {
//     const target = event.target;
//     const inputName = target.name;        
//     const inputValue = target.value;

//     this.setState({
//         [inputName] : {
//             value: inputValue,
//             ...validationFun(inputValue)
//         }
//     });
// }
  
//   handleFormSubmit(e) {  
//     e.preventDefault();

//     const { types } = this.state,
//     title = this.state.title
//     this.setState({
//       types: [...types, {
//         title,
//       }]
//     })
//     this.handleClearForm(e);

//     axios.post('http://localhost:8099/api/types/new', {
//       title: this.state.title,
//         })
//         .then(response => {
//           console.log(response);
//           const responseStatus = response.status
//          if(responseStatus >= 200 && responseStatus < 300){ 
//           notification.success({
//             message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
//             description: 'Dokumento tipas sukurtas sėkmingai!'
//         });
//         }
//       })
//         .catch(error => {
//           if(error.status === 401) {
//               notification.error({
//                   message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
//                   description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
//               });                    
//           } else {
//               notification.error({
//                   message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
//                   description: error.message || 'Atsiprašome įvyko klaida bandykite dar kartą!'
//               });                                            
//           }
//       });
//   }

//   handleClearForm(e) {
//     e.preventDefault();
//     this.setState({
//     title: '',
//   });
//   }

 


//   render() {
//       return (
//       <div className="container" id="list_container">
//         <div className="container user_form">
//           <h5>Sukurti dokumento tipą </h5>
//           <Form onSubmit={this.handleFormSubmit}>
//           <FormItem 
//                         validateStatus={this.state.name.validateStatus}
//                             help={this.state.name.errorMsg}>
//                             <Input 
//                                   size="large"
//                                   name="name"
//                                   placeholder="Dokumento tipas"
//                                   value={this.state.name.value} 
//                                   onChange={(event) => this.handleInputChange(event, this.validateTitle)} />    
//                           </FormItem>
//         <FormItem>
//           <input
//             type="submit"
//             className="btn btn-primary float-right"
//             value="Išsaugoti"/>
//             </FormItem>
//           <button
//             className="btn btn-link float-left"
//             onClick={this.handleClearForm}>Išvalyti formą</button>
//             </Form>
//         </div>
//         </div>
//       );
//     }
    
//     validateTitle = (name) => {
//       if(name.length < TITLE_MIN_LENGTH) {
//           return {
//               validateStatus: 'error',
//               errorMsg: `Dokumento tipo pavadinimas per trumpas (mažiausia leidžiama ${TITLE_MIN_LENGTH} simboliai.)`
//           }
//       } else if (name.length > TITLE_MAX_LENGTH) {
//           return {
//               validationStatus: 'error',
//               errorMsg: `Dokumento tipo pavadinimas per ilgas (daugiausia leidžiama ${TITLE_MAX_LENGTH} simboliai.)`
//           }
//       } else {
//           return {
//               validateStatus: 'success',
//               errorMsg: null,
//             };            
//       }
//     }
//   }

// export default TypeFormContainer;