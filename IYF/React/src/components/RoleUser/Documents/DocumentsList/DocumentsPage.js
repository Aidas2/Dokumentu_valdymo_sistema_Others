import React from "react";
import Documents from "./DocumentsComponent";
import axios from "axios";
import DocumentsButtons from "./components/DocumentsButtons";

class DocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      page: 0,
      rowsPerPage: 5
    };
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };
  componentDidMount = () => {
    axios
      .get("http://localhost:8081/api/documents")
      .then(answer => {
        this.setState({ documents: answer.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onDocumentDeleted = document => {
    this.setState(previousState => {
      return {
        documents: previousState.documents.filter(d => d.id !== document.id)
      };
    });
  };

  onDocumentSubmitted = document => {
    this.setState(previousState => {
      return {
        documents: previousState.documents.filter(d => d.id !== document.id)
      };
    });
  };

  render() {
    return (
      <div>
        <DocumentsButtons />
        <Documents
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          documents={this.state.documents}
          onDocumentDeleted={this.onDocumentDeleted}
          onDocumentSubmitted={this.onDocumentSubmitted}
          downloadFile={this.downloadFile}
        />
      </div>
    );
  }
}

export default DocumentPage;
