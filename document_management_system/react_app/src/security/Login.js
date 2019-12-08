import React, { Component } from 'react';
import { login } from './apiUtil';
import '../index';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../index';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h6 className="page-title">DOKUMENTŲ VALDYMO SISTEMA ABRAKADABRA</h6>
                <br></br>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                            description: 'Jūsų įvestas el.paštas arba slaptažodis neteisingi. Bandykite dar kartą!'
                        });                    
                    } else {
                        notification.error({
                            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019 ',
                            description: error.message || 'Atsiprašome įvyko klaida. Bandykite dar kartą!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Įveskite el.pašto adresą.' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="email" 
                        placeholder="el.paštas" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Įveskite slaptažodį.' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="slaptažodis"  />                        
                )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button" block>Prisijungti</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Login;