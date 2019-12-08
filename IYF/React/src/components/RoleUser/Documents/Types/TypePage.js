import React from "react";
import axios from "axios";
import TypeCreation from "./TypeCreation";
import Types from "./TypesComponent";

class TypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
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
      .get("http://localhost:8081/api/documents/types")
      .then(answer => {
        this.setState({ types: answer.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onTypeAdded = type => {
    this.setState({ types: [...this.state.types, type] });
  };

  onTypeDeleted = type => {
    this.setState(previousState => {
      return {
        types: previousState.types.filter(d => d.title !== type.title)
      };
    });
  };
  render() {
    return (
      <div>
        <TypeCreation onTypeAdded={this.onTypeAdded} />
        <Types
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          types={this.state.types}
          page={this.state.page}
          rowsPerPage={this.state.rowsPerPage}
          onTypeDeleted={this.onTypeDeleted}
        />
      </div>
    );
  }
}

export default TypePage;
