import React, { Component } from "react";
import Axios from "axios";
import { Pagination } from "semantic-ui-react";
import SemanticUserTable from "./SemanticUserTable";
import SearchField from "../../ReviewDocuments/SearchField";
import Loading from "../../Utilities/Loading";

import Swal from "sweetalert2";

export class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalUsers: 0,
      recordsPerPage: 15,
      activePage: 1,
      searchField: "",
      dataLoaded: false,
      pageCount: 0,
      loaded: true
    };
    this.typingTimeout = null;
  }

  componentDidMount = () => {
    this.getAllUsersFromServer(
      this.state.activePage,
      this.state.recordsPerPage
    );
  };

  handleInputFieldChange = e => {
    let oldState = this.state.searchField;
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (
        this.state.searchField !== "" ||
        (oldState.length === 1 && this.state.searchField.length === 0)
      ) {
        this.typingTimeout = setTimeout(
          this.getAllUsersFromServer(
            this.state.activePage,
            this.state.recordsPerPage,
            this.state.searchField
          ),
          475
        );
      }
    });
  };

  toggleLock = (username, locked) => {
    let lockMsg = locked ? "atrakinti" : "užrakinti";
    let actionAfter = locked ? "atrakintas" : "užrakintas";
    Swal.fire({
      title: "Ar tikrai norite " + lockMsg + " vartotoją?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Taip, " + lockMsg + "!",
      cancelButtonText: "Ne, atšaukti"
    }).then(result => {
      if (result.value) {
        Axios.put("/api/users/" + username + "/toggleLock")
          .then(res => {
            this.getAllUsersFromServer(
              this.state.activePage,
              this.state.recordsPerPage,
              this.state.searchField
            );
            Swal.fire(
              "Vartotojas buvo " + actionAfter
            );
          })
          .catch(err => {
            let errorMsg = err.response.data.message === "OWN_USER_LOCK" ?
              "vartotojas bandė  " + lockMsg + " save" :
              "vartotojas nebuvo " + actionAfter;
            Swal.fire(
              "Klaida: " + errorMsg
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Atšaukta", "Vartotojas nebuvo " + actionAfter);
      }
    });
  }

  getUserCount = () => {
    Axios.get("/api/users/total")
      .then(res => {
        this.setState({ totalUsers: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllUsersFromServer = (pageNumber, pageLimit, searchBy) => {
    this.timer = setTimeout(() => this.setState({ loaded: false }), 1000);
    Axios.get("/api/users/", {
      params: {
        searchFor: searchBy,
        pageNumber: pageNumber - 1,
        pageLimit: pageLimit
      }
    })
      .then(res => {
        this.setState({ loaded: true });
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = 0;
        }
        this.setState(
          {
            users: res.data.userList,
            totalUsers: res.data.totalElements,
            dataLoaded: true,
            pageCount: Math.ceil(
              res.data.totalElements / this.state.recordsPerPage
            )
          },
          () => {
            if (this.state.activePage > this.state.pageCount) {
              if (this.state.pageCount === 0) {
                this.setState({ activePage: 1 });
              } else {
                this.setState({ activePage: this.state.pageCount });
              }
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUsersSemanticUI = () => {
    if (this.state.users.length === 0 && this.state.dataLoaded === false) {
      return <Loading />;
    } else if (
      this.state.users.length === 0 &&
      this.state.dataLoaded === true &&
      this.state.totalUsers === 0
    ) {
      return <h2 className="">Duomenys nerasti</h2>;
    }
    let users = this.state.users.map((user, index) => {
      let isAdmin =
        user.admin === false ? "Paprastas vartotojas" : "Administratorius";
      return (
        <SemanticUserTable
          number={
            index + 1 + this.state.recordsPerPage * (this.state.activePage - 1)
          }
          key={user.username}
          firstname={user.firstname}
          lastname={user.lastname}
          username={user.username}
          email={user.email}
          isAdmin={isAdmin}
          isLocked={user.locked}
          update={() => this.onUpdateClickHandler(user.username)}
          toggleLock={() => this.toggleLock(user.username, user.locked)}
        />
      );
    });
    if (this.state.loaded) {
      return (
        <table className="ui celled table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>Vartotojo vardas</th>
              <th>El. paštas</th>
              <th>Teisės</th>
              <th>Statusas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </table>
      );
    } else {
      return <Loading />;
    }
  };

  onDeleteClickHandler = id => {
    Axios.delete("/api/users/" + id)
      .then(() =>
        this.getAllUsersFromServer(
          this.state.activePage,
          this.state.recordsPerPage
        )
      )
      .catch(err => {
        console.log(err);
      });
  };

  onUpdateClickHandler = id => {
    this.props.history.push("/users/update/" + id);
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage }, () => {
      this.getAllUsersFromServer(
        this.state.activePage,
        this.state.recordsPerPage
      );
    });
  };

  onValueChangeHandler = event => {
    this.setState(
      { [event.target.name]: event.target.value, activePage: 1 },
      () => {
        this.getAllUsersFromServer(
          this.state.activePage,
          this.state.recordsPerPage
        );
      }
    );
  };

  render() {
    // const { totalUsers, recordsPerPage, activePage } = this.state;
    // let pageCount = Math.ceil(totalUsers / recordsPerPage);
    return (
      <div className="page-holder w-100 d-flex flex-wrap">
        <div className="container-fluid px-xl-5">
          <section className="pt-5">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h6
                    className="text-uppercase mb-0"
                    onClick={() => this.getUserCount()}
                  >
                    Visi vartotojai
                  </h6>
                </div>

                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <h2>
                      <strong className="text-secondary">
                        {this.state.totalUsers}
                      </strong>{" "}
                      Vartotojai
                    </h2>
                    {this.state.activePage && (
                      <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                        Puslapis{" "}
                        <span className="font-weight-bold">
                          {this.state.activePage}
                        </span>{" "}
                        /{" "}
                        <span className="font-weight-bold">
                          {this.state.pageCount}
                        </span>
                      </span>
                    )}
                  </div>
                  <div>
                    <Pagination
                      pageItem={{
                        style: {
                          minWidth: "0.4em",
                          maxWidth: "3em",
                          fontSize: "9px"
                        }
                      }}
                      size="mini"
                      activePage={this.state.activePage}
                      onPageChange={this.handlePaginationChange}
                      totalPages={this.state.pageCount}
                      firstItem={null}
                      lastItem={null}
                    />
                  </div>
                </div>

                <div>
                  <div className="px-5">
                    <select
                      className="ui compact selection dropdown"
                      name="recordsPerPage"
                      onChange={event => this.onValueChangeHandler(event)}
                    >
                      <option value={15}>15</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <div className="ui tag label label">Rodyti per puslapį</div>
                  </div>
                </div>
                <SearchField
                  searchField={this.state.searchField}
                  handleChangeOfSearchField={this.handleInputFieldChange}
                />
                <div className="card-body">{this.showAllUsersSemanticUI()}</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default UserContainer;
