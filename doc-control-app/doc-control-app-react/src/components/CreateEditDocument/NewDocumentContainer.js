import React from "react";
import NewDocumentComponent from "./NewDocumentComponent";
import axios from "axios";
const acceptedFileTypes = ["image/*", "application/pdf"];
class NewDocumentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      username: "",
      documentTypeTitle: "",
      typeList: [],
      mainFile: null,
      selectedAdditionalFiles: null,
      isOpen: false,
      percentage: 0
    };
  }
  acceptedFileTypes = ["pdf", "jpg", "png"];
  openFileTransferPopup = () => {
    this.setState({
      isOpen: true
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
  }
  closeFileTransferPopup = () => {
    this.setState({
      isOpen: true
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
  validateMainFile = (source, type) => {
    new Promise((resolve, reject) => {
      if (type === "application/pdf") {
        resolve();
      } else {
        reject(type);
      }
    });
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
  /************************************************************************************* */
  // Auxiliary methods
  uploadMainFile = (file, model) => {
    if (this.state.mainFile[0].size > 100000001) {
      this.props.showResponseMessage(
        "Prisegta byla per didelė.",
        "danger",
        2500
      );
      return;
    }
    file.append("file", this.state.mainFile[0], this.state.mainFile[0].name);
    file.append("model", JSON.stringify(model));
    axios
      .post("/api/docs", file, {
        onUploadProgress: progressEvent => {
          this.setState({
            percentage: Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )
          });
        }
      })
      .then(response => this.props.history.push(`/createdDocuments`))
      .then(res => console.log(res))
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
      .post("/api/docs", file, {
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
    let model = {
      description: this.state.description,
      documentTypeTitle: this.state.documentTypeTitle,
      title: this.state.title
    };
    let file = new FormData();
    let fileNames = this.gatherAllFileNames();
    // Check if mainFile is added

    if (this.state.mainFile === null || this.state.mainFile.length === 0) {
      this.props.showResponseMessage(
        "Prisegkite tinkamą pagrindinę bylą.",
        "danger",
        2500
      );
    } else if (this.checkDuplicates(fileNames)) {
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
      //If main file is added and no additionalFiles are added, submit
      this.state.selectedAdditionalFiles === null ||
      this.state.selectedAdditionalFiles.length === 0
    ) {
      if (this.checkFileExtensions([this.state.mainFile[0].name], ["pdf"])) {
        this.props.showResponseMessage(
          "Prisegta byla nėra teisingo formato.",
          "danger",
          2500
        );
      } else {
        this.uploadMainFile(file, model);
      }
    } else {
      //Add main file and additionalFiles
      this.uploadMultipleFiles(file, model);
    }
  };

  render() {
    return (
      <React.Fragment>
        <NewDocumentComponent
          type={this.state.type}
          typeList={this.state.typeList}
          percentage={this.state.percentage}
          isOpen={this.state.isOpen}
          handleChange={this.handleChange}
          onUpdateMainFile={this.onUpdateMainFile}
          onUpdateAdditionalFiles={this.onUpdateAdditionalFiles}
          mainFileUploaded={this.state.mainFile !== null}
          handleSubmit={this.handleSubmit}
          openFileTransferPopup={this.openFileTransferPopup}
          closeFileTransferPopup={this.closeFileTransferPopup}
          acceptedFileTypes={acceptedFileTypes}
          fileValidate={this.fileValidate}
          validateMainFile={this.validateMainFile}
        />
      </React.Fragment>
    );
  }
}

export default NewDocumentContainer;
