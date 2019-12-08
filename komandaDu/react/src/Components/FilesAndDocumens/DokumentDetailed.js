import React, { Component } from 'react';
import FileSaver from "file-saver";
import axios from 'axios';
import DateWithTime from "../UI/DateWithTime";
import "../../App.css";
import { showErrorObject } from "../UI/MainModalError";

class AugisDokumentas extends Component {
    state = {

        type: '',
        description: '',
        title: '',
        attachedFileIdentifier: '',
        attachedFileName: '',
        userIdentifier: '',
        documentState: "Laukiama patvirtinimo",
        rejectedReason: '',
        documentInfo: {}
    };


    componentWillMount() {
        this.getDocumentInformation();
    }

    componentDidMount() {

    }

    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    getDocumentInformation = () => {

        axios.get('/api/documents', {
            params: {
                documentIdentifier: this.props.match.params.id
            }
        })
            .then(result => {
                let documentInfo = result.data;

                documentInfo.postedDate = new Date(documentInfo.postedDate);
                documentInfo.approvalDate = new Date(documentInfo.approvalDate);
                documentInfo.rejectedDate = new Date(documentInfo.rejectedDate);

                this.setState({ documentInfo: documentInfo });

            })
            .catch(error => {
                console.log("Atsakymas is getDocumentInformation - " + error);
                showErrorObject(error);
            })

    }


    downloadOneFile = (fileIdentifier) => {

        axios.get('/api/files/download/' + fileIdentifier)
            .then(response => {
                FileSaver.SaveAs(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }



    submitDocument = (props) => {
        let docID = this.props.match.params.id;
        axios.post("/api/documents/" + docID + "/submit")
            .then(response => {
                this.getDocumentInformation();

            })
            .catch(error => {
                showErrorObject(error);
            })
    }

    approveDocument = (props) => {
        let docID = this.props.match.params.id;
        console.log("Dokumento Identifier - " + this.props.match.params.id);
        axios.post("/api/documents/" + docID + "/approve")
            .then(response => {
                this.getDocumentInformation();
            })
            .catch(error => {
                window.alert("Klaida is approveDocument - " + error)
                console.log("Klaida is approveDocument - " + error.message);
            })
    }

    rejectDocument = (props) => {

        let reason = window.prompt(" Įveskite atmetimo priežastį");


        let docID = this.state.documentInfo.documentIdentifier;
        axios.post("/api/documents/" + docID + "/reject", null, {
            params: {
                rejectedReason: reason
            }
        })
            .then(response => {
                this.getDocumentInformation();
            })
            .catch(error => {
                console.log("Klaida is rejectDocument - " + error.message);
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <div className='p-3 mb-5 bg-white rounded borderMain' align="center">
                        <table className='table table-bordered col-md-12 table-hover'>
                            <thead>
                                <tr>
                                    <th colSpan='2' className="text-center table-secondary">DOKUMENTO DETALĖS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Dokumento pavadinimas</th>
                                    <td>{this.state.documentInfo.title}</td>
                                </tr>
                                <tr>
                                    <th>Dokumento tipas</th>
                                    <td>{this.state.documentInfo.type}</td>
                                </tr>
                                <tr>
                                    <th>Aprašymas</th>
                                    <td>{this.state.documentInfo.description}</td>
                                </tr>


                                <tr>
                                    <th>Dokumento autorius</th>
                                    <td>{this.state.documentInfo.author}</td>
                                </tr>

                                <tr>
                                    <th>Pateikimo data</th>
                                    <td><DateWithTime date={this.state.documentInfo.postedDate} /></td>
                                </tr>
                                {this.state.documentInfo.documentState === "APPROVED" ?
                                    <tr>
                                        <th>Patvirtinimo data</th>
                                        <td><DateWithTime date={this.state.documentInfo.approvalDate} /></td>
                                    </tr> : null}

                                {this.state.documentInfo.documentState === "REJECTED" ?
                                    <tr>
                                        <th>Atmetimo data</th>
                                        <td><DateWithTime date={this.state.documentInfo.rejectedDate} /></td>
                                    </tr> : null}

                                {this.state.documentInfo.documentState === "REJECTED" ?
                                    <tr>
                                        <th>Atmetimo priežastis</th>
                                        <td>{this.state.documentInfo.rejectedReason}</td>
                                    </tr> : null}

                                <tr>
                                    <th>Tvirtintojas</th>
                                    <td>{this.state.documentInfo.approver}</td>
                                </tr>

                                <tr>
                                    <th>Failo pavadinimas</th>
                                    <td>
                                        <ul>
                                            {this.state.documentInfo.filesAttachedToDocument ?
                                                this.state.documentInfo.filesAttachedToDocument.map(file => <li
                                                    key={file.identifier}>
                                                    <a href={'http://localhost:8181/api/files/download/' + file.identifier}
                                                        target='_blank' rel="noopener noreferrer">{file.fileName}</a>
                                                </li>)
                                                : null
                                            }
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Dokumento statusas</th>

                                    {this.state.documentInfo.documentState === 'CREATED' ? <td>Sukurtas</td> : null}
                                    {this.state.documentInfo.documentState === 'SUBMITTED' ? <td>Pateiktas tvirtinimui</td> : null}
                                    {this.state.documentInfo.documentState === 'APPROVED' ? <td>Patvirtintas</td> : null}
                                    {this.state.documentInfo.documentState === 'REJECTED' ? <td>Atmestas</td> : null}
                                </tr>

                            </tbody>
                        </table>

                        {this.state.documentInfo.documentState === 'CREATED' && this.props.user.username === this.state.documentInfo.author ?
                            <button className="btn mr-4 button1" onClick={this.submitDocument}>Pateikti</button>
                            : ''}


                        {this.state.documentInfo.documentState === 'SUBMITTED' && this.props.user.username !== this.state.documentInfo.author ?
                            <React.Fragment>
                                <button className="btn button1 mr-5"
                                    onClick={this.approveDocument}

                                >Patvirtinti
                                </button>
                                <button className="btn btn-danger buttonReject mr-5" onClick={this.rejectDocument}>Atmesti
                                </button>
                            </React.Fragment>
                            : ''}


                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default AugisDokumentas;