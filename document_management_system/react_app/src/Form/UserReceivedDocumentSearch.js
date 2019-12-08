import React, { Component } from 'react';
import axios from 'axios';
import { Input, Table, Tag, Button, Icon, notification, Radio, DatePicker, Select } from 'antd';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';
import moment from 'moment';

const Search = Input.Search;
const RadioGroup = Radio.Group;

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

const Option = Select.Option;

export class UserReceivedDocumentSearch extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: {},
          data: [],
          pagination: {},
          page:'',
          startDate:{},
          endDate:{},
        }; 
    }

        handleDateRange = (date, dateString) => {
            console.log("dates ", date, dateString)
            console.log(dateString[0])
        
            let myStartDate = new Date(dateString[0]);
            let myEndDate = new Date (dateString[1])

            this.setState({
                startDate: myStartDate,
                endDate: myEndDate,
            })

            axios.get(`http://localhost:8099/api/documents/received/${this.props.user.email}/${myStartDate}/${myEndDate}`)
            .then(result => {
            console.log("search url", result)
            this.setState({data: result.data.content})
            if(result.data.content.length === 0){
            return notification.error({
                message: 'Dokumentas nerastas. Bandykite dar kartą.',
                }); 
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } 

        handleSearchByTitle(value){
            const newValue = value.toLowerCase()
            console.log("new value ", newValue)
            axios.get(`http://localhost:8099/api/documents/received/${this.props.user.email}/${newValue}`)
            .then(result => {
            console.log("search url", result)
            this.setState({data: result.data.content})
            if(result.data.content.length === 0){
            return notification.error({
                message: 'Dokumentas nerastas. Bandykite dar kartą.',
                }); 
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        
        resetSearch(){
            
        }

  render() {
    const columns = [{
        title: 'Pavadinimas',
        dataIndex: 'title',
        // sorter: true,
        render: title => title,
        width: '20%',
      },{
        title: 'Numeris',
        dataIndex: 'number',
        render: number =><Link to={`/dokumentas/${number}`}>{number}</Link>,
        width: '20%',
      },{
        title: 'Tipas',
        dataIndex: 'type',
        render: type => type.title,
        width: '20%',
      }, {
        title: 'Gavimo data',
        dataIndex: 'submittedDate',
        key: 'submitted_Date',
        render: submittedDate => submittedDate,
        width: '20%',
      },
      {
        title: '',
        dataIndex: 'userDocuments',
        key: 'status',
        render: userDocuments => userDocuments.map(item => 
            item.rejected && <Tag color="volcano" key={item.document.uniqueNumber}>Atmestas</Tag> ||
            item.confirmed && <Tag color="green" key={item.document.uniqueNumber}>Patvirtintas</Tag>
            ),
        width: '20%',
      },
    ];
      
    const {result, data} = this.state
    return (
      <div>
      <div className="container" id="admin-search-form">
      <h5>Vartotojo gautų dokumentų paieška</h5>
      <div className="row">
      <div className="col-lg-6">     
      <Search
      placeholder="Įveskite dokumento pavadinimą"
      onSearch={value => this.handleSearchByTitle(value)}
      enterButton
      /> 
      </div>
      <br></br><br></br> 
      <div className="col-lg-6">     
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
    </div>
    <br></br>
    <div>
        <Table dataSource={data} columns={columns} rowKey={record => record.number} pagination={this.state.pagination} scroll={{ y: 200 }}
        locale={{ emptyText: 'Duomenys negauti, prašome įvesti paieškos raktažodį' }}
        // pagination={false}
        /> 
      </div>
    </div>
</div>
    )
  }
}

export default UserReceivedDocumentSearch
