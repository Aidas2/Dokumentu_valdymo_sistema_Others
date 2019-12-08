import React, { Component } from "react";
import Axios from "axios";
import NewGroupComponent from "./NewGroupComponent";
import EditGroupUsers from "./EditGroupUsers";
import { Pagination } from "semantic-ui-react";

export default class NewGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      selectedGroupTitle: "",
      newTitle: "",
      allGroups: [],
      allUsers: [],
      groupUsers: [],
      selectedGroupForAddUsers: null,
      totalUsers: 0,
      recordsPerPage: 15,
      activePage: 1
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
    this.getAllUsers(this.state.activePage, this.state.recordsPerPage);
  };

  getAllGroups = () => {
    Axios.get("/api/groups/")
      .then(res => {
        this.setState({ allGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllUsers = (pageNumber, pageLimit) => {
    Axios.get("/api/users/", {
      params: { pageNumber: pageNumber - 1, pageLimit: pageLimit }
    })
      .then(res => {
        this.setState({
          allUsers: res.data.userList,
          totalUsers: res.data.totalElements
        });
        this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage }, () => {
      this.getAllUsers(this.state.activePage, this.state.recordsPerPage);
      // this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
    });
  };

  getSelectedGroupID = () => {
    let id = "";
    for (let i = 0; i < this.state.allGroups.length; i++) {
      if (this.state.allGroups[i].title === this.state.selectedGroupTitle) {
        id = this.state.allGroups[i].id;
        break;
      }
    }
    return id;
  };

  onValueChangeHandler = event => {
    console.log(event.target.value);
    if (event.target.name === "selectedGroupTitle") {
      this.setState({ newTitle: event.target.value });
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  showAllGroups = () => {
    if (this.state.allGroups.length === 0) {
      return (
        <option value="" disabled>
          Nėra jokių grupių...
        </option>
      );
    }
    let groups = this.state.allGroups.map(group => {
      return (
        <option key={group.title} id={group.id} value={group.title}>
          {group.title}
        </option>
      );
    });
    return groups;
  };

  onClickAddNewGroupHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.title;
    Axios.post("/api/groups/", title)
      .then(res => {
        this.props.showResponseMessage(
          "Nauja grupė buvo sėkmingai pridėta",
          "success",
          2500
        );
        this.setState({ title: "" });
        this.getAllGroups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onDeleteCLickHandler = () => {
    console.log(this.getSelectedGroupID());
    Axios.delete("/api/groups/" + this.getSelectedGroupID())
      .then(res => {
        this.props.showResponseMessage(
          "Grupė buvo sėkmingai ištrinta",
          "success",
          2500
        );
        this.setState({ newTitle: "" });
        this.getAllGroups();
      })
      .catch(err => {
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500);
      });
  };

  onClickUpdateHandler = e => {
    e.preventDefault();
    let title = { title: "" };
    title.title = this.state.newTitle;
    Axios.put("/api/groups/" + this.getSelectedGroupID(), title)
      .then(res => {
        this.props.showResponseMessage(
          "Grupė buvo sėkmingai atnaujinta",
          "success",
          2500
        );
        this.setState({ newTitle: "" });
        this.getAllGroups();
      })
      .catch(err => {
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500);
      });
  };

  onSelectedGroupForAddUsersHandler = e => {
    console.log("Target value", e.target.value);
    this.state.allGroups.forEach(element => {
      if (element.title === e.target.value) {
        this.setState(
          {
            selectedGroupForAddUsers: element.id,
            selectedGroupTitle: element.title
          },
          () => {
            this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
          }
        );
      }
    });
  };

  loadSelectedGroupUsers = selectedId => {
    if (selectedId) {
      Axios.get("/api/groups/" + selectedId + "/users/")
        .then(res => {
          let allList = [];
          this.state.allUsers.forEach(user => {
            allList.push({
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              isChecked: false
            });
          });
          allList.forEach(listEl => {
            res.data.forEach(resEl => {
              if (listEl.username === resEl.username) {
                listEl.isChecked = true;
              }
            });
          });
          this.setState({ groupUsers: allList });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  showUsersCheckBox = () => {
    const { totalUsers, recordsPerPage, activePage } = this.state;
    let pageCount = Math.ceil(totalUsers / recordsPerPage);
    if (this.state.allUsers.length === 0) {
      return <div>Nėra vartotojų</div>;
    }
    if (this.state.selectedGroupForAddUsers === null) {
      return <div>Pasirinkite grupę</div>;
    }
    let data = this.state.groupUsers.map((user, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1 + recordsPerPage * (activePage - 1)}</th>
          <td>{user.firstname}</td>
          <td>{user.lastname}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>
            <input
              onChange={event => this.handleUserCheckBoxClick(event)}
              id={user.username}
              type="checkbox"
              value={user.username}
              checked={user.isChecked}
            />
          </td>
        </tr>
      );
    });
    return (
      <div className="col-md-12">
        <p>
          Pažymėkite vartotojus, kuriuos noriti pridėti arba pašalinti iš grupės{" "}
          <b>&laquo;{this.state.selectedGroupTitle}&raquo;</b>
        </p>
        <Pagination
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={pageCount}
        />
        <div className="line" />
        <table className="ui celled table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Vardas</th>
              <th scope="col">Pavardė</th>
              <th scope="col">Vartotojo vardas</th>
              <th scope="col">Paštas</th>
              <th scope="col">Pridėti</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>

        {/* <ButtonComponent
          onClick={this.onClickAddUsersToGroup}
          type="submit"
          value="Atnaujinti"
          className="btn submitButton"
        /> */}
      </div>
    );
  };

  handleUserCheckBoxClick = e => {
    const options = this.state.groupUsers;
    options.forEach(option => {
      if (option.username === e.target.value) {
        option.isChecked = !option.isChecked;
        if (option.isChecked) {
          this.addOneUserToGroup(option.username);
        } else {
          this.removeOneUserFromGroup(option.username);
        }
      }

      this.setState({ groupUsers: options });
    });
  };

  removeOneUserFromGroup = user => {
    Axios.delete(
      "/api/groups/" + this.state.selectedGroupForAddUsers + "/users/" + user
    )
      .then(res => {
        this.props.showResponseMessage(
          "Vartotojas pasalintas is grupes",
          "success",
          2500
        );
        this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  addOneUserToGroup = user => {
    Axios.post(
      "/api/groups/" + this.state.selectedGroupForAddUsers + "/users/" + user
    )
      .then(res => {
        this.props.showResponseMessage(
          "Vartotojas priskyrtas",
          "success",
          2500
        );
        this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  onClickAddUsersToGroup = () => {
    console.log("Selected type: ", this.state.selectedType);
    let userIdListToAdd = [];
    let userIdListToRemove = [];

    this.state.groupUsers.forEach(el => {
      if (el.isChecked) {
        userIdListToAdd.push(el.username);
      } else {
        userIdListToRemove.push(el.username);
      }
    });

    Axios.post(
      "/api/groups/" + this.state.selectedGroupForAddUsers + "/users",
      { users: userIdListToAdd }
    )
      .then(res => {
        this.props.showResponseMessage(
          "Vartotojų priskyrimas įvykdytas",
          "success",
          2500
        );
        this.loadSelectedGroupUsers(this.state.selectedGroupForAddUsers);
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <NewGroupComponent
                showGroups={this.showAllGroups()}
                onSubmitAdd={e => this.onClickAddNewGroupHandler(e)}
                onChange={e => this.onValueChangeHandler(e)}
                newTitle="title"
                newTitleValue={this.state.title}
                pattern="^([A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+[ĄČĘĖĮŠŲŪŽąčęėįšųūž]?[ ]?|[A-Za-z]+['-]?)+$"
                onClickGoBack={() => this.goBack()}
                onDeleteClick={() => this.onDeleteCLickHandler()}
                onSubmitUpdate={e => this.onClickUpdateHandler(e)}
                nameForUpdate="newTitle"
                valueForUpdate={this.state.newTitle}
              />
            </section>
            <section>
              <EditGroupUsers
                showGroups={this.showAllGroups()}
                onClickGoBack={() => this.goBack()}
                onChange={e => this.onSelectedGroupForAddUsersHandler(e)}
                showUsersCheckBox={this.showUsersCheckBox}
                onClickAddUsersToGroup={() => this.onClickAddUsersToGroup()}
              />
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
