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

export class UserDocumentSearch extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: {},
          data: [],
          pagination: {},
          page:'',
          radioValue:'',
          startDate:{},
          endDate:{},
          documentTypes: [],
          typeTitle:''

        }; 
    }


        fetch = (params = {}) => {
        const {page}=this.state
    
        this.setState({ loading: true });
        reqwest({
            url: `http://localhost:8099/api/documents/${this.props.user.email}/${params}/all`,
            method: 'get',
            data: {
            size: 10,
            search: params,
            sort: 'created_Date,desc',
            ...params,
            },
            type: 'json',
        }).then((data) => {
        console.log("data resp ", data)
            const pagination = { ...this.state.pagination };
            // Read total count from server
            pagination.total = data.totalElements;
            
            this.setState({
            loading: false,
            data: data.content,
            page: data.number,
            pagination,
            });
        });
        }
        handleSearch(value){
            value.length !== 0 && this.fetch(value)     
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

            axios.get(`http://localhost:8099/api/documents/${this.props.user.email}/${myStartDate}/${myEndDate}`)
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
        title: 'Sukūrimo data',
        dataIndex: 'createdDate',
        key: 'created_Date',
        render: createdDate => createdDate,
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
        width: '15%',
      },
      {
        title: '',
        dataIndex: 'userDocuments',
        key: 'edit',
        render: userDocuments => userDocuments.map(item=>item.submitted === false ? <Link to={`/redaguoti/dokumentas/${item.document.uniqueNumber}`}>
        <Icon type="edit" /></Link> : <Icon type="edit" disable/>),
        width: '5%',
      },
    ];
      
    const {result, data} = this.state
    return (
      <div className="container" id="admin-search-form">
      <h5>Vartotojo siunčiamų dokumentų paieška</h5>
      {/* <button className="btn btn-info" onClick={this.resetSearch}>Reset</button> */}
      <div className="row">
      <div className="col-lg-6">     
      <Search
      placeholder="Įveskite dokumento pavadinimą"
      onSearch={value => this.handleSearch(value)}
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
        <Table dataSource={data} columns={columns} 
        rowKey={record => record.number} 
        pagination={this.state.pagination} 
        scroll={{ y: 200 }}
        locale={{ emptyText: 'Duomenys negauti, prašome įvesti paieškos raktažodį' }}
        /> 
      </div>
    </div>
    )
  }
}

export default UserDocumentSearch
