import React from 'react';
import { Nav, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

export default class NavBarSide extends React.Component {
    constructor(props) {
        super(props);

        this.toggleError = this.toggleError.bind(this);
        this.togglePrice = this.togglePrice.bind(this);
        this.toggleVolume = this.toggleVolume.bind(this);

        this.state = {
            dropdownError: false,
            dropdownPrice: false,
            dropdownVolume: false
        };
    }

    toggleError() {
        this.setState({
            dropdownError: !this.state.dropdownError
        });
    }

    togglePrice() {
        this.setState({
            dropdownPrice: !this.state.dropdownPrice
        });
    }

    toggleVolume() {
        this.setState({
            dropdownVolume: !this.state.dropdownVolume
        });
    }
    render() {
        return (
            <Nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <Dropdown nav isOpen={this.state.dropdownError} toggle={this.toggleError}>
                            <DropdownToggle nav caret>Error</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/highest/error")}>Highest</DropdownItem>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/lowest/error")}>Lowest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown nav isOpen={this.state.dropdownPrice} toggle={this.togglePrice}>
                            <DropdownToggle nav caret>Price</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/highest/price")}>Highest</DropdownItem>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/lowest/price")}>Lowest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown nav isOpen={this.state.dropdownVolume} toggle={this.toggleVolume}>
                            <DropdownToggle nav caret>Volume</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/highest/volume")}>Highest</DropdownItem>
                                <DropdownItem href="#" onClick={() => this.props.clickHandler("/api/lowest/volume")}>Lowest</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </div>
            </Nav>
        );
    }
}