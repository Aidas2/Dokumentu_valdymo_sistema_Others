import React, { Component } from 'react';
import DocumentsList from "./ElementsOfDashBoard/DocumentsList";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import DashboardNavigation from './ElementsOfDashBoard/DashboardNavigation';

class ToApproveDashboard extends Component {
    state = {
        nameOfWindow: 'default',
        userDocuments: [],
        searchField: '',

        pageCount: 3,
        perPage: 7,
        offset: 0,
    }


    componentDidMount = () => {
        this.getDocumentsToApprove();
    }

    handleSearch = () => {

        if (this.state.searchField.length === 0) {
            this.setState({ userDocuments: [] })
            this.setState({ offset: 0 }, () => {
                this.getDocumentsToApprove();
            })

        } else {
            this.setState({ userDocuments: [] })
            this.setState({ offset: 0 }, () => {
                this.getFilteredDocumentsToApprove();

            })

        }
    }

    getDocumentsToApprove = () => {
        axios({
            method: 'get',
            url: '/api/users/user/get-documents-to-approve',

            params: {
                page: this.state.offset,
                size:
                    this.state.perPage
            }
            ,
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8'
            },
        })
            .then(response => {

                let userDocuments = response.data.content.map(document => {
                    return ({
                        ...document,
                        postedDate: new Date(document.postedDate),
                        approvedDate: new Date(document.approvalDate),
                        rejectedDate: new Date(document.rejectedDate)
                    })
                });

                this.setState({ userDocuments: userDocuments });
                this.setState({
                    pageCount:
                        Math.ceil(response.data.totalElements
                            / this.state.perPage)
                })

            })
            .catch(error => {
                console.log("Klaida is getDocumentsToApprove metodo - " + error.message)
            })
    }

    getFilteredDocumentsToApprove = () => {
        axios({
            method: 'get',
            url: '/api/users/user/get-documents-to-approve-filtered',
            params: {
                page: this.state.offset,
                size: this.state.perPage,
                criteria: this.state.searchField
            },
            headers: { 'Content-Type': 'application/json;charset=utf-8' }

        })
            .then(response => {

                let userDocuments = response.data.content.map(document => {
                    return ({
                        ...document,
                        postedDate: new Date(document.postedDate),
                        approvedDate: new Date(document.approvalDate),
                        rejectedDate: new Date(document.rejectedDate)
                    })
                });

                this.setState({ userDocuments: userDocuments });
                this.setState({
                    pageCount:
                        Math.ceil(response.data.totalElements
                            / this.state.perPage)
                })

            })
            .catch(error => {
                console.log("Klaida is getDocumentsToApproveFiltered metodo - " + error.message)
            })

    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected);

        if (this.state.searchField.length === 0) {
            this.setState({ offset: offset }, () => {
                this.getDocumentsToApprove();

            })

        } else {
            this.setState({ offset: offset }, () => {
                this.getFilteredDocumentsToApprove();
            })

        }
    }

    handleChangeInput = (event) => this.setState({ [event.target.name]: event.target.value });

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ [event.target.name]: event.target.value });
            this.handleSearch();
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className='container'>
                    <div className="row mt-2">
                        <DashboardNavigation />

                        <div className='col-lg-12 container mt-3 p-3 mb-5 bg-white rounded mainelement borderMain'>

                            <div className="form-group col-md-8 my-3">
                                <label>Dokumento tvirtinimui paieška</label>
                                <div className="row">
                                    <div className="col-md-10 input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1" role="img"
                                                aria-label="Search">🔎</span>
                                        </div>
                                        <input className="form-control mr-sm-2" type="search"
                                            placeholder="Įveskite dokumento tipą arba autoriaus naudotojo vardą"
                                            aria-label="Search" aria-describedby="basic-addon1"

                                            value={this.state.searchField}
                                            name="searchField"
                                            onChange={this.handleChangeInput}
                                            onKeyPress={this.handleKeyPress} />
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn button2 my-2 my-sm-0 button1" type="submit"
                                            onClick={this.handleSearch}>Ieškoti
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <DocumentsList list={this.state.userDocuments} />


                        </div>
                    </div>

                    <div className='container mt-5'>
                        <div className="row">
                            <div className="col-lg-12 my-auto center-block text-center">
                                <ReactPaginate
                                    forcePage={this.state.offset}
                                    previousLabel={'ankstesnis puslapis'}
                                    nextLabel={'kitas puslapis'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={3}
                                    pageRangeDisplayed={7}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pagesPagination'}
                                    activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


export default ToApproveDashboard;