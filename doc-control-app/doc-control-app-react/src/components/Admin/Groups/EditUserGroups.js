import React, { Component } from "react";
import Axios from "axios";
import ButtonComponent from "../../Utilities/ButtonComponent";
import ResourceNotFoundComponent from "../../Errors/ResourceNotFoundComponent";

export default class EditUserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroups: [],
      allGroups: [],
      selectedAddGroup: "",
      selectedRemoveGroup: "",
      user: ""
    };
  }

  componentDidMount = () => {
    this.getAllGroups();
    this.getAllUserGroups();
    this.getUser();
  };

  getUser = () => {
    Axios.get("/api/users/" + this.props.match.params.username)
      .then(res => {
        this.setState({ user: res.data });
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllUserGroups = () => {
    Axios.get("/api/users/" + this.props.match.params.username + "/groups")
      .then(res => {
        this.setState({ userGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getAllGroups = () => {
    Axios.get("/api/groups")
      .then(res => {
        this.setState({ allGroups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showAllUserGroups = () => {
    if (this.state.userGroups.length === 0) {
      return (
        <option value="" disabled>
          Vartotojas nepriklauso jokioms grupėms
        </option>
      );
    } else {
      let groups = this.state.userGroups.map(group => {
        return (
          <option key={group.title} value={group.id}>
            {group.title}
          </option>
        );
      });
      return groups;
    }
  };

  showAvailableGroups = () => {
    if (this.state.allGroups.length === 0) {
      return (
        <option value="" disabled>
          Nėra grupių pasirinkimo...
        </option>
      );
    } else {
      let groups = this.state.allGroups
        .map((group, index) => {
          // console.log(this.state.userGroups);
          // console.log(this.state.userGroups.includes("group.title"));

          let shouldShow = true;

          this.state.userGroups.forEach((g, index) => {
            if (g.title === group.title) {
              shouldShow = false;
            }
          });

          if (shouldShow)
            return (
              <option key={group.title + index} value={group.id}>
                {group.title}
              </option>
            );
          else {
            return null;
          }
        })
        .filter(g => g !== null);
      if (groups.length === 0) {
        return (
          <option value="" disabled>
            Vartotojas priklauso visoms grupėms...
          </option>
        );
      } else return groups;
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  onValueChangeHandler = event => {
    this.setState({
      [event.target.name]: [].slice
        .call(event.target.selectedOptions)
        .map(option => {
          return option.value;
        })
    });
  };

  onClickAddGroupToUserHandler = () => {
    if (this.state.selectedAddGroup === "") {
      return;
    }
    let groupIdList = {
      id: []
    };
    this.state.selectedAddGroup.forEach(el => {
      groupIdList.id.push(el);
    });
    Axios.put(
      "/api/users/" + this.props.match.params.username + "/groups",
      groupIdList
    )
      .then(res => {
        if (groupIdList.id.length === 1) {
          this.props.showResponseMessage(
            "Grupė sėkmingai pridėta",
            "success",
            2500
          );
        } else {
          this.props.showResponseMessage(
            "Grupės sėkmingai pridėtos",
            "success",
            2500
          );
        }
        this.getAllUserGroups();
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  onClickRemoveGroupFromUserHandler = () => {
    console.log(this.props.match.params.username);
    if (this.state.selectedRemoveGroup === "") {
      return;
    }
    let groupIdList = {
      id: []
    };
    this.state.selectedRemoveGroup.forEach(el => {
      groupIdList.id.push(el);
    });
    Axios.delete("/api/users/" + this.props.match.params.username + "/groups", {
      data: groupIdList
    })
      .then(res => {
        if (groupIdList.id.length === 1) {
          this.props.showResponseMessage(
            "Grupė sekmingai pašalinta",
            "success",
            2500
          );
        } else {
          this.props.showResponseMessage(
            "Grupės sekmingai pašalintos",
            "success",
            2500
          );
        }
        this.getAllUserGroups();
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  render() {
    if (this.state.user.admin) {
      return <ResourceNotFoundComponent />;
    } else
      return (
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <div className="col-lg-12 mb-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="h6 text-uppercase mb-0">
                      Grupių priskyrimas
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-md-3 form-control-label">
                        Visos esamos grupės
                      </label>
                      <div className="col-md-9 ml-auto select">
                        <select
                          className="form-control rounded"
                          multiple
                          size="5"
                          onChange={this.onValueChangeHandler}
                          name="selectedAddGroup"
                        >
                          {this.showAvailableGroups()}
                        </select>
                      </div>

                      <ButtonComponent
                        onClick={() => this.onClickAddGroupToUserHandler()}
                        type="submit"
                        value="Pridėti"
                        className="btn submitButton"
                      />
                    </div>
                  </div>
                  <div className="line" />
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-md-3 form-control-label">
                        Vartotojo grupės
                      </label>
                      <div className="col-md-9 ml-auto select">
                        <select
                          className="form-control rounded"
                          multiple
                          size="5"
                          onChange={this.onValueChangeHandler}
                          name="selectedRemoveGroup"
                        >
                          {this.showAllUserGroups()}
                        </select>
                      </div>

                      <ButtonComponent
                        onClick={() => this.onClickRemoveGroupFromUserHandler()}
                        type="submit"
                        value="Ištrinti"
                        className="btn deleteButton"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      );
  }
}
