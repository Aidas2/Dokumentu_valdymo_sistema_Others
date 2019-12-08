import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Input, Button , Icon} from 'antd';
import {Link } from "react-router-dom";
import reqwest from 'reqwest';

export class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        pagination: {},
        loading: false,
        page:'',
    
      }
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter, value) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          page: this.state.page,   
          filteredInfo: filters,
          searchText: value
        });
        
        this.fetch({
         results: pagination.pageSize,
         page: pagination.current,
          ...filters,
        });
      }
    
      fetch = (params = {}) => {
          const {page}=this.state
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
          url: 'http://localhost:8099/api/users/pages',
          method: 'get',
          data: {
            size: 10,
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

  render() {

    const columns = [{
        title: 'Vardas',
        dataIndex: 'name',
        width: '20%',
      },
      {
        title: 'Pavardė',
        dataIndex: 'surname',
        // sorter: true,
        width: '20%',
      },
      {
        title: 'El.paštas',
        dataIndex: 'email',
        render: email =><Link to={`/vartotojas/${email}`}>{email}</Link>,
        width: '25%',
      }, 
      {
        title: 'Grupės',
        dataIndex: 'userGroups',
        key: 'groups',
        render: userGroups => (
              <span>
                {userGroups.map(tag => {
                  return  <Link to={`grupe/${tag.name}`}>
                  <Tag color='geekblue' key={tag.name}>{tag.name.toUpperCase()}</Tag></Link>;
                })}
              </span>
            ),
            width: '30%',
          },
      {
        title: '',
        dataIndex: 'email',
        key: 'edit',
        render: email => <Link to={`/redaguoti/vartotojas/${email}`}><Icon type="edit" /></Link>,
        width: '5%',
      }

    ];
     const {pagination, data, page}=this.state
    return (
    <div className="container" id="list_container">
    <div className="container user_document_list">
        <div className="table-operations">
        <h5>Sistemoje registruoti vartotojai</h5>
        </div>
 
    <Table
        style={{width: "100%"}}
        columns={columns}
        rowKey={record => record.email}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        // pagination= {{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20']}}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        scroll={{ y: 360 }}
      />
    </div>
    </div>  
      );

  }
}


export default UsersTable
