import React, { Component } from "react";
import axios from "axios";

export default class CSV extends Component {
  downloadHandler = event => {
    axios({
      url: "/api/docs/csv/download",
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

  render() {
    return (
      <div>
        <div
          className="btn btn-warning"
          onClick={event => this.downloadHandler(event)}
        >
          Atsisiusti faila
        </div>
      </div>
    );
  }
}
