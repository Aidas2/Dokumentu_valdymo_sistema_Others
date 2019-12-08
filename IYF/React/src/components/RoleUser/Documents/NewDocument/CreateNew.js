import React from 'react';
//import {Link} from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const headingP = <h3>You again?</h3>;
const headingR = <h5>You are able to write???</h5>;
const style = {margin: '20px', textAlign: 'left'};
const headingStyle = {margin: '20px;', textAlign: 'center'};

export default class CreateNew extends React.Component {
    render() {
        return (
            <Form>
                <div style={headingStyle}>
                    {headingP}
                    {headingR}
                </div>
                <div style={style}>
                <FormGroup row>
                    <Label for="DocTypeSelect" sm={4}>Select Document type... if you are able to read</Label>
                    <Col sm={10}>
                        <Input type="select" name="select" id="docType1" />
                    </Col>
                </FormGroup>
                <FormGroup row>

                    <Label for="docTitle" sm={4}>Give a title to your regrettable paper</Label>
                    <Col sm={10}>
                        <Input type="text" name="docType" id="docType" placeholder="Soap Request" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="description" sm={4}>Your cries are going here... as if someone will read them...</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="description" id="description1" placeholder="Blah-blah-blah" />
                    </Col>
                </FormGroup>

                <FormGroup row>

                    <Label for="adressee" sm={4}>Who do you want to bother?</Label>
                    <Col sm={10}>
                        <Input type="text" name="adressee" id="adressee" placeholder="Your dearest Lord" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="File" sm={4}>Your miserable .pdf file</Label>
                    <Col sm={10}>
                        <Input type="file" name="file1" id="File" />
                        <FormText color="muted">
                            Give me another evidence of your uselessness - make me happy.
                        </FormText>
                    </Col>
                </FormGroup>
                </div>


                <FormGroup check row>
                    <Col sm={{ size: 10 }}>
                        <Button outline color="success" size="lg" block>Create Document or in your case Send a Pigeon</Button>
                    </Col>
                </FormGroup>

            </Form>
        );
    }
}