import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './../index.css';
import {
    Button, Modal, Form, Input, Radio,
  } from 'antd';

const InputFormModal = Form.create({ name: 'input_form_in_modal' })(
class InputFormModal extends Component {
    render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        const { input, title, onInputChange } = this.props;
        return (
          <Modal
            visible={visible}
            title={title}
            okText="Saugoti"
            cancelText="Atšaukti"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <Form.Item label="Pavadinimas">
                {getFieldDecorator('message', {
                  rules: [{ required: true, message: 'Prašome įvesti pavadinimą' }],
                })(
                  <Input setfieldsvalue={input} onChange={onInputChange}/>
                )}
              </Form.Item>
             
            </Form>
          </Modal>
        );
      }
    }
);
export default InputFormModal
