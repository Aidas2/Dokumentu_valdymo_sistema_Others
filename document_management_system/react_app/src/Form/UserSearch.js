import React, { Component } from 'react';
import axios from 'axios';
import { Input, Table, Tag, Button, Icon, notification } from 'antd';
import {Link} from 'react-router-dom';
import reqwest from 'reqwest';

const Search = Input.Search;

export class UserSearch extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
          result: {},
          data: [],
          pagination: {},
          page:''

        }; 
    }
    fetch = (params = {}) => {
        const {page}=this.state
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: 'http://localhost:8099/api/users/findByEmailOrSurname',
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
        value.length !== 0 && this.fetch(value)
        
        //  console.log("search value ", value)
        //  axios.get(`http://localhost:8099/api/users/findUsers/${value}`)
        //   .then(result => {
        //   console.log("search url", result)
        //   this.setState({result: result.data})
        //   if(result.data.length === 0){
        //     return notification.error({
        //       message: 'Vartotojas tokiu el.pašto adresu sistemoje nerastas. Bandykite dar kartą.',
        //   }); 
        //     }
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
          
    }

  render() {
    const columns = [{
        title: 'Vardas',
        dataIndex: 'name' || "no records found",
        width: '15%',
      },
      {
        title: 'Pavardė',
        dataIndex: 'surname' || "no records found",
        width: '15%',
      },
      {
        title: 'El.paštas',
        dataIndex: 'email' || "no records found",
        render: email =><Link to={`/vartotojas/${email}`}>{email}</Link>,
        width: '20%',
      },
  {
    title: '',
    dataIndex: 'email' || "no records found",
    key: 'edit',
    render: email => <Link to={`/redaguoti/vartotojas/${email}`}><Icon type="edit" /></Link>,
    width: '5%',
  } 
    ];
      
    const {result, data} = this.state
    return (
      <div className="container" id="admin-search-form">
      <h5>Vartotojo paieška</h5>
      <Search
      placeholder="Įveskite vartotojo el.pašto adresą arba pavardę"
      onSearch={value => this.handleSearch(value)}
    //   style={{ width: 400 }}
      enterButton
      /> 
        <br></br><br></br>   
        <Table dataSource={data} columns={columns} rowKey={record => record.email} pagination={this.state.pagination} scroll={{ y: 200 }}
        locale={{ emptyText: 'Duomenys negauti, prašome įvesti paieškos raktažodį' }}
        // pagination={false}
        /> 
      </div>
    )
  }
}

export default UserSearch
