import React from "react";
import Users from "./UsersComponent";
import UsersSearch from "./UsersSearch";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
      .get("http://localhost:8081/api/docUsers")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  // onUserAdded = user => {
  //   this.setState({ users: [...this.state.users, user] });
  // };

  onUserDeleted = user => {
    this.setState(previousState => {
      return {
        users: previousState.users.filter(d => d.id !== user.id)
      };
    });
  };
  render() {
    return (
      <div>
        <br />
        <Container>
            <Link to={"/create-user"}>
              <Button variant="contained" type="submit" color="primary">
                Kurti naują
                  </Button>{" "}
            </Link>
            <br />
            <br></br>
          <Paper>
                <UsersSearch />
          </Paper>
          <Users
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            users={this.state.users}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            onUserDeleted={this.onUserDeleted}
          />
        </Container>
      </div>
    );
  }
}

export default UserPage;
