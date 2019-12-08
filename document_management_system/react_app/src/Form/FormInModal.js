import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './../index.css';
import {
  Button, Modal, Form, Input, Radio,
} from 'antd';

const FormInModal = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class FormInModal extends Component{
   
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const { message, onMessageChange } = this.props;
      return (
        <Modal
          visible={visible}
          title="Dokumento atmetimo priežastis"
          okText="Siųsti atsakymą"
          cancelText="Atšaukti"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Žinutė">
              {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Prašome įvesti žinutės tekstą' }],
              })(
                <Input.TextArea autosize setFieldsValue={message} onChange={onMessageChange}/>
              )}
            </Form.Item>
           
          </Form>
        </Modal>
      );
    }
  }
);
export default FormInModal;