import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form } from 'reactstrap';

const headingP = <h3>Welcome Peasant!</h3>;
const actionsP = <h5>Choose the action</h5>;
const style = { margin: '20px', textAlign: 'center' };

export default class UserHome extends React.Component {

    render() {
        return (
            <Form>
                <div style={style}>
                    {headingP}
                    {actionsP}
                    <Link to={"/create-new-document"}>
                        <Button outline color="success">Sukurti dokumenta</Button>{' '}
                    </Link>
                    <Link to={"./Documents/DocumentEdit/DocEdition.js"}>
                        <Button outline color="primary">Taisyti dokumenta</Button>{' '}
                    </Link>
                    <Button outline color="secondary">Trinti dokumenta</Button>{' '}
                    <Button outline color="info">Perziuret visus dokus</Button>{' '}
                    <Button outline color="warning">Perziureti konkretu dokumenta</Button>{' '}
                    <Button outline color="danger">Pateikti dokumenta</Button>
                </div>

                {/*<FormGroup>*/}
                {/*<Label for="exampleEmail">Email</Label>*/}
                {/*<Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" />*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Label for="examplePassword">Password</Label>*/}
                {/*<Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Label for="exampleSelect">Select</Label>*/}
                {/*<Input type="select" name="select" id="exampleSelect">*/}
                {/*<option>1</option>*/}
                {/*<option>2</option>*/}
                {/*<option>3</option>*/}
                {/*<option>4</option>*/}
                {/*<option>5</option>*/}
                {/*</Input>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Label for="exampleSelectMulti">Select Multiple</Label>*/}
                {/*<Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>*/}
                {/*<option>1</option>*/}
                {/*<option>2</option>*/}
                {/*<option>3</option>*/}
                {/*<option>4</option>*/}
                {/*<option>5</option>*/}
                {/*</Input>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Label for="exampleText">Text Area</Label>*/}
                {/*<Input type="textarea" name="text" id="exampleText" />*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*<Label for="exampleFile">File</Label>*/}
                {/*<Input type="file" name="file" id="exampleFile" />*/}
                {/*<FormText color="muted">*/}
                {/*This is some placeholder block-level help text for the above input.*/}
                {/*It's a bit lighter and easily wraps to a new line.*/}
                {/*</FormText>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup tag="fieldset">*/}
                {/*<legend>Radio Buttons</legend>*/}
                {/*<FormGroup check>*/}
                {/*<Label check>*/}
                {/*<Input type="radio" name="radio1" />{' '}*/}
                {/*Option one is this and that—be sure to include why it's great*/}
                {/*</Label>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup check>*/}
                {/*<Label check>*/}
                {/*<Input type="radio" name="radio1" />{' '}*/}
                {/*Option two can be something else and selecting it will deselect option one*/}
                {/*</Label>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup check disabled>*/}
                {/*<Label check>*/}
                {/*<Input type="radio" name="radio1" disabled />{' '}*/}
                {/*Option three is disabled*/}
                {/*</Label>*/}
                {/*</FormGroup>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup check>*/}
                {/*<Label check>*/}
                {/*<Input type="checkbox" />{' '}*/}
                {/*Check me out*/}
                {/*</Label>*/}
                {/*</FormGroup>*/}
                {/*<Button>Submit</Button>*/}
            </Form>
        );
    }
}