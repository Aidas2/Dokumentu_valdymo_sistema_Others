import Group from './Group';  
import React, { Component } from 'react';
import axios from 'axios';
import {Icon, notification} from 'antd';
import {Link} from 'react-router-dom';
import InputFormModal from './Form/InputFormModal';

export class GroupListContainer extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      groups: [],
      visible: false,
      input:''
    }

      console.log("props Types", this.props)
    this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount = () => {

      axios.get('http://localhost:8099/api/group')
      .then(result => {
        const groups = result.data
      this.setState({groups});
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    deleteGroup(name) {
      this.setState(prevState=>{
          const newItems = prevState.groups.filter((group)=>group.name!==name);
          return {
              groups: newItems
          }
      })
    }

    handleFormSubmit(e) {  
      const { groups } = this.state,
      name = this.state.input
      this.setState({
        groups: [...groups, {
          name,
        }]
      })
      axios.post('http://localhost:8099/api/group/new', {
        name: this.state.input,
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
          this.setState(prevState=>{
            const newItems = prevState.groups.filter((e)=>e!==name);
            return {
                groups: newItems
            }
        })
        })
          .catch(error => {
            if(error.status === 401) {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Atsiprašome įvyko klaida bandykite dar kartą!'
                });                    
            } else if (error.status === 500) {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Grupė tokiu pavadinimu jau egzistuoja sistemoje. Bandykite dar kartą!'
                });                                            
            }
        });
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

    this.state.groups.map((group) => (
      rows.push(<Group group={group} key={group.name} deleteGroup={this.deleteGroup}/>)  
    ));
    return (
  <div className="container" id="list_container">
    <div className="container item-list">
    <h5>Vartotojų grupės</h5>
    <span className="float-right"><Icon onClick={this.showModal} style={{ fontSize: '22px'}} type="plus-circle" /> PRIDĖTI NAUJĄ</span>
    <InputFormModal
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  input = {input}
                  title = "Grupės pavadinimas"
                  onInputChange={this.handleInputChange}                  
                  onCreate={()=>{ this.handleCreate(); this.handleFormSubmit() }}
                />
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Pavadinimas</th><th></th><th></th><th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    </div>  
  </div>
      );
  }
}

export default GroupListContainer
