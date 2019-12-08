import React, { Component } from 'react';
// import './App.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminSubMenu from './layout/AdminSubMenu';

class Navbar extends Component {
  constructor(props) {
    super(props);   
    this.state = {
      current: '/pagrindinis',
    }
}
 
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    if(e.key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    return (
      <Menu id="top-navigation"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="/pagrindinis">
          <Link to="/pagrindinis">
              <Icon style={{ fontSize: '16px' }} type="home" className="nav-icon" /> Pagrindinis
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
              <Icon style={{ fontSize: '16px'}} type="logout" /> Atsijungti
        </Menu.Item>
        <Menu.Item id="icon-info">
          <Link to="/informacija">
              <Icon style={{ fontSize: '16px'}} type="info-circle" />
          </Link>
        </Menu.Item>
        {/* {this.props.currentUser.admin === true ? <AdminSubMenu/> : ''} */}
      </Menu>
    );
  }
  
}

export default Navbar;