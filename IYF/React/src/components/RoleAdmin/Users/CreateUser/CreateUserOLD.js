import React from 'react';
import {
    Form, FormGroup, Input, FormText, Container, Button
} from 'reactstrap';
import { Jumbotron } from 'reactstrap';
// import axios from 'axios';
import { Link } from "react-router-dom";

class CreateUser extends React.Component {
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
                        <h3><b>Vartotojo kūrimo forma</b></h3>
                        <p className="lead"><i>Užpildykite visus laukus</i></p>

                        <Form>
                            <FormGroup>
                                <Input type="text" name="first_name" id="first_name" placeholder="Vardas"
                                    onChange={(event, newValue) => this.setState({ first_name: newValue })} />
                                <FormText>Nurodykite asmens vardą</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="last_name" id="last_name" placeholder="Pavardė"
                                    onChange={(event, newValue) => this.setState({ last_name: newValue })} />
                                <FormText>Nurodykite asmens pavardę</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="El. paštas"
                                    onChange={(event, newValue) => this.setState({ email: newValue })} />
                                <FormText>Nurodykite elektroninį paštą</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="********"
                                    onChange={(event, newValue) => this.setState({ password: newValue })} />
                                <FormText>Nurodykite asmens slaptažodį</FormText>
                            </FormGroup>
                            <br></br>
                            <Button primarycolor="primary">Pridėti</Button>{' '}
                            <Link to={"/users"}>
                                <Button color="primary">Grįžti</Button>{' '}
                            </Link>
                        </Form>

                    </Jumbotron>
                </Container>
            </div>
        );
    };
}

export default CreateUser;