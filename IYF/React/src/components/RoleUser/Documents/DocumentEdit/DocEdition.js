import React from 'react';
//import {Link} from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const headingP = <h3>I knew you are illiterate!</h3>;
const headingR = <h5>Fix it, but make it fast!</h5>;
const style = {margin: '20px', textAlign: 'left'};
const headingStyle = {margin: '20px;', textAlign: 'center'};

export default class DocEdition extends React.Component {
    render() {
        return (
            <Form>
                <div style={headingStyle}>
                    {headingP}
                    {headingR}
                </div>
                <div style={style}>
                    <FormGroup>
                        <Label for="docId">Number</Label>
                        <Input
                            type="number"
                            name="docId"
                            id="docId"
                            placeholder="Enter your messed up document id or just number..."
                        />
                    </FormGroup>
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
                        <Button outline color="primary" size="lg" block>Edit your mess, I don't think you have another Pigeon</Button>
                    </Col>
                </FormGroup>

            </Form>
        );
    }
}