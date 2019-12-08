import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
} from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Doksystema</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          {/* <Nav className="col-md-2 d-none d-md-block bg-light sidebar"> */}
            {/* <div className="sidebar-sticky"> */}
              {/* <ul className="nav flex-column"> */}
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Prisijungti</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/home-admin">AdminPradzia</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/home-user">UserPradzia</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">Vartotojai</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/create-user">Naujas</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/groups">Grupės</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/documents">Dokumentai</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/create-new-document">Naujas dok</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/types">Dokumentų tipai</NavLink>
            </NavItem>
{/* </ul> */}
{/* </div> */}
            {/* <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle nav caret>
                Dropdown
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </Nav>
        </Collapse>
      </Navbar>

      {/* <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/Docs">Dokumentai</NavLink> */}
    </div>
  );
};
}

export default Navigation;