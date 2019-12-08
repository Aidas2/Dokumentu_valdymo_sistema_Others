import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

export class DocumentSearchForm extends Component {
    state = {
        expand: false,
      };
    
      handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          console.log('Received values of form: ', values);
        });
      }
    
      handleReset = () => {
        this.props.form.resetFields();
      }
    
      toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
      }
    
      // To generate mock Form.Item
      getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: { span: 5 },
          wrapperCol: { span: 19 },
        };
        const children = [];
        for (let i = 0; i < 10; i++) {
          children.push(
            <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
              <FormItem {...formItemLayout} label={`Field ${i}`}>
                {getFieldDecorator(`field-${i}`)(
                  <Input placeholder="placeholder" />
                )}
              </FormItem>
            </Col>
          );
        }
        return children;
      }
    
      render() {
        const WrappedDocumentSearchForm = Form.create()(DocumentSearchForm);

        return (
          <div>
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row gutter={40}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  Clear
                </Button>
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row>
          </Form>

         
          <WrappedDocumentSearchForm />
          <div className="search-result-list">Search Result List</div>
          </div>
        );
      }
}

export default DocumentSearchForm
