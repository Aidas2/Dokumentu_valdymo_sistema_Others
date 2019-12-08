import React from "react";
import OneCreatedDocumentComponent from "./OneCreatedDocumentComponent";
import axios from "axios";

class OneCreatedDocumentContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: "kodas1s",
      title: "Title1s",
      description: "Description1s",
      documentTypeTitle: "Type1s",
      creationDate: "2019.01.26",
      path: "",
      paths: null,
      prefix: "",
      filename: "Nėra pridėto failo",
      fileInfo: new Map()
    };
    const position = this.props.match.params.documentId;
    //let currentUser = "migle";
    let resourcePath = "/api/docs/" + position;
    axios
      .get(resourcePath)
      .then(response => {
        if (this.mounted) {
          //buvo naudota, kai PATH buvo ne vien tik failo pavadinimas, bet dar ir PREFIX katu
          //var realFileName = "";
          //if(response.data.path.lastIndexOf(response.data.prefix) !== -1){
          //    realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
          //    console.log("Tikras failo pavadinimas yra " + realFileName);
          //}
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            documentTypeTitle: response.data.documentTypeTitle,
            creationDate: response.data.creationDate,
            path: response.data.path,
            paths: response.data.additionalFilePaths,
            prefix: response.data.prefix
          });
        } else {
          console.log("SetState nebuvo padarytas");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  downloadHandler = event => {
    axios({
      url: "/api/docs/" + this.state.id + "/download", //doc id
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
    console.log(this.state.paths);
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

  handleDelete = event => {
    //let currentUser = "migle";
    //let resourcePath = '/api/users/' + currentUser + '/docs/created';
    console.log(
      "Atėjau į handleDelete metodą OneCreatedDocumentContainer faile"
    );
    //const position = this.props.match.params.documentId;
    console.log("Dokumento ID yra:");
    console.log(this.state.id);
    axios.delete("/api/docs/" + this.state.id).then(response => {
      this.props.history.push(`/createdDocuments`);
    });
  };

  handleSubmit = event => {
    console.log("Atėjau į handleSubmit metodą");
    console.log("Dokumento ID yra:");
    console.log(this.state.id);
    axios
      .put("/api/docs/" + this.state.id + "/submit")
      .then(response => {
        console.log("Pakeičiau dokumento statusą");
        axios
          .get("/api/docs/" + this.state.id)
          .then(response => {
            //if (this.mounted) {
            this.setState({
              id: response.data.id,
              title: response.data.title,
              description: response.data.description,
              documentTypeTitle: response.data.documentTypeTitle,
              creationDate: response.data.creationDate,
              path: response.data.path,

              prefix: response.data.prefix
            });
            //}
          })
          .then(response => this.props.history.push(`/`))
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log("Klaida keičiant dokumento statusą - " + error);
      });
  };
  fileDownloadHandler = event => {
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
  componentDidMount() {
    this.mounted = true;
    const position = this.props.match.params.documentId;
    //let currentUser = "migle";
    let resourcePath = "/api/docs/" + position;
    axios
      .get(resourcePath)
      .then(response => {
        if (this.mounted) {
          //buvo naudota, kai PATH buvo ne vien tik failo pavadinimas, bet dar ir PREFIX katu
          //var realFileName = "";
          //if(response.data.path.lastIndexOf(response.data.prefix) !== -1){
          //    realFileName = response.data.path.substring(0, response.data.path.lastIndexOf(response.data.prefix));
          //    console.log("Tikras failo pavadinimas yra " + realFileName);
          //}
          this.setState({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            documentTypeTitle: response.data.documentTypeTitle,
            creationDate: response.data.creationDate,
            path: response.data.path,
            paths: response.data.additionalFilePaths,
            prefix: response.data.prefix
          });
        } else {
          console.log("SetState nebuvo padarytas");
        }
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

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <OneCreatedDocumentComponent
        id={this.state.id}
        title={this.state.title}
        description={this.state.description}
        type={this.state.documentTypeTitle}
        creationDate={this.state.creationDate.substring(0, 10)}
        path={this.state.path}
        paths={this.state.paths}
        prefix={this.state.prefix}
        fileInfo={this.state.fileInfo}
        downloadHandler={this.downloadHandler}
        handleDelete={this.handleDelete}
        handleSubmit={this.handleSubmit}
        fileDownloadHandler={this.fileDownloadHandler}
      />
    );
  }
}

export default OneCreatedDocumentContainer;
