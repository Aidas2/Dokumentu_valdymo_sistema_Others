import React from "react";
import ReviewDocumentsComponent from "./ReviewDocumentsComponent";
import SearchField from "./SearchField";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "semantic-ui-react";
import Loading from "../Utilities/Loading";

class ReviewDocumentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateDelay = -999;
    this.state = {
      loaded: true,
      totalDocs: 0,
      recordsPerPage: 15,
      activePage: 1,
      searchField: "",
      documentId: "", //naudojamas tik vienu atveju, kai daromas REJECT
      documents: [
        // {
        //   id: "Kodas1r",
        //   author: {},
        //   title: "Title1r",
        //   description: "Description1r",
        //   documentTypeTitle: "Type1r",
        //   submissionDate: "2019.01.26",
        //   rejectionReason: ""
        // }
      ],
      loading: "Kraunami dokumentai. Prašome palaukti..."
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
    let timeStart = new Date();
    clearInterval(this.updateDelay);
    this.timer = setTimeout(() => this.setState({ loaded: false }), 1000);
    axios
      .get("/api/docs/review", {
        //wrong path
        params: {
          searchFor: searchFor,
          pageNumber: pageNumber - 1,
          pageLimit: pageLimit
        }
      })
      .then(res => {
        let timeStop = new Date();
        let timeDiff = timeStop - timeStart; //in ms
        timeDiff /= 1000;
        console.log("Time took to get results", timeDiff);
        this.setState({ loaded: true });
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = 0;
        }
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

  handleChangeOfRejectionReason = event => {
    this.setState({ rejectionReason: event.target.value });
    //console.log("Atmetimo priežastis yra " + this.state.rejectionReason);
  };

  handleReject = id => {
    console.log("Atėjau į handleReject");
    //Darau sweet Alert
    Swal.fire({
      title: "Įveskite atmetimo priežastį",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Patvirtinti",
      cancelButtonText: "Atšaukti"
    }).then(
      function(result) {
        // result.value will containt the input value
        // const swalWithBootstrapButtons = Swal.mixin({
        //     confirmButtonClass: 'btn btn-success',
        //     cancelButtonClass: 'btn btn-danger',
        //     buttonsStyling: false,
        //   })

        if (result.value) {
          let docInfo = {
            documentState: "REJECTED",
            rejectionReason: result.value,
            reviewerUsername: JSON.parse(localStorage.getItem("user")).username
          };
          console.log("docInfo yra " + docInfo.rejectionReason);
          console.log("Spausdinu id " + id);
          this.setState({ documentId: "aaa" });
          axios.post("/api/docs/review/" + id, docInfo).then(response => {
            axios
              .get("/api/docs/review", {
                //wrong path
                params: {
                  searchFor: "",
                  pageNumber: this.state.activePage - 1,
                  pageLimit: this.state.recordsPerPage
                }
              })
              .then(res => {
                console.log(res.data);
                this.setState({
                  documents: res.data.documentList,
                  totalDocs: res.data.totalPages
                });
              })
              .catch(err => {
                console.log(err);
              });
          });
        } else {
          // swalWithBootstrapButtons.fire(
          //     'Cancelled',
          //     'Your imaginary file is safe :)',
          //     'error'
          //   )
        }
      }.bind(this)
    );

    // MyAction: function(){
    //     this.doFetch().then(function(response){
    //         this.setState({
    //             the_message: response.message
    //         });
    //     }.bind(this))
    // },

    // let docInfo = {
    //     documentState: "REJECTED",
    //     rejectionReason: this.state.rejectionReason,
    //     reviewerUsername: JSON.parse(localStorage.getItem('user')).username
    // }
    // console.log("docInfo yra " + docInfo.documentState);
    // axios.post("/api/docs/review/" + this.state.documentId, docInfo)
    //     .then((response) => {
    //         axios.get('/api/docs/review')
    //             .then((response) => {
    //                 this.setState({ documents: response.data });

    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     });
  };

  handleAccept = id => {
    console.log("Atėjau į Accept");
    //let currentUser = JSON.parse(localStorage.getItem('user')).username;
    let docInfo = {
      documentState: "ACCEPTED",
      rejectionReason: "",
      reviewerUsername: JSON.parse(localStorage.getItem("user")).username
    };
    console.log("docInfo yra " + docInfo.documentState);
    axios.post("/api/docs/review/" + id, docInfo).then(response => {
      axios
        .get("/api/docs/review", {
          //wrong path
          params: {
            searchFor: this.searchField,
            pageNumber: this.state.activePage - 1,
            pageLimit: this.state.recordsPerPage
          }
        })
        .then(res => {
          console.log(res.data);
          this.setState({
            documents: res.data.documentList,
            totalDocs: res.data.totalPages
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  componentDidMount = () => {
    this.getAllDocumentsFromServer(
      this.state.activePage,
      this.state.recordsPerPage,
      this.state.searchField
    );

    // axios
    //   .get("/api/docs/review")
    //   .then(response => {
    //     this.setState({ documents: response.data });
    //     console.log("Koks atiduodamas dokumentų sąrašas?");
    //     console.log(this.state.documents);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
    const { totalDocs, recordsPerPage, activePage } = this.state;
    let pageCount = Math.ceil(totalDocs / recordsPerPage);

    const documentCard = this.state.documents.map((document, index) => {
      return (
        <ReviewDocumentsComponent
          key={index}
          documentId={
            index + 1 + this.state.recordsPerPage * (this.state.activePage - 1)
          }
          id={document.id}
          author={document.authorFirstname + " " + document.authorLastname}
          title={document.title}
          description={document.description}
          type={document.documentTypeTitle}
          submissionDate={
            document.submissionDate
              ? document.submissionDate.substring(0, 10)
              : ""
          }
          handleAccept={this.handleAccept}
          handleReject={this.handleReject}
        />
      );
    });

    let show = this.state.loaded ? (
      <div className="row">
        <div className="col-12">
          <table className="ui celled table" style={{ width: "100%" }}>
            <thead className="thead-inverse">
              <tr>
                <th>Numeris</th>
                <th>Autorius</th>
                <th>Pavadinimas</th>
                <th>Aprašymas</th>
                <th>Tipas</th>
                <th>Pateikimo data</th>
                <th>Operacijos</th>
              </tr>
            </thead>
            <tbody>{documentCard}</tbody>
          </table>
        </div>
      </div>
    ) : (
      <Loading />
    );

    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="text-uppercase mb-0">Peržiūrimi dokumentai</h6>
                </div>
                <div className="d-flex flex-row py-4 px-3 align-items-center">
                  <Pagination
                    activePage={activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={pageCount}
                  />
                </div>
                <div className="card-body">
                  <SearchField
                    searchField={this.state.searchField}
                    handleChangeOfSearchField={this.handleChangeOfSearchField}
                  />
                  {show}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      // <div className="container-fluid">
      //     <div className="row">
      //         <div className="col-2">
      //             <h5>Autorius</h5>
      //         </div>
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
      //             <h5>Pateikimo data</h5>
      //         </div>
      //         <div className="col-1">
      //             <h5>Operacijos</h5>
      //         </div>
      //     </div>
      //     <div className="row">{documentCard}
      //     </div>
      //     {/* <RejectReasonPopUp show={this.state.isOpen}
      //     onClose={this.closePopup}
      //     handleChangeOfRejectionReason={this.handleChangeOfRejectionReason}
      //     closePopupAcceptReject={this.closePopupAcceptReject}
      //     closePopupCancelReject={this.closePopupCancelReject}
      // >
      // </RejectReasonPopUp> */}
      // </div>
    );
  }
}

export default ReviewDocumentsContainer;
