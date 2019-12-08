import React from "react";
import EditDocumentComponent from "./EditDocumentComponent";
import axios from "axios";

class EditDocumentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "default kodas",
      title: "default title",
      description: "",
      username: "migle",
      documentTypeTitle: "Antras tipas",
      typeList: [],
      selectedFiles: null,
      paths: null,
      path: "",
      prefix: "",
      isOpen: false,
      isHidden: false,
      percentage: 0,
      mainFile: null,
      selectedAdditionalFiles: null,
      additionalFilePathsToDelete: [],
      mainFilePathToDelete: null,
      fileInfo: new Map()
    };
  }
  acceptedFileTypes = ["pdf", "jpg", "png"];
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }
  handleChangeOfTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeOfDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleChangeOfType = event => {
    this.setState({ documentTypeTitle: event.target.value });
  };

  onFileSelectHandler = event => {
    this.setState({ [event.target.name]: event.target.files });
  };

  // openFileTransferPopup = () => {
  //   this.setState({ isOpen: true });
  // };

  // closeFileTransferPopup = () => {
  //   this.setState({ isOpen: false });
  // };

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
  /************************************************************************************* */
  updateDocumentInfo = (file, model) => {
    file.append("model", JSON.stringify(model));
    axios
      .put("/api/docs/" + this.state.id, file, {
        onUploadProgress: progressEvent => {
          this.setState({
            percentage: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
          });
        }
      })
      .then(response => this.props.history.push(`/createdDocuments`))
      .catch(err => console.log(err));
  };
  uploadMainFile = (file, model) => {
    file.append("file", this.state.mainFile[0], this.state.mainFile[0].name);
    file.append("model", JSON.stringify(model));
    axios
      .put("/api/docs/" + this.state.id, file, {
        onUploadProgress: progressEvent => {
          this.setState({
            percentage: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
          });
        }
      })
      .then(response => this.props.history.push(`/createdDocuments`))
      .catch(err => console.log(err));
  };

  uploadMultipleFiles = (file, model) => {
    let totalFileSize = this.state.mainFile[0].size;
    if (this.state.mainFile[0].size > 100000001) {
      this.props.showResponseMessage(
        "Prisegta byla per didelė.",
        "danger",
        2500
      );
      return;
    }
    file.append("file", this.state.mainFile[0], this.state.mainFile[0].name);
    for (let i = 0; i < this.state.selectedAdditionalFiles.length; i++) {
      if (this.state.selectedAdditionalFiles[i].size > 100000001) {
        this.props.showResponseMessage(
          "Prisegta byla per didelė.",
          "danger",
          2500
        );
        return;
      }
      totalFileSize += this.state.selectedAdditionalFiles[i].size;
      if (totalFileSize > 200000001) {
        this.props.showResponseMessage(
          "Bendras bylų dydis neturi viršyti 200MB.",
          "danger",
          2500
        );
        return;
      }
      file.append(
        "file",
        this.state.selectedAdditionalFiles[i],
        this.state.selectedAdditionalFiles[i].name
      );
      file.append("model", JSON.stringify(model));
    }
    axios
      .put("/api/docs/" + this.state.id, file, {
        onUploadProgress: progressEvent => {
          this.setState({
            percentage: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
          });
        }
      })
      .then(() => this.props.history.push(`/createdDocuments`))
      .catch(err => console.log(err));
  };
  uploadAdditionalFiles = (file, model) => {
    file.append("model", JSON.stringify(model));
    let totalFileSize = this.state.fileInfo[this.state.path];
    for (let i = 0; i < this.state.selectedAdditionalFiles.length; i++) {
      if (this.state.selectedAdditionalFiles[i].size > 100000001) {
        this.props.showResponseMessage(
          "Prisegta byla per didelė.",
          "danger",
          2500
        );
        return;
      }
      totalFileSize += this.state.selectedAdditionalFiles[i].size;
      if (totalFileSize > 200000001) {
        this.props.showResponseMessage(
          "Bendras bylų dydis neturi viršyti 200MB.",
          "danger",
          2500
        );
        return;
      }
      file.append(
        "file",
        this.state.selectedAdditionalFiles[i],
        this.state.selectedAdditionalFiles[i].name
      );
    }
    axios
      .put("/api/docs/" + this.state.id, file, {
        onUploadProgress: progressEvent => {
          this.setState({
            percentage: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
          });
        }
      })
      .then(response => this.props.history.push(`/createdDocuments`))
      .catch(err => console.log(err));
  };

  checkTotalFileSize = () => {
    let totalFileSize = 0;
    if (this.state.mainFile && this.state.mainFile[0]) {
      totalFileSize += this.state.mainFile[0].size;
    }
    if (
      this.state.selectedAdditionalFiles !== null &&
      this.state.selectedAdditionalFiles.length !== 0
    ) {
      this.state.selectedAdditionalFiles.forEach(additionalPath => {
        totalFileSize += additionalPath.size;
      });
    }
    if (this.state.path && this.state.fileInfo) {
      totalFileSize += this.state.fileInfo[this.state.path];
    }
    if (this.state.paths && this.state.fileInfo) {
      this.state.paths.forEach(path => {
        totalFileSize += this.state.fileInfo[path];
      });
    }
    if (totalFileSize > 200000001) {
      return true;
    } else {
      return false;
    }
  };
  checkDuplicates = array => {
    return new Set(array).size !== array.length;
  };
  checkFileExtensions = (array, acceptedTypesArray) => {
    let stopSubmit = false;
    array.forEach(element => {
      if (!acceptedTypesArray.includes(element.split(".").pop())) {
        stopSubmit = true;
      }
    });
    return stopSubmit;
  };
  gatherAllFileNames = () => {
    let fileNames = [];
    if (this.state.mainFile !== null && this.state.mainFile.length !== 0) {
      fileNames.push(this.state.mainFile[0].name);
    }
    if (this.state.path !== null) {
      fileNames.push(this.state.path);
    }
    if (this.state.paths !== null)
      this.state.paths.forEach(additionalFilePath => {
        fileNames.push(additionalFilePath);
      });
    if (this.state.selectedAdditionalFiles !== null) {
      this.state.selectedAdditionalFiles.forEach(additionalFilePath => {
        fileNames.push(additionalFilePath.name);
      });
    }
    return fileNames;
  };

  /************************************************************************************* */
  handleSubmit = event => {
    event.preventDefault();
    // Generate model
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title,
      mainFilePathToDelete: this.state.mainFilePathToDelete,
      additionalFilePathsToDelete: this.state.additionalFilePathsToDelete
    };

    let file = new FormData();
    // Validating files
    let fileNames = this.gatherAllFileNames();
    if (
      this.state.path === null &&
      (this.state.mainFile === null || this.state.mainFile.length === 0)
    ) {
      // No main file is added.
      this.props.showResponseMessage(
        "Įkelkite pagrindinę bylą.",
        "danger",
        2500
      );
    } else if (this.checkDuplicates(fileNames)) {
      // Duplicate file names.
      this.props.showResponseMessage(
        "Bylų pavadinimai vienodi. Pasirinkite kitas bylas arba jas pervadinkite.",
        "danger",
        2500
      );
    } else if (this.checkFileExtensions(fileNames, this.acceptedFileTypes)) {
      this.props.showResponseMessage(
        "Prisegta byla nėra teisingo formato.",
        "danger",
        2500
      );
    } else if (
      this.state.mainFile &&
      this.state.mainFile[0] &&
      this.state.mainFile[0].size > 100000001
    ) {
      this.props.showResponseMessage(
        "Prisegta byla per didelė.",
        "danger",
        2500
      );
      return;
    } else if (
      // Validate main file type.
      this.state.mainFile &&
      this.state.mainFile[0] &&
      this.checkFileExtensions([this.state.mainFile[0].name], ["pdf"])
    ) {
      this.props.showResponseMessage(
        "Prisegta byla nėra teisingo formato.",
        "danger",
        2500
      );
    } else if (this.checkTotalFileSize()) {
      this.props.showResponseMessage(
        "Bendras bylų dydis neturi viršyti 200 MB",
        "danger",
        2500
      );
    } else if (
      // Uploads only additional files
      this.state.selectedAdditionalFiles !== null &&
      this.state.mainFile === null
    ) {
      this.uploadAdditionalFiles(file, model);
    } else if (
      // Uploads only main file
      this.state.mainFile !== null &&
      (this.state.selectedAdditionalFiles === null ||
        this.state.selectedAdditionalFiles.length === 0)
    ) {
      this.uploadMainFile(file, model);
    } else if (
      // Update both additional files and main file
      this.state.selectedAdditionalFiles !== null &&
      this.state.mainFile !== null
    ) {
      this.uploadMultipleFiles(file, model);
    } else {
      // Update only document info
      this.updateDocumentInfo(file, model);
    }
  };

  onUpdateMainFile = fileItems => {
    this.setState({
      mainFile: fileItems.map(fileItem => fileItem.file)
    });
  };
  onUpdateAdditionalFiles = fileItems => {
    this.setState({
      selectedAdditionalFiles: fileItems.map(fileItem => fileItem.file)
    });
  };
  deleteMainFileHandler = event => {
    event.preventDefault();
    this.setState({
      mainFilePathToDelete:
        event.target.id === this.state.path ? this.state.path : null,
      path: event.target.id === this.state.path ? null : this.state.path
    });
  };
  deleteAdditionalFileHandler = event => {
    event.preventDefault();
    this.setState({
      additionalFilePathsToDelete: this.state.additionalFilePathsToDelete.concat(
        this.state.paths.filter(p => p === event.target.id)
      ),
      paths: this.state.paths.filter(p => p !== event.target.id)
    });
  };

  componentDidMount() {
    axios
      .get("/api/users/submissionDocTypes")
      .then(response => {
        this.setState({ typeList: response.data.map(item => item.title) });
      })
      .catch(error => {
        console.log(error);
      });

    const position = this.props.match.params.documentId;
    let resourcePath = "/api/docs/" + position;

    axios
      .get(resourcePath)
      .then(response => {
        this.setState({ id: response.data.id });
        this.setState({ title: response.data.title });
        this.setState({ description: response.data.description });
        this.setState({ documentTypeTitle: response.data.documentTypeTitle });
        this.setState({ path: response.data.path });
        this.setState({ paths: response.data.additionalFilePaths });
        this.setState({ prefix: response.data.prefix });

        let currentUser = JSON.parse(localStorage.getItem("user"));

        this.setState({ username: currentUser.username });
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
      <EditDocumentComponent
        title={this.state.title}
        description={this.state.description}
        typeList={this.state.typeList}
        type={this.state.documentTypeTitle}
        path={this.state.path}
        paths={this.state.paths}
        prefix={this.state.prefix}
        //filename = { this.state.filename }
        handleChangeOfTitle={this.handleChangeOfTitle}
        handleChangeOfDescription={this.handleChangeOfDescription}
        handleChangeOfType={this.handleChangeOfType}
        handleSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        fileInfo={this.state.fileInfo}
        // downloadHandler={this.downloadHandler}
        fileDownloadHandler={this.fileDownloadHandler}
        onFileSelectHandler={this.onFileSelectHandler}
        isOpen={this.state.isOpen}
        percentage={this.state.percentage}
        // openFileTransferPopup={this.openFileTransferPopup}
        // closeFileTransferPopup={this.closeFileTransferPopup}
        deleteMainFileHandler={this.deleteMainFileHandler}
        deleteAdditionalFileHandler={this.deleteAdditionalFileHandler}
        onUpdateAdditionalFiles={this.onUpdateAdditionalFiles}
        onUpdateMainFile={this.onUpdateMainFile}
      />
    );
  }
}

export default EditDocumentContainer;
