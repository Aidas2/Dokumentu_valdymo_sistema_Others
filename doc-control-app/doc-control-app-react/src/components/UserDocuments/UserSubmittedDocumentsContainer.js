import React from "react";
import UserSubmittedDocumentsComponent from "./UserSubmittedDocumentsComponent";
import SearchField from "../ReviewDocuments/SearchField";
import axios from "axios";
import { Pagination } from "semantic-ui-react";

class UserSubmittedDocumentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateDelay = -999;
    this.state = {
      totalDocs: 0,
      recordsPerPage: 15,
      activePage: 1,
      searchField: "",
      documents: [
        {
          id: "Testas",
          title: "Testas",
          description: "Testas",
          documentTypeTitle: "Testas",
          documentState: "Testas",
          submissionDate: "2019.01.26"
        }
      ],
      loading: "Kraunami duomenys. Prašome palaukti."
    };
  }

  handleChangeOfSearchField = event => {
    this.setState({ searchField: event.target.value });
    this.setState({ activePage: 1 });
    clearInterval(this.updateDelay);
    this.updateDelay = setInterval(
      () =>
        this.getAllDocumentsFromServer(
          this.state.activePage,
          this.state.recordsPerPage,
          this.state.searchField
        ),
      1000
    );
  };

  getAllDocumentsFromServer = (pageNumber, pageLimit, searchFor) => {
    clearInterval(this.updateDelay);
    this.timer = setTimeout(() => this.setState({ loaded: false }), 1000);
    axios
      .get("/api/docs/user/submitted", {
        params: {
          searchFor: searchFor,
          pageNumber: pageNumber - 1,
          pageLimit: pageLimit
        }
      })
      .then(res => {
        this.setState({
          documents: res.data.documentList,
          totalDocs: res.data.totalElements
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage }, () => {
      this.getAllDocumentsFromServer(
        activePage,
        this.state.recordsPerPage,
        this.state.searchField
      );
    });
  };

  handleZipDownload = event => {
    let currentUser = JSON.parse(localStorage.getItem("user")).username;
    //api/docs/{username}/download/all
    axios({
      url: "/api/docs/" + currentUser + "/download/all",
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      var filename = this.extractFileName(
        response.headers["content-disposition"]
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  extractFileName = contentDispositionValue => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  componentDidMount() {
    // Not implemented in backend
    this.getAllDocumentsFromServer(
      this.state.activePage,
      this.state.recordsPerPage,
      this.state.searchField
    );

    //let currentUser = JSON.parse(localStorage.getItem('user')).username;
    //let resourcePath = '/api/users/' + currentUser + '/docs/submitted';
    // let resourcePath = "/api/users/docs/submitted";
    // axios
    //   .get(resourcePath)
    //   .then(response => {
    //     this.setState({ documents: response.data });
    //     console.log("Koks atiduodamas dokumentų sąrašas?");
    //     console.log(this.state.documents);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    const { totalDocs, recordsPerPage, activePage } = this.state;
    let pageCount = Math.ceil(totalDocs / recordsPerPage);
    if (this.state.documents) {
      const documentCard = this.state.documents.map((document, index) => {
        return (
          <UserSubmittedDocumentsComponent
            key={index}
            documentId={
              index +
              1 +
              this.state.recordsPerPage * (this.state.activePage - 1)
            }
            id={document.id}
            title={document.title}
            description={document.description}
            type={document.documentTypeTitle}
            //sena versija su agliškomis būsenomis
            // state={
            //   document.documentState
            //     .toLowerCase()
            //     .charAt(0)
            //     .toUpperCase() + document.documentState.toLowerCase().slice(1)
            // }
            state={
              document.documentState === "SUBMITTED"
                ? "Pateiktas"
                : document.documentState === "ACCEPTED"
                ? "Priimtas"
                : "Atmestas"
            }
            submissionDate={
              document.submissionDate
                ? document.submissionDate.substring(0, 10)
                : ""
            }
          />
        );
      });
      return (
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="text-uppercase mb-0">Pateikti dokumentai</h6>
                  </div>
                  <div className="d-flex flex-row py-4 px-3 align-items-center">
                    <Pagination
                      activePage={activePage}
                      onPageChange={this.handlePaginationChange}
                      totalPages={pageCount}
                    />
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <SearchField
                          searchField={this.state.searchField}
                          handleChangeOfSearchField={
                            this.handleChangeOfSearchField
                          }
                        />
                        <table
                          className="ui celled table"
                          style={{ width: "100%" }}
                        >
                          <thead className="thead-inverse">
                            <tr>
                              <th>Numeris</th>
                              <th>Pavadinimas</th>
                              <th>Aprašymas</th>
                              <th>Tipas</th>
                              <th>Būsena</th>
                              <th>Pateikimo data</th>
                              <th>Operacijos</th>
                            </tr>
                          </thead>
                          <tbody>{documentCard}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        // <div className="container-fluid">
        //   <div className="row">
        //     <div className="col-1">
        //       <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
        //     </div>
        //   </div>
        //   <div className="row">
        //     <div className="col-12">
        //       <table className="table table-striped">
        //         <thead className="thead-inverse">
        //           <tr>
        //             <th>Numeris</th>
        //             <th>Pavadinimas</th>
        //             <th>Aprašymas</th>
        //             <th>Tipas</th>
        //             <th>Būsena</th>
        //             <th>Pateikimo data</th>
        //             <th>Operacijos</th>
        //           </tr>
        //         </thead>
        //         <tbody>{documentCard}</tbody>
        //       </table>
        //     </div>
        //   </div>
        // </div>

        // <div className="container-fluid">
        //   <div className="row">
        //     <div className="col-4">
        //       <Link to={"/admin/newDocument"} className="btn btn-info" type="button"> Naujas dokumentas </Link> &nbsp;
        //       {/* <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a> &nbsp; */}
        //       <button className="btn btn-info" onClick={this.handleZipDownload}>Atsiusiųsti dokumentų ZIP'ą</button>
        //     </div>
        //   </div>
        //   <div className="row">
        //     <div className="col-2">
        //       <h5>Numeris</h5>
        //     </div>
        //     <div className="col-2">
        //       <h5>Pavadinimas</h5>
        //     </div>
        //     <div className="col-2">
        //       <h5>Aprašymas</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Tipas</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Būsena</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Pateikimo data</h5>
        //     </div>
        //     <div className="col-1">
        //       <h5>Operacijos</h5>
        //     </div>
        //   </div>
        //   <div className="row">{documentCard}</div>
        // </div>
      );
    }
    return this.state.loading;
  }
}

export default UserSubmittedDocumentsContainer;
