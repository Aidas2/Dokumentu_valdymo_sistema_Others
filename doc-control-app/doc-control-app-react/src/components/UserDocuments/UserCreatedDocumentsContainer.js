import React from "react";
import UserCreatedDocumentsComponent from "./UserCreatedDocumentsComponent";
import axios from "axios";
import { Pagination } from "semantic-ui-react";

//bandymas
// window.onunload = function() {
//   localStorage.clear();
//   return "";
// };

class UserCreatedDocumentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDocs: 0,
      recordsPerPage: 15,
      activePage: 1,
      //tikram kode turės būti tuščias masyvas
      //documents: '',
      //laikina bazikė
      documents: [
        {
          id: "Testas",
          title: "Testas",
          description: "Testas",
          documentTypeTitle: "Testas",
          creationDate: "2019.01.26"
        }
        // {
        //     id: "kodas1s",
        //     title: "Title1s",
        //     description: "Description1s",
        //     documentTypeTitle: "Type1s",
        //     creationDate: "2019.01.26"
        // },
        // {
        //     id: "kodas2s",
        //     title: "Title2s",
        //     description: "Description2s",
        //     documentTypeTitle: "Type2s",
        //     creationDate: "2019.01.27"
        // },
        // {
        //     id: "kodas3s",
        //     title: "Title3s",
        //     description: "Description3s",
        //     documentTypeTitle: "Type3s",
        //     creationDate: "2019.01.28"
        // }
      ],
      loading: "Loading documents. Please wait..."
    };
  }

  getAllDocumentsFromServer = (pageNumber, pageLimit) => {
    axios
      .get("/api/docs/user/created", {
        params: { pageNumber: pageNumber - 1, pageLimit: pageLimit }
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
      this.getAllDocumentsFromServer(activePage, this.state.recordsPerPage);
    });
  };

  handleDelete = id => {
    //let currentUser = JSON.parse(localStorage.getItem("user")).username;
    //let resourcePath =
    //  "/api/users/" + currentUser + "/docs/created";
    console.log("Atėjau į handleDelete metodą");
    //const position = this.props.match.params.documentId;
    console.log("Dokumento ID yra:");
    console.log(id);

    axios.delete("/api/docs/" + id).then(response => {

      this.getAllDocumentsFromServer(
        this.state.activePage,
        this.state.recordsPerPage
      );
    });
  };

  handleSubmit = id => {
    //let currentUser = JSON.parse(localStorage.getItem("user")).username;
    //let resourcePath =
    //  "/api/users/" + currentUser + "/docs/created";
    //console.log("Atėjau į handleSubmit metodą");
    //const position = this.props.match.params.documentId;
    console.log("Dokumento ID yra:");
    console.log(id);
    axios.put("/api/docs/" + id + "/submit").then(response => {
      this.getAllDocumentsFromServer(
        this.state.activePage,
        this.state.recordsPerPage
      );
    });
  };

  componentDidMount() {
    // Not implemented in backend
    this.getAllDocumentsFromServer(
      this.state.activePage,
      this.state.recordsPerPage
    );

    //let currentUser = JSON.parse(localStorage.getItem('user')).username;
    //let resourcePath = '/api/users/' + currentUser + '/docs/created';
    // let resourcePath = "/api/users/docs/created";
    // axios
    //   .get(resourcePath)
    //   .then(response => {
    //     this.setState({ documents: response.data });
    //     console.log("Koks gautas dokumentų sąrašas iš 'Sukurtų'?");
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
          <UserCreatedDocumentsComponent
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
            creationDate={document.creationDate.substring(0, 10)}
            handleDelete={this.handleDelete}
            handleSubmit={this.handleSubmit}
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
                    <h6 className="text-uppercase mb-0">Sukurti dokumentai</h6>
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
                              <th>Sukūrimo data</th>
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
        //     <div className="row">
        //         <div className="col-1">
        //             <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
        //         </div>
        //     </div>
        //     <div className="row">
        //         <div className="col-12">
        //             <table className="table table-striped">
        //                 <thead className="thead-inverse">
        //                     <tr>
        //                         <th>Numeris</th>
        //                         <th>Pavadinimas</th>
        //                         <th>Aprašymas</th>
        //                         <th>Tipas</th>
        //                         <th>Sukūrimo data</th>
        //                         <th>Operacijos</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>{documentCard}</tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
      );

      // <div className="container-fluid">
      //     <div className="row">
      //         <div className="col-1">
      //             <a href="/admin/newDocument" className="btn btn-info" role="button" aria-pressed="true">Naujas dokumentas</a>
      //         </div>
      //     </div>
      //     <div className="row">
      //         <div className="col-2">
      //             <h5>Numeris</h5>
      //         </div>
      //         <div className="col-2">
      //             <h5>Pavadinimas</h5>
      //         </div>
      //         <div className="col-2">
      //             <h5>Aprašymas</h5>
      //         </div>
      //         <div className="col-1">
      //             <h5>Tipas</h5>
      //         </div>
      //         <div className="col-1">
      //             <h5>Sukūrimo data</h5>
      //         </div>
      //         <div className="col-2">
      //             <h5>Operacijos</h5>
      //         </div>
      //     </div>
      //     <div className="row">{documentCard}
      //     </div>
      // </div>);
    }
    return this.state.loading;
  }
}

export default UserCreatedDocumentsContainer;
