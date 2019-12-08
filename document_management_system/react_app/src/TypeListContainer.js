import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Type from './Type';
import {Icon, notification} from 'antd';
import {Link} from 'react-router-dom';
import InputFormModal from './Form/InputFormModal';


export class TypeListContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      types: [],
      visible: false,
      input:''
    }

    console.log("props Types", this.props)
  this.deleteType = this.deleteType.bind(this);
}

componentDidMount = () => {
  axios.get('http://localhost:8099/api/types')
  .then(result => {
    const types = result.data
  this.setState({types});
  console.log("Tipai", types)
  })
  .catch(function (error) {
    console.log(error);
  });
}
handleFormSubmit(e) {  
  const { types } = this.state,
  title = this.state.input
  this.setState({
    types: [...types, {
      title,
    }]
  })
  axios.post('http://localhost:8099/api/types/new', {
    title: this.state.input,
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
      this.setState(prevState=>{
        const newItems = prevState.types.filter((e)=>e!==title);
        return {
            types: newItems
        }
    })
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

  deleteType(title) {
   
    this.setState(prevState=>{
        const newItems = prevState.types.filter((type)=>type.title!==title);
        return {
            types: newItems
        }
    })
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false});
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleInputChange = event => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
  const{input}= this.state
    var rows = [];
    this.state.types.map((type) => (
      rows.push(<Type type={type} key={type.title} deleteType={this.deleteType}/>)  
    ));
    
    return (
  <div className="container" id="list_container">
    <div className="container item-list">
    <h5>Dokumentų tipai</h5>
    {/* <span className="float-right"><Link to={'/naujas-tipas'}><Icon style={{ fontSize: '22px'}} type="plus-circle" /></Link> PRIDĖTI NAUJĄ</span> */}
    <span className="float-right"><Icon onClick={this.showModal} style={{ fontSize: '22px'}} type="plus-circle" /> PRIDĖTI NAUJĄ</span>

    <InputFormModal
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  input = {input}
                  title = "Dokumento tipo pavadinimas"
                  onInputChange={this.handleInputChange}                  
                  onCreate={()=>{ this.handleCreate(); this.handleFormSubmit() }}
                />
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th>Pridėti grupę</th><th></th><th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    </div> 
    </div> 
      );

  }
}


export default TypeListContainer
