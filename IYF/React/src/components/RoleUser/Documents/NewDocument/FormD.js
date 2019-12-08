import React from 'react';
import {
    Form, FormGroup, Input, FormText, Container, Button
} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import FileUpl from './FileUpl';
// import axios from 'axios';
import TypesListGet from './../Types/TypesListGet';


class FormD extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <div>
                <Container>
                    <br></br>
                    <Jumbotron>
                        <h3><b>Dokumento kūrimo forma</b></h3>
                        <p className="lead"><i>Užpildykite visus laukus</i></p>

                        <Form>
                            <FormGroup>
                                <TypesListGet />
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        Dokumento Tipas
        </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Sąskaita</DropdownItem>
                                        <DropdownItem>Atostogų prašymas</DropdownItem>
                                        <DropdownItem>Algos pakelimo prašymas</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="title" id="title" placeholder="Dokumento pavadinimas" />
                                <FormText>Nurodykite tikslų dokumento pavadinimą</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Input type="textarea" name="describtion" id="describtion" placeholder="Aprašymas"  />
                                <FormText>Trumpas dokumento aprašymas</FormText>
                            </FormGroup>
                            <br></br>
                            <FileUpl />
                            <Button color="success">Pridėti</Button>{' '}
                        </Form>
                        
                    </Jumbotron>
                </Container>
            </div>
        );
    };
}

export default FormD;