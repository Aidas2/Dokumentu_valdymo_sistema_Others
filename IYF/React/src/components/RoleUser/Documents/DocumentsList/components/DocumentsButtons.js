import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class DocumentsButtons extends React.Component {
  render() {
    return (
      <div>
        <br />
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-new-document"
        >
          Kurti naują
        </Button>{" "}
        <br />
        <br />
        <Button
          variant="contained"
          color="default"
          component={Link}
          to="/documents"
        >
          Sukurti dokumentai
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/submitted-documents"
        >
          Pateikti dokumentai
        </Button>{" "}
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="default"
          component={Link}
          to="/accepted-documents"
        >
          Patvirtinti dokumentai
        </Button>{" "}
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/refused-documents"
        >
          Atmesti dokumentai
        </Button>{" "}
        <br />
      </div>
    );
  }
}

export default DocumentsButtons;
