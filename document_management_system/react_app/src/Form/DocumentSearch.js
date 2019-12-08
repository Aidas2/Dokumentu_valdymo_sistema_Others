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

export class DocumentSearch extends Component {
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
          types: [],
          typeTitle:''

        }; 
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

        fetch = (params = {}) => {
        const radio =  this.state.radioValue;
        console.log("RADIO ", radio)
        const {page}=this.state
    
        //   const query = params.join();
        //   console.log('params:',query );
        this.setState({ loading: true });
        reqwest({
            url: 'http://localhost:8099/api/documents/findByNumberOrStatus',
            method: 'get',
            data: {
            size: 10,
            search: params,
            // sort: 'createdDate,desc',
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
            // const values = []
            // values.push(value)
            // values.push(this.state.radioValue)
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

            axios.get(`http://localhost:8099/api/documents/${myStartDate}/${myEndDate}`)
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

        handleSelectChange(value) {  
            console.log("selected ", value)
            // this.setState({ typeTitle: value });
            if(value) 

            axios.get(`http://localhost:8099/api/documents/${value}/all`)
            .then(result => {
           
            this.setState({data: result.data.content});
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
    
        handleSearchByUser(value){
            axios.get(`http://localhost:8099/api/documents/${value}/submitted`)
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
        title: 'Data',
        dataIndex: 'submittedDate',
        key: 'submitted_Date',
        sorter: true,
        defaultSortOrder: 'desc',
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
      <h5>Dokumento paieška</h5>
      {/* <button className="btn btn-info" onClick={this.resetSearch}>Reset</button> */}
      <div className="row">
      <div className="col-lg-6">     
      <Search
      placeholder="Įveskite dokumento numerį"
      onSearch={value => this.handleSearch(value)}
    //   style={{ width: 600 }}
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
    <div className="row">
        <div className="col-lg-6">
        <Select        
            style={{ width: '100%' }}
            placeholder="Pasirinkite dokumeto tipą"
            onChange={value=>this.handleSelectChange(value)} 
            onFocus={this.handleFocus}
            required>
                {this.state.types.map((type) => (
                <Select.Option key={type.title} value={type.title}>{type.title}</Select.Option>
                ))}
                </Select>
        </div>
    <div className="col-lg-6">
        <Search
            placeholder="Įveskite vartotojo el.paštą"
            onSearch={value => this.handleSearchByUser(value)}
            //   style={{ width: 600 }}
            enterButton
        /> 
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
    )
  }
}

export default DocumentSearch
