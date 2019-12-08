import React, {Component} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import SingleInput from '../components/singleInput'
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { signup, checkEmailAvailability } from '../security/apiUtil';
import { 
  NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
  SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH, 
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../index';
import { Form, Input, Button, notification } from 'antd';

const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
    name: { value: ''},
    surname: { value: ''},
    email: { value: ''},
    password: { value: ''},
      groups:[],
      groupName:'',
      userGroups:[],
      admin: false,
      redirect: false,
      emails: []
      
    }
    console.log("Admin state", this.state.admin)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
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

checkEmail(event){
  const emailValue = event.target.value;
    if(this.state.emails.filter(email => email === emailValue)){
console.log('exits')
    }
}

  handleSelectChange(e) {  
    this.setState({ groupName: e.target.value });   
  }

  handleChangeAdmin(event){
    this.setState({ admin : event.target.checked });
    }
  
  handleFormSubmit(e) {  
    e.preventDefault();
  
    this.handleClearForm(e);

    axios.post('http://localhost:8099/api/auth/newUser', {
      name: this.state.name.value,
      surname: this.state.surname.value,
      email:this.state.email.value,
      password: this.state.password.value,
      groupName: this.state.groupName,
      userGroups: this.state.userGroups,
      admin: this.state.admin,
        })
        .then(response => {
          console.log(response);
          const responseStatus = response.status
         if(responseStatus >= 200 && responseStatus < 300){ 
          notification.success({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Vartotojas sukurtas sėkmingai!'
        });
        }
      })
        .catch(error => {
          console.log(error)
              notification.error({
                  message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                  description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
              });                    
      })
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      name: { value: ''},
      surname: { value: ''},
      email: { value: ''},
      password: { value: ''},
    groupName:'',
    admin: false,
    
  });
  
}

isFormInvalid() {
  return !(this.state.name.validateStatus === 'success' &&
      this.state.surname.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success'
  );
}
  render() {
    const options = this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)
    return (
    <div className="container signup-container">
      <h4>Kurti naują vartotoją</h4>
      <Form id="signup-form" onSubmit={this.handleFormSubmit}>
     
        <FormItem 
                validateStatus={this.state.name.validateStatus}
                help={this.state.name.errorMsg}>
                <Input 
                    size="large"
                    name="name"
                    placeholder="Vartotojo vardas"
                    value={this.state.name.value} 
                    onChange={(event) => this.handleInputChange(event, this.validateName)} />    
        </FormItem>
        <FormItem 
                validateStatus={this.state.surname.validateStatus}
                help={this.state.surname.errorMsg}>
                <Input 
                    size="large"
                    name="surname"
                    autoComplete="off"
                    placeholder="Vartotojo pavardė"
                    value={this.state.surname.value} 
                    onChange={(event) => this.handleInputChange(event, this.validateSurname)} />    
        </FormItem>
        <FormItem 
                hasFeedback
                validateStatus={this.state.email.validateStatus}
                help={this.state.email.errorMsg}>
                <Input 
                    size="large"
                    name="email" 
                    type="email" 
                    autoComplete="off"
                    placeholder="Vartotojo el. paštas"
                    value={this.state.email.value} 
                    onMouseLeave={(event)=>this.checkEmail(event)}
                    onBlur={this.validateEmailAvailability}
                    onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
            </FormItem>
            <FormItem 
                validateStatus={this.state.password.validateStatus}
                help={this.state.password.errorMsg}>
                    <Input 
                        size="large"
                        name="password" 
                        type="password"
                        autoComplete="off"
                        placeholder="Vartotojo slaptažodis nuo 6 iki 20 simbolių" 
                        value={this.state.password.value} 
                        onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
            </FormItem>
            <FormItem>
          <div>
            <label className="control-label">Pasirinkite vartotojo grupę</label>
                <select value={this.state.groupName} onChange={this.handleSelectChange} 
                className="form-control" id="ntype" required>
                  <option value="">...</option>
                    {options}
                </select>
            </div>
            </FormItem>
            <FormItem>
            <div>
            <label className="form-label capitalize">
            <input
                type="checkbox"
                checked={this.state.admin}
                onChange={this.handleChangeAdmin}
              />Administratorius 
         </label>
       </div>
       </FormItem> 
         <input
          type="submit"
          className="btn btn-primary float-right"
          value="Saugoti"/>
         <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}>Išvalyti įvestus duomenis</button> 
        
      </Form>
    </div>
    );
  }
  validateName = (name) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Vardas per trumpas (mažiausia leidžiama ${NAME_MIN_LENGTH} simboliai.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Vardas per ilgas (daugiausia leidžiama ${NAME_MAX_LENGTH} simboliai.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
          };            
    }
}
validateSurname = (surname) => {
  if(surname.length < SURNAME_MIN_LENGTH) {
      return {
          validateStatus: 'error',
          errorMsg: `Pavardė per trumpa (mažiausia leidžiama ${NAME_MIN_LENGTH} simboliai.)`
      }
  } else if (surname.length > SURNAME_MAX_LENGTH) {
      return {
          validationStatus: 'error',
          errorMsg: `Pavardė per ilga (daugiausia leidžiama ${NAME_MAX_LENGTH} simboliai.)`
      }
  } else {
      return {
          validateStatus: 'success',
          errorMsg: null,
        };            
  }
}

validateEmail = (email) => {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Laukas negali būti tuščias'                
        }
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if(!EMAIL_REGEX.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Netinkamas el.pašto formatas'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `El. paštas per ilgas (daugiausia leidžiama ${EMAIL_MAX_LENGTH} simboliai)`
        }
    }

    return {
        validateStatus: null,
        errorMsg: null
    }
}


validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if(emailValidation.validateStatus === 'error') {
        this.setState({
            email: {
                value: emailValue,
                ...emailValidation
            }
        });    
        return;
    }

    this.setState({
        email: {
            value: emailValue,
            validateStatus: 'validating',
            errorMsg: null
        }
    });

    checkEmailAvailability(emailValue)
    .then(response => {
        if(response.available) {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        } else  {
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'error',
                    errorMsg: 'El.paštas jau registruotas mūsų sistemoje, prašome įveskite kitą.'
                }
            });
        }
    }).catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });
    });
}

validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Slaptažodis per trumpas (mažiausia leidžiama ${PASSWORD_MIN_LENGTH} simboliai.)`
        }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validationStatus: 'error',
            errorMsg: `Slaptažodis per ilgas (daugiausia leidžiama ${PASSWORD_MAX_LENGTH} simboliai.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };            
    }
}

}
 
export default Register;