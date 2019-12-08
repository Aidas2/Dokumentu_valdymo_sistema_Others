import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;

  const menu = (
    <Menu>
       <SubMenu title="Vartotojai">
        <Menu.Item>
          <Link to='/naujas-vartotojas'>Kurti vartotoją</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/vartotojai'>Peržiūrėti sukurtus vartotojus</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Grupės">
        <Menu.Item>
          <Link to={'/nauja-grupe'}>Kurti vartotojų grupę</Link>
          </Menu.Item>
        <Menu.Item>
          <Link to={'/visos-grupes'}>Vartotojų grupės</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu title="Dokumentų tipai">
        <Menu.Item>
          <Link to={'/naujas-tipas'}>Kurti dokumento tipą</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={'/visi-tipai'}>Dokumentų tipai</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item><Link to={'/visi-dokumentai'}><Icon type="file" /> Peržiūrėti sukurtus dokumentus</Link></Menu.Item>
    </Menu>
  );
  

class AdminSubMenu extends Component {



  render() {
    return (
      <Dropdown overlay={menu}>
       <a className="ant-dropdown-link" href="#">
       Administratoriaus paskyra  <Icon type="down" />
        </a>
      </Dropdown>
      // <div>
      // <nav className="navigation"> Admin
      //   <ul className="mainmenu">
      //     <li><Link to='/naujas-vartotojas'>Kurti vartotoją</Link></li>
      //     <li><Link to='/vartotojai'>Peržiūrėti sukurtus vartotojus</Link></li>
      //     <li><Link to={'/nauja-grupe'}>Kurti vartotojų grupę</Link></li>
      //     <li><Link to={'/visos-grupes'}>Vartotojų grupės</Link></li>
      //     <li><Link to={'/naujas-tipas'}>Kurti dokumento tipą</Link></li>
      //     <li><Link to={'/visi-tipai'}>Dokumentų tipai</Link></li>
      //     <li><Link to={'/visi-dokumentai'}>Peržiūrėti sukurtus dokumentus</Link></li>
      //   </ul>
      // </nav> 
      // </div>
    )
  }
}

export default AdminSubMenu
