import React from "react";
import OneSubmittedDocumentComponent from "./OneSubmittedDocumentComponent";
import axios from "axios";

class OneSubmittedDocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: "kodas1",
      title: "Title1",
      description: "Description1",
      documentTypeTitle: "Type1",
      documentState: "State1",
      submissionDate: "2019.01.26",
      approvalDate: "2019.02.05",
      rejectionDate: "2019.02.05",
      reviewer: {},
      rejectionReason: "",
      path: "",
      paths: null,
      prefix: "",
      fileInfo: new Map()
      //filename: "Nėra pridėto failo"
    };
  }

  // downloadHandler = event => {
  //   axios({
  //     url: "/api/docs/" + this.state.id + "/download", //doc id
  //     method: "GET",
  //     responseType: "blob" // important
  //   }).then(response => {
  //     var filename = this.extractFileName(
  //       response.headers["content-disposition"]
  //     );
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", filename); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   });
  // };

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
        //    if(response.data.path.lastIndexOf(response.data.prefix) !== -1){
        //        realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
        //    }
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          documentTypeTitle: response.data.documentTypeTitle,
          documentState: response.data.documentState,
          submissionDate: response.data.submissionDate,
          approvalDate: response.data.approvalDate,
          rejectionDate: response.data.rejectionDate,
          reviewer: response.data.reviewer,
          rejectionReason: response.data.rejectionReason,
          paths: response.data.additionalFilePaths,
          path: response.data.path,
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
      <OneSubmittedDocumentComponent
        id={this.state.id}
        title={this.state.title}
        description={this.state.description}
        type={this.state.documentTypeTitle}
        fileInfo={this.state.fileInfo}
        state={
          this.state.documentState === "SUBMITTED"
            ? "Pateiktas"
            : this.state.documentState === "ACCEPTED"
            ? "Priimtas"
            : "Atmestas"
        }
        submissionDate={
          this.state.submissionDate
            ? this.state.submissionDate.substring(0, 10)
            : ""
        }
        approvalDate={
          this.state.approvalDate
            ? this.state.approvalDate.substring(0, 10)
            : ""
        }
        rejectionDate={
          this.state.rejectionDate
            ? this.state.rejectionDate.substring(0, 10)
            : ""
        }
        reviewer={
          this.state.reviewer
            ? this.state.reviewer.firstname + " " + this.state.reviewer.lastname
            : ""
        }
        rejectionReason={this.state.rejectionReason}
        path={this.state.path}
        paths={this.state.paths}
        prefix={this.state.prefix}
        //filename={this.state.filename}
        // downloadHandler={this.downloadHandler}
        fileDownloadHandler={this.fileDownloadHandler}
      />
    );
  }
}

export default OneSubmittedDocumentContainer;
