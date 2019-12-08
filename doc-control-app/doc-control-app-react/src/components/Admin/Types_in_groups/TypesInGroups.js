import React, { Component } from "react";
import Axios from "axios";

export default class TypesInGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      doctypes: [],
      submission: [],
      review: [],
      isChecked: false,
      selectedType: null
    };
  }

  //Load data on component mount
  componentDidMount = () => {
    this.getAllDocTypes();
    this.getAllGroups();
  };

  handleReviewCheckBoxClick = e => {
    const options = this.state.review;
    options.forEach(option => {
      if (option.id === e.target.value) {
        option.isChecked = !option.isChecked;
        if (option.isChecked) {
          this.addOneGroupToDocType("review", option.id);
        } else {
          this.removeOneGroupFromDocType("review", option.id);
        }
      }
      this.setState({ review: options });
    });
  };

  handleSubmissionCheckBoxClick = e => {
    const options = this.state.submission;
    options.forEach(option => {
      if (option.id === e.target.value) {
        option.isChecked = !option.isChecked;
        if (option.isChecked) {
          this.addOneGroupToDocType("submission", option.id);
        } else {
          this.removeOneGroupFromDocType("submission", option.id);
        }
      }
      this.setState({ submission: options });
    });
  };

  addOneGroupToDocType = (groupFor, groupID) => {
    let groupIdListToAdd = {
      id: []
    };
    groupIdListToAdd.id.push(groupID);
    Axios.post(
      "/api/doctypes/" + this.state.selectedType + "/groups/" + groupFor,
      groupIdListToAdd
    )
      .then(res => {
        this.props.showResponseMessage("Duomenys atnaujinti", "success", 2500);
        if (groupFor === "review") {
          this.loadReviewGroups(this.state.selectedType);
        } else {
          this.loadSubmmisionGroups(this.state.selectedType);
        }
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida" + err, "danger", 2500)
      );
  };

  removeOneGroupFromDocType = (groupFor, groupID) => {
    let groupIdListToRemove = {
      id: []
    };
    groupIdListToRemove.id.push(groupID);
    Axios.delete(
      "/api/doctypes/" + this.state.selectedType + "/groups/" + groupFor,
      { data: groupIdListToRemove }
    )
      .then(res => {
        this.props.showResponseMessage("Duomenys atnaujinti", "success", 2500);
        if (groupFor === "review") {
          this.loadReviewGroups(this.state.selectedType);
        } else {
          this.loadSubmmisionGroups(this.state.selectedType);
        }
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  //Get all document types from server
  getAllDocTypes = () => {
    Axios.get("/api/doctypes")
      .then(res => {
        this.setState({ doctypes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
  //Get all groups from server
  getAllGroups = () => {
    Axios.get("/api/groups")
      .then(res => {
        this.setState({ groups: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Method to go back in history
  goBack = () => {
    this.props.history.goBack();
  };
  //Show all document types received from server
  showAllDocTypes = () => {
    if (this.state.doctypes.length === 0) {
      return (
        <option value="" disabled>
          Nėra galimų grupių...
        </option>
      );
    } else {
      let docTypeList = this.state.doctypes.map(dt => {
        return (
          <option key={dt.title} value={dt.id}>
            {dt.title}
          </option>
        );
      });
      return docTypeList;
    }
  };
  //Load document's type "review" and "submmit" groups
  loadReviewGroups(type) {
    Axios.get("/api/doctypes/" + type + "/groups/review")
      .then(res => {
        let allList = [];
        this.state.groups.forEach(type => {
          allList.push({ id: type.id, title: type.title, isChecked: false });
        });
        allList.forEach(listEl => {
          res.data.forEach(resEl => {
            if (listEl.id === resEl.id) {
              listEl.isChecked = true;
            }
          });
        });
        this.setState({ review: allList });
      })
      .catch(err => console.log(err));
  }

  loadSubmmisionGroups(type) {
    Axios.get("/api/doctypes/" + type + "/groups/submission")
      .then(res => {
        let allList = [];
        this.state.groups.forEach(type => {
          allList.push({ id: type.id, title: type.title, isChecked: false });
        });
        allList.forEach(listEl => {
          res.data.forEach(resEl => {
            if (listEl.id === resEl.id) {
              listEl.isChecked = true;
            }
          });
        });
        this.setState({ submission: allList });
      })
      .catch(err => console.log(err));
  }

  onSelectTypeHandler = e => {
    this.setState({ selectedType: e.target.value }, () => {
      this.loadReviewGroups(this.state.selectedType);
      this.loadSubmmisionGroups(this.state.selectedType);
    });
  };

  showReviewCheckBoxes = () => {
    if (this.state.groups.length === 0) {
      return <div>Nėra grupių</div>;
    }
    if (this.state.selectedType === null) {
      return <div>Pasirinkite dokumento tipą</div>;
    }
    let data = this.state.review.map(t => {
      return (
        <div className="form-group row" key={t.id}>
          <label className="form-control-label">{t.title}</label>
          <div className="ml-auto">
            <input
              onChange={event => this.handleReviewCheckBoxClick(event)}
              id={t.id}
              type="checkbox"
              value={t.id}
              checked={t.isChecked}
            />
          </div>
        </div>
      );
    });
    return data;
  };

  showSubmissionCheckBoxes = () => {
    if (this.state.groups.length === 0) {
      return <div>Nėra grupių</div>;
    }
    if (this.state.selectedType === null) {
      return <div>Pasirinkite dokumento tipą</div>;
    }
    let data = this.state.submission.map(t => {
      return (
        <div className="form-group row" key={t.id}>
          <label className="form-control-label">{t.title}</label>
          <div className="ml-auto">
            <input
              onChange={event => this.handleSubmissionCheckBoxClick(event)}
              id={t.id}
              type="checkbox"
              value={t.id}
              checked={t.isChecked}
            />
          </div>
        </div>
      );
    });
    return data;
  };

  onClickAddGroups = groupType => {
    console.log("Selected type: ", this.state.selectedType);
    let groupIdListToAdd = {
      id: []
    };
    let groupIdListToRemove = {
      id: []
    };
    if (groupType === "review") {
      this.state.review.forEach(el => {
        if (el.name)
          if (el.isChecked) {
            groupIdListToAdd.id.push(el.id);
          } else {
            groupIdListToRemove.id.push(el.id);
          }
      });
    } else {
      this.state.submission.forEach(el => {
        if (el.isChecked) {
          groupIdListToAdd.id.push(el.id);
        } else {
          groupIdListToRemove.id.push(el.id);
        }
      });
    }
    Axios.delete(
      "/api/doctypes/" + this.state.selectedType + "/groups/" + groupType,
      { data: groupIdListToRemove }
    )
      .then()
      .catch();
    Axios.post(
      "/api/doctypes/" + this.state.selectedType + "/groups/" + groupType,
      groupIdListToAdd
    )
      .then(res => {
        this.props.showResponseMessage("Duomenys atnaujinti", "success", 2500);
        if (groupType === "review") {
          this.loadReviewGroups(this.state.selectedType);
        } else {
          this.loadSubmmisionGroups(this.state.selectedType);
        }
      })
      .catch(err =>
        this.props.showResponseMessage("Įvyko klaida", "danger", 2500)
      );
  };

  handleMessageInput = (message, messageType, timeout) => {
    let data = {
      message: message,
      messageType: messageType,
      show: true
    };
    this.setState({ showMessage: data }, () => {
      let data = {
        message: "",
        messageType: "",
        show: false
      };
      setTimeout(() => {
        this.setState({ showMessage: data });
      }, timeout);
    });
  };

  showMessage = () => {
    if (this.state.showMessage.show) {
      return (
        <div className={this.state.showMessage.messageType}>
          {this.state.showMessage.message}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <div className="col-lg-12 mb-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="h6 text-uppercase mb-0">Dokumentų tipai</h3>
                  </div>
                  <div className="card-body">
                    <div className="form-group row">
                      <label className="col-md-3 form-control-label">
                        Visi dokumentų tipai
                      </label>
                      <div className="col-md-9 ml-auto select">
                        <select
                          className="form-control rounded"
                          size="5"
                          onChange={this.onSelectTypeHandler}
                          name="selectedType"
                        >
                          {this.showAllDocTypes()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="row">
              <div className="col-lg-6 mb-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="h6 text-uppercase mb-0">
                      Dokumentų kūrimui
                    </h3>
                  </div>
                  <div className="card-body">
                    <p>
                      Pasirinkite grupę, kuri galės kurti ir siųsti dokumentus
                      peržiūrai.
                    </p>
                    <div className="col-md-9">
                      <div>
                        <div className="line" />
                        {this.showSubmissionCheckBoxes()}
                      </div>
                      {/* <ButtonComponent
                        onClick={() => this.onClickAddGroups("submission")}
                        type="submit"
                        value="Atnaujinti"
                        className="btn submitButton"
                      />
                      <ButtonComponent
                        onClick={() => this.goBack()}
                        type="submit"
                        value="Grįžti atgal"
                        className="btn goBackButton"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="h6 text-uppercase mb-0">
                      Dokumentų peržiūrai
                    </h3>
                  </div>
                  <div className="card-body">
                    <p>
                      Pasirinkite grupę, kuri galės peržiūrėti pateiktus
                      dokumentus.
                    </p>
                    <div className="col-md-9">
                      <div className="line" />
                      {this.showReviewCheckBoxes()}
                    </div>
                    {/* <ButtonComponent
                      onClick={() => this.onClickAddGroups("review")}
                      type="submit"
                      value="Atnaujinti"
                      className="btn submitButton"
                    />

                    <ButtonComponent
                      onClick={() => this.goBack()}
                      type="submit"
                      value="Grįžti atgal"
                      className="btn goBackButton"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
