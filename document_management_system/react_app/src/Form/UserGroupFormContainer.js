import React, {Component} from 'react';   
import SingleInput from './../components/singleInput';
import axios from 'axios';
import 'antd/dist/antd.css';
import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH } from './../index';
 import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class UserGroupFormContainer extends Component {  
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        groups: []
      };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
   
  }
  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
        [inputName] : {
            value: inputValue,
            ...validationFun(inputValue)
        }
    });
}

  handleFormSubmit(e) {  
    e.preventDefault();
  
    const { groups } = this.state,
    name = this.state.name
    this.setState({
      groups: [...groups, {
        name,
      }]

    })
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/group/new', {
      name: this.state.name.value,
        })
        .then(response => {
          console.log(response);
          const responseStatus = response.status
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Vartotojų grupė sukurta sėkmingai!'
        });
        }
      })
        .catch(error => {
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                    
      });
  }


  handleClearForm(e) {
    e.preventDefault();
    this.setState({
    name: '',
  });
  }
  render() {
    return (
      <div className="container new-form"> 
       <div className="container" id="type_form">
        <h5>Sukurti vartotojų grupę </h5>
        <Form onSubmit={this.handleFormSubmit}>
        <FormItem 
            validateStatus={this.state.name.validateStatus}
            help={this.state.name.errorMsg}>
              <Input 
                  title="Grupės pavadinimas"
                  size="medium"
                  name="name"
                  placeholder="Grupės pavadinimas"
                  value={this.state.name.value} 
                  onChange={(event) => this.handleInputChange(event, this.validateTitle)} />    
        </FormItem>
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Išsaugoti"/>       
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Išvalyti įvestus duomenis</button>
          </Form>
      </div>
      </div>
    
    );
  }
  validateTitle = (name) => {
    if(name.length < TITLE_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Grupės pavadinimas per trumpas (mažiausia leidžiama ${TITLE_MIN_LENGTH} simboliai.)`
        }
    } else if (name.length > TITLE_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Grupės pavadinimas per ilgas (daugiausia leidžiama ${TITLE_MAX_LENGTH} simboliai.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
  }
}
export default UserGroupFormContainer;