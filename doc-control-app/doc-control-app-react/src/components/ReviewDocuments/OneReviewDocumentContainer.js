import React from "react";
import OneReviewDocumentComponent from "./OneReviewDocumentComponent";
import axios from "axios";
// import RejectReasonPopUp from "./RejectReasonPopUp";

import Swal from "sweetalert2";

class OneReviewDocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: "kodas1r",
      author: "vardas ir pavardė",
      title: "Title1r",
      description: "Description1r",
      documentTypeTitle: "Type1r",
      documentState: "State1r",
      submissionDate: "2019.01.26",
      rejectionReason: "",
      path: "",
      paths: null,
      prefix: "",
      fileInfo: new Map()
    };
  }
  fileDownloadHandler = event => {
    console.log(event.target);
    axios({
      url: "/api/docs/" + this.state.id + "/" + event.target.id + "/download", //doc id
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

  handleChangeOfRejectionReason = event => {
    this.setState({ rejectionReason: event.target.value });
    //console.log("Atmetimo priežastis yra " + this.state.rejectionReason);
  };

  handleReject = id => {
    console.log("Atėjau į handleReject");
    console.log("RejectionReason yra " + this.state.rejectionReason);

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
              .get("/api/docs/review")
              .then(response => {
                this.setState({ documents: response.data });
              })
              .then(response => {
                this.props.history.push(`/reviewDocuments`);
              })
              .catch(error => {
                console.log("KLAIDA BANDANT ATMESTI" + error);
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

    //SENAS KODAS
    // let docInfo = {
    //     documentState: "REJECTED",
    //     rejectionReason: this.state.rejectionReason,
    //     reviewerUsername: JSON.parse(localStorage.getItem('user')).username
    // }
    // console.log("docInfo yra " + docInfo.documentState);
    // axios.post("/api/docs/review/" + this.state.id, docInfo)
    //     .then((response) => {
    //         axios.get('/api/docs/review')
    //             .then((response) => {
    //                 this.setState({ documents: response.data });
    //             })
    //             .then((response) => {
    //                 this.props.history.push(`/reviewDocuments`);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     });
  };

  handleAccept = () => {
    console.log("Atėjau į Accept vieno dokumento peržiūroje");
    //let currentUser = JSON.parse(localStorage.getItem('user')).username;
    let docInfo = {
      documentState: "ACCEPTED",
      rejectionReason: "",
      reviewerUsername: JSON.parse(localStorage.getItem("user")).username
    };
    console.log("docInfo yra " + docInfo.documentState);
    axios.post("/api/docs/review/" + this.state.id, docInfo).then(response => {
      axios
        .get("/api/docs/review")
        .then(response => {
          this.setState({ documents: response.data });
        })
        .then(response => this.props.history.push(`/reviewDocuments`))
        .catch(error => {
          console.log(error);
        });
    });
  };

  componentDidMount() {
    const position = this.props.match.params.documentId;
    //let currentUser = "migle";
    let resourcePath = "/api/docs/" + position;
    axios
      .get(resourcePath)
      .then(response => {
        //this.setState(response.data);
        console.log(
          "-----------------Response data id yra: " + response.data.id
        );
        console.log(
          "-----------------Response data title yra: " + response.data.title
        );
        //buvo naudota, kai PATH buvo ne vien tik failo pavadinimas, bet dar ir PREFIX katu
        //var realFileName = "";
        //if (response.data.path.lastIndexOf(response.data.prefix) !== -1) {
        //    realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
        //}
        this.setState({
          id: response.data.id,
          author:
            response.data.author.firstname +
            " " +
            response.data.author.lastname,
          title: response.data.title,
          description: response.data.description,
          documentTypeTitle: response.data.documentTypeTitle,
          documentState: response.data.documentState,
          submissionDate: response.data.submissionDate,
          rejectionReason: response.data.rejectionReason,
          path: response.data.path,
          paths: response.data.additionalFilePaths,
          prefix: response.data.prefix
          //filename: realFileName
        });
      })
      .catch(error => {
        console.log(error);
      });
    let uriForFileInfo = "/api/docs/info/" + position;
    axios
      .get(uriForFileInfo)
      .then(response => {
        console.log(response);
        this.setState({ fileInfo: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <OneReviewDocumentComponent
        id={this.state.id}
        author={this.state.author}
        title={this.state.title}
        description={this.state.description}
        type={this.state.documentTypeTitle}
        state={
          this.state.documentState
            .toLowerCase()
            .charAt(0)
            .toUpperCase() + this.state.documentState.toLowerCase().slice(1)
        }
        submissionDate={
          this.state.submissionDate
            ? this.state.submissionDate.substring(0, 10)
            : ""
        }
        path={this.state.path}
        paths={this.state.paths}
        prefix={this.state.prefix}
        fileInfo={this.state.fileInfo}
        //filename={this.state.filename}
        fileDownloadHandler={this.fileDownloadHandler}
        handleAccept={this.handleAccept}
        handleReject={this.handleReject}
      />
    );
  }
}

export default OneReviewDocumentContainer;
