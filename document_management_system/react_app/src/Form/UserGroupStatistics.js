import React, { Component } from 'react'
import axios from 'axios';
import { Input, Button, Icon, notification, Radio, DatePicker, Select } from 'antd';
import moment from 'moment';
import { reverse } from 'dns';

const Search = Input.Search;
const RadioGroup = Radio.Group;

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const Option = Select.Option;

const ASC = 'ascending';
const DSC = 'descending';

export class UserGroupStatistics extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: '',
          startDate:{},
          endDate:{},
          typeTitle: null,
          documentTypes:[],
          userGroups:[],
          email: this.props.currentUser.email,
          groupName:null,
          startDateString:'',
          endDateString:'',
          radioValue:'',
          status:'',
          resultUser:'',
          topUsers:[]
        }; 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchSubmittedCount = this.fetchSubmittedCount.bind(this);
        this.fetchConfirmedCount = this.fetchConfirmedCount.bind(this);
        this.fetchRejectedCount = this.fetchRejectedCount.bind(this);
        this.resetSearch  = this.resetSearch.bind(this);
        this.handleUserSearchsubmit = this.handleUserSearchsubmit.bind(this);
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8099/api/users/${this.state.email}`)
        .then(result => {
            console.log("grupe", result)

        const userGroups = result.data.userGroups
        this.setState({userGroups})
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(`http://localhost:8099/api/types/${this.state.email}/userReceivedDocumentTypes`)
        .then(result => {
          console.log("tipas", result)
          
         const tipai = result.data;
         var documentTypes = [];
         tipai.forEach(element => {
           documentTypes.push(element.title);
         });

         this.setState({ 
           documentTypes
         })
       })
       .catch(function (error) {
           console.log(error);
         }); 
      
    }
    
    handleDateRange = (date, dateString) => {
        console.log("dates ", date, dateString)
        console.log(dateString[0])
    
        let myStartDate = new Date(dateString[0]);
        let myEndDate = new Date (dateString[1])

        this.setState({
            startDate: myStartDate,
            endDate: myEndDate,
            startDateString: dateString[0],
            endDateString: dateString[1]
        })
    }   

    fetchSubmittedCount(){
        axios.get(`http://localhost:8099/api/documents/submitted/${this.state.email}/${this.state.startDate}/${this.state.endDate}/${this.state.typeTitle}/${this.state.groupName}`)
        .then(result => {
        
        this.setState({result: result.data, status:"gavo"});
        console.log("RESULT", result.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchConfirmedCount(){
        axios.get(`http://localhost:8099/api/documents/confirmed/${this.state.email}/${this.state.startDate}/${this.state.endDate}/${this.state.typeTitle}/${this.state.groupName}`)
        .then(result => {
        
        this.setState({result: result.data, status:"patvirtino"});
        console.log("RESULT", result.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    fetchRejectedCount(){
        axios.get(`http://localhost:8099/api/documents/rejected/${this.state.email}/${this.state.startDate}/${this.state.endDate}/${this.state.typeTitle}/${this.state.groupName}`)
        .then(result => {
        
        this.setState({result: result.data, status:"atmetė"});
        console.log("RESULT", result.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleTypeSelectChange(value) {  
        console.log("selected ", value)
        this.setState({ typeTitle: value });
    }

    handleGroupSelectChange(value) {  
        console.log("selected ", value)
        this.setState({ groupName: value });
    }

     onRadioChange = (e) => {
            console.log('radio checked', e.target.value);
            this.setState({
              radioValue: e.target.value,
            });
        }

    handleSubmit(){
       
        switch (this.state.radioValue) {
            case 'submitted':
            this.fetchSubmittedCount()
            break;
            case 'confirmed':
            this.fetchConfirmedCount()
            break;
            case 'rejected':
            this.fetchRejectedCount()
            break;
            default:
            notification.error({
                message: 'Prašome užpildyti visus paieškos laukus',
                description: 'Abrkadabra - Dokumentų valdymo sistema - 2019'
              });
              return null;
          }
       
    }

    handleUserSearchsubmit(){
      axios.get(`http://localhost:8099/api/users/${this.state.email}/${this.state.groupName}/userDocuments`)
      .then(result => {       
      this.setState({resultUser: result.data});
      result.data.map(item=> {
        let name = item[0]
        let count = item[1]
        let topUser = { name: name, count: count };
  
        return this.state.topUsers.push(topUser)
        })
        console.log("TOP users ", this.state.topUsers)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    resetSearch(e){
        
        this.setState({ 
            typeTitle: null,
            groupName: null,
            startDate: {},
            endDate:{},
            result: '',
            startDateString:'',
            endDateString:'',
            radioValue:'',
            status:'',
            count:[],
            resultUser:''
        });
    }

    resetUserSearch(){
      this.setState({
        resultUser: '',
        // topUsers:[],
        groupName: null,
      })
    } 
  
  render() {
    return (
        <section id="statistics">
        <div className="container" id="statistics-search-form">
                <span className="row" id="btn-statistics">
               <Button  type="primary" icon="search" onClick={this.handleSubmit}>Pateikti užklausą</Button>
               <Button  onClick={this.resetSearch}>Išvalyti duomenis</Button>
               </span>
               <h5>Gautų dokumentų statistika</h5>          
        <div className="container">
        <div className="row">
            <br></br><br></br> 
            <div className="col-lg-4 col-sm-12">     
            <span id="date-range-search">
            <RangePicker
            style={{  width: '100%' }}
            defaultValue={[moment('2019/03/01', dateFormat), moment('2019/03/31', dateFormat)]}
            format={dateFormat}
            onChange={(date, dateString)=>this.handleDateRange(date, dateString)}
            allowClear = {true}
            />
            </span>  
            </div>
            <div className="col-lg-4 col-sm-12">
                <Select        
                style={{ width: '100%' }}
                placeholder="Pasirinkite grupę"
                onChange={value=>this.handleGroupSelectChange(value)} 
                required>
                    {this.state.userGroups.map((group) => (
                    <Select.Option key={group.name} value={group.name}>{group.name}</Select.Option>
                    ))}
                </Select>
            </div>
            <div className="col-lg-4 col-sm-12">
                <Select        
                style={{ width: '100%' }}
                placeholder="Pasirinkite dokumento tipą"
                onChange={value=>this.handleTypeSelectChange(value)} 
                onFocus={this.handleFocus}
                required>
                    {this.state.documentTypes.map((type) => (
                    <Select.Option key={type} value={type}>{type}</Select.Option>
                    ))}
                </Select>
            </div>
        </div>
        <span className="row" id="statistics-radio-group"><p>Pasirinkite dokumento būseną: </p>
            <RadioGroup onChange={this.onRadioChange} value={this.state.radioValue}>
            <Radio value={"submitted"}>Pateiktas</Radio>
            <Radio value={"confirmed"}>Patvirtintas</Radio>  
            <Radio value={"rejected"}>Atmestas</Radio> 
            </RadioGroup>
        </span>
      </div>
      </div>
      {this.state.result &&
      <div className="container" id="statistics-search-result">
        <p>Per laikotarpį nuo <em>{this.state.startDateString}</em> iki <em>{this.state.endDateString}</em> grupė {this.state.groupName.toUpperCase()} {this.state.status} <strong>{[this.state.result]}</strong> dokumentus (-ą) {this.state.typeTitle.toUpperCase()}.</p>
      </div>
      }
      <div className="container" id="statistics-search-form">
      <h5>Vartotojų pateikusių dokumentus grupei statistika</h5>
      <div id="group-user-search">
        <div className="row no-gutters">
            <br></br><br></br> 
            <div className="col-2 col-sm-3">
               <Button  type="primary" icon="search" onClick={this.handleUserSearchsubmit}>Pateikti užklausą</Button>
               </div>
               <div className="col-2 col-sm-3">
               <Button  onClick={this.resetSearch}>Išvalyti duomenis</Button>
               </div>
            <div className="col-8 col-sm-6">
                <Select        
                style={{ width: '100%' }}
                placeholder="Pasirinkite grupę"
                onChange={value=>this.handleGroupSelectChange(value)} 
                required>
                    {this.state.userGroups.map((group) => (
                    <Select.Option key={group.name} value={group.name}>{group.name}</Select.Option>
                    ))}
                </Select>
            </div>
        </div>
        </div>
      </div>
      {this.state.resultUser &&
      <div className="container" id="statistics-search-result">
      <span id="top-users-list"><ul>{this.state.resultUser.map(item=><li>Vartotojas {item[0]} pateikė {item[1]} dokumentą (-us)</li>)}</ul></span>
      </div>
      }
      </section>

    )
  }
}

export default UserGroupStatistics
