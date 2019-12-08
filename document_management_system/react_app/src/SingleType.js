import React, { Component } from 'react';
import { Button, Card } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {notification, Icon, Checkbox, Tag, Dropdown, Select } from 'antd';
import { checkServerIdentity } from 'tls';

const Option = Select.Option;


export class SingleType extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
           title: this.props.match.params.title, //is index.js 
           type: {},
           groups:[],
           groupName:'',
           typeGroups: [],
           send: false,
           receive: false,
           checked:false,
           checked1:false
        }
        this.handleChangeSend = this.handleChangeSend.bind(this);
        this.handleChangeReceive = this.handleChangeReceive.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
      }
    
      componentDidMount = () => {
          axios.get(`http://localhost:8099/api/types/${this.state.title}`)
            .then(result => {
              const type = result.data
            this.setState({type});          
            })
            .catch(function (error) {
              console.log(error);
            });
          
          axios.get('http://localhost:8099/api/group')
            .then(result => {
              const groups = result.data
            this.setState({groups});
            console.log("Grupes", groups)
            })
            .catch(function (error) {
              console.log(error);
            });

          axios.get(`http://localhost:8099/api/types/groups/${this.state.title}`)
            .then(result => {
            const typeGroups = result.data.typeGroups
            this.setState({typeGroups})
            })
            .catch(function (error) {
              console.log(error);
            });
      }

    handleSelectChange(e) {  
        this.setState({ groupName: e });
    }

    handleChangeSend(event){
      const senders = (event.target.value == "siuntejai" ? true : false)
      this.toggleSendChecked()
        this.setState({ 
          send : senders,
        });
    }

    handleChangeReceive(event){
      const receivers = (event.target.value == "gavejai" ? true : false)
      this.toggleReceiveChecked()
            // this.setState({ receive : event.target.value });
            this.setState({ 
              receive : receivers,
             });
    }

    handleResultChange(value, receive, send) {

      const newGroup = {
        group: {
          name : value
        },
        receive: receive,
        send: send
      }
      var newArray = this.state.typeGroups.slice();       
      newArray.push(newGroup);   
      this.setState({typeGroups:[...newArray]})
    }
    
    handleClearForm(e) {
            e.preventDefault();
            this.setState({
            groupName: '',
            send: false,
            receive: false,
            checked: false,
            checked1: false,
          });
    }

    handleRemove(index) {
      let typeGroups = this.state.typeGroups
      let groupIdx = this.state.typeGroups.findIndex((group) => group.name === index); //find array elem index by name/index
      const newList = this.state.typeGroups.splice(groupIdx, 1); //delets element and returns removed element
       this.setState({ typeGroups: [...typeGroups] }); 

       axios.delete(`http://localhost:8099/api/types/${this.state.title}/${index}/remove`)
          .then(response => {
            console.log("Response", response);
            const responseStatus = response.status
          console.log(responseStatus)
          if(responseStatus >= 200 && responseStatus < 300){ 
            notification.success({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: 'Dokumento tipo grupė sėkmingai pašalinta!'
          });    
          }
        })
         .catch(function (error) {
             console.log(error);
             notification.error({
              message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
              description: error.message || 'Atsiprašome įvyko klaida, bandykite dar kartą!'
          }); 
         }); 
     }
    handleSubmit(e) {
        e.preventDefault();
      
        var existing = this.state.groupName
        existing.toString()
      
        for (var i = 0, len = this.state.typeGroups.length; i < len; i ++) {
          if(this.state.typeGroups[i].group.name.indexOf(existing) !== -1){ 
          notification.error({
            message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
            description: 'Tipas jau priskirtais šiai grupei'
          })
          return;
            }
          }
        
        axios.post(`http://localhost:8099/api/types/${this.state.title}/addGroup`, {
          groupName: this.state.groupName,
          send: this.state.send,
          receive: this.state.receive,
            })
            .then(response => {
              console.log("Response", response);
              const responseStatus = response.status
             console.log(responseStatus)
            if(responseStatus >= 200 && responseStatus < 300){ 
              notification.success({
                message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                description: 'Grupė priskirta'
            });    
             }
          })
          .catch(error => {
            if(error.status >= 400 && error.status == 500) {
                notification.error({
                    message: 'Abrkadabra - Dokumentų valdymo sistema - 2019',
                    description: 'Atsiprašome įvyko klaida, bandykite dar kartą!'
                });  
              }})

            this.handleClearForm(e);
            this.handleResultChange(this.state.groupName, this.state.receive, this.state.send)
      }
      
     handleFocus = () => {
        this.setState({ groups: this.state.groups });
    };

    toggleSendChecked = () => {
      this.setState({ checked: !this.state.checked});
    }

    toggleReceiveChecked =()=>{
      this.setState({ checked1: !this.state.checked1 });
    }

    render() {

      const options = this.state.groups.map((group)=> <option key={group.name}>{group.name}</option>)
      return (
  
           <div className="container" id="single_item_container">
           <Card title={this.state.type.title} bordered={false} id="group-type">
                    <div>
                      <h6>Šio tipo dokumentas priskirtas grupėms: </h6> 
                    {(this.state.typeGroups.length == 0) ? <span>Dokumentas grupei nepriskirtas</span> : 
                    <ul>{this.state.typeGroups.map((element) => 
                       
                       (<li id="group-name" key={element.group.name}><Tag color={"geekblue"}>{element.group.name}</Tag> &nbsp;
                       {element.receive.toString() === 'true' ? <Tag>Gavėjai</Tag> : '' } &nbsp;
                       {element.send.toString() === 'true' ? <Tag>Siuntėjai</Tag> : '' }
                       &nbsp;<Icon type="close-circle" 
                  onClick={this.handleRemove.bind(this, element.group.name)}/>
                      </li>))}</ul>}
                    </div> 
           
            <div className="container add-group-type" id="">
            <h6>Priskirti vartotojų grupę</h6>
            <form onSubmit={this.handleSubmit}>
              <Select
                  showSearch
                  style={{ width: 285 }}
                  placeholder="Pasirinkite vartotojų grupę"
                  optionFilterProp="children"
                  onChange={this.handleSelectChange} 
                  onFocus={this.handleFocus}
                  // onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  required>
                
                  {this.state.groups.map((group) => (
                  <Select.Option key={group.name} value={group.name}>{group.name}</Select.Option>
                ))}
              </Select>
            <span>
            <Checkbox checked={this.state.checked1} id="gavejai"  onChange={this.handleChangeReceive} value="gavejai" required>Gavėjai</Checkbox>
            <Checkbox checked={this.state.checked} id="siuntejai" onChange={this.handleChangeSend} value="siuntejai" required>Siuntėjai</Checkbox>
            </span>  
            <button className="btn btn-outline-info btn-sm btn-block" type="submit">Saugoti</button>         
            </form>
            </div>
            </Card>
            </div>

      );
}
}

export default SingleType
