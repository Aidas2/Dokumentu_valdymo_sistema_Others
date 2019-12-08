import React from "react";
import Axios from "axios";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroupsData: [],
      submitDocTypes: [],
      reviewDocTypes: [],
      documentStateCount: {
        data: [],
        submitted: 0,
        rejected: 0,
        approved: 0
      }
    };
  }

  componentDidMount = () => {
    this.getSubmittedDocs();
    this.getUserGroups();
  };

  getUserGroups = () => {
    Axios.get("/api/users/groupDetails")
      .then(res => {
        this.setState({ userGroupsData: res.data }, () => {
          this.setDefaultActiveGroup();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getCreatedDocs = () => {
    Axios.get("/api/docs/user/created")
      .then(res => {
        this.setState({ createdDocs: res.data }, () => {
          this.setDefaultActiveGroup();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getSubmittedDocs = () => {
    Axios.get("/api/docs/user/submitted")
      .then(res => {
        this.setState(
          {
            documentStateCount: {
              ...this.state.documentStateCount,
              data: res.data
            }
          },
          () => {
            this.calculateValues();
            this.setDefaultActiveGroup();
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  calculateValues = () => {
    let submitCount = 0;
    let rejectCount = 0;
    let approveCount = 0;
    let data = this.state.documentStateCount.data.documentList;
    for (let i = 0; i < data.length; i++) {
      if (data[i].documentState === "REJECTED") {
        rejectCount++;
      }
      if (data[i].documentState === "ACCEPTED") {
        approveCount++;
      }
      if (data[i].documentState === "SUBMITTED") {
        submitCount++;
      }
    }
    this.setState({
      documentStateCount: {
        ...this.state.documentStateCount,
        submitted: submitCount,
        rejected: rejectCount,
        approved: approveCount
      }
    });
  };

  setDefaultActiveGroup = () => {
    if (this.state.userGroupsData.length > 0) {
      let data = this.state.userGroupsData;
      let review = data[0].reviewDocTypes;
      let submit = data[0].submitDocTypes;
      data[0].active = true;
      this.setState({
        userGroupsData: data,
        reviewDocTypes: review,
        submitDocTypes: submit
      });
    }
  };

  onGroupClickHandler = number => {
    console.log("Index: ", number);
    let review = [],
      submit = [];
    let data = this.state.userGroupsData.map((userData, index) => {
      if (number === index) {
        userData.active = true;
        review = userData.reviewDocTypes;
        submit = userData.submitDocTypes;
        return userData;
      } else {
        userData.active = false;
        return userData;
      }
    });
    console.log(data);
    this.setState({
      userGroupsData: data,
      submitDocTypes: submit,
      reviewDocTypes: review
    });

    // for (let i = 0; i < newState.length; i++) {
    //   if (i === index) {
    //     newState.active = "active";
    //   }
    //   newState.active = "";
    // }
    // this.setState({ userGroupsData: newState }, () => {
    //   console.log(this.state.userGroupsData);
    // });
  };

  buildNewData = () => {
    let submit =
      this.state.submitDocTypes.length > 0
        ? this.state.submitDocTypes.map((docs, index) => {
            return (
              <span key={index} className="header">
                <i className="calendar check outline blue icon" />
                {docs}
              </span>
            );
          })
        : "Negalite kurti jokių dokumentų";
    let review =
      this.state.submitDocTypes.length > 0
        ? this.state.reviewDocTypes.map((docs, index) => {
            return (
              <span key={index} className="header">
                <i className="calendar check outline blue icon" />
                {docs}
              </span>
            );
          })
        : "Negalite patvirtinti jokių dokumentų";
    let data = this.state.userGroupsData.map((userData, index) => {
      return (
        <div
          key={index}
          className={userData.active ? "item active" : "item"}
          onClick={() => this.onGroupClickHandler(index)}
        >
          {userData.groupTitle}
        </div>
      );
    });
    return (
      <div className="ui grid px-5 py-5">
        <div className="four wide column">
          <div className="ui vertical fluid tabular menu">
            <h3 className="text-center">
              {" "}
              <i className="users icon violet" />
              Grupės
            </h3>
            {data}
          </div>
        </div>

        <div className="twelve wide stretched column">
          <div className="ui segment">
            <div className="header">
              <h3>
                <i className="file word outline purple icon" />
                Dokumentų kūrimas
              </h3>
            </div>
            {/*  */}
            <div className="twelve wide stretched column pt-2">{submit}</div>
            {/*  */}
          </div>
          <div className="ui segment">
            <div className="header">
              <h3>
                <i className="file word outline purple icon" />
                Dokumentų patvirtinimas
              </h3>
            </div>
            {/*  */}
            <div className="twelve wide stretched column pt-2">{review}</div>
            {/*  */}
          </div>
        </div>
      </div>
    );
  };

  buildData = () => {
    let data = this.state.userGroupsData.map((userData, index) => {
      return (
        <div className="item" key={`item-${index}`}>
          <i className="users icon violet" />
          <div className="content">
            <div className="header">{userData.groupTitle}</div>
            <div className="description">Grupė</div>
            <div className="list">
              <div className="item">
                <i className="file word outline purple icon" />
                <div className="content">
                  <div className="header">Dokumentų kūrimas</div>
                  <div className="list">
                    {/*  */}
                    {userData.submitDocTypes.map((type, index) => {
                      return (
                        <div className="item" key={`sub-${index}`}>
                          <i className="edit outline blue  icon" />
                          <div className="content">
                            <div className="header">{type}</div>
                            <div className="description" />
                          </div>
                        </div>
                      );
                    })}
                    {/*  */}
                  </div>
                </div>
              </div>
              <div className="item">
                <i className="file word outline purple icon" />
                <div className="content">
                  <div className="header">Dokumentų patvirtinimas</div>
                  <div className="list">
                    {/*  */}
                    {userData.reviewDocTypes.map((type, index) => {
                      return (
                        <div className="item" key={`rev-${index}`}>
                          <i className="calendar check outline blue icon" />
                          <div className="content">
                            <div className="header">{type}</div>
                            <div className="description" />
                          </div>
                        </div>
                      );
                    })}
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
            <div className="line" />
          </div>
        </div>
      );
    });
    return data;
  };

  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    let userDetails = {
      username: "Unknown",
      firstname: "Unknown",
      lastname: "Unknown",
      email: "Unknown",
      admin: false
    };
    if (user) {
      userDetails = user;
    }
    return (
      <React.Fragment>
        <div className="page-holder w-100 d-flex flex-wrap">
          <div className="container-fluid px-xl-5">
            <section className="pt-5">
              <div className="col-lg-12 mb-5">
                <div className="card">
                  <div className="card-header">
                    <h3 className="h6 text-uppercase mb-0">
                      Vartotojo profilis
                    </h3>
                  </div>

                  <div className="ui four column doubling stackable  grid container">
                    <div className="column">
                      <div className="card-body">
                        <div className="form-group row d-flex px-4">
                          <div className="ui card" style={{ width: "200px" }}>
                            <div className="image">
                              <img
                                src={"/image/profile.png"}
                                height="50px"
                                alt="profile"
                              />
                            </div>
                            <div className="content">
                              <div className="header">{`${
                                userDetails.firstname
                              } ${userDetails.lastname}`}</div>
                              <div className="meta">
                                <span className="date">
                                  {userDetails.admin
                                    ? "Administratorius"
                                    : "Paprastas vartotojas"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card-body">
                        <div className="form-group row d-flex px-4">
                          <div style={{ width: "200px" }}>
                            <div className="ui fluid image">
                              <div className="ui blue ribbon label">
                                <i className="copy outline icon" /> Pateikti{" "}
                                {this.state.documentStateCount.submitted}
                              </div>
                              <img alt="" src={"/image/submitted.png"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card-body">
                        <div className="form-group row d-flex px-4">
                          <div style={{ width: "200px" }}>
                            <div className="ui fluid image">
                              <div className="ui green ribbon label">
                                <i className="copy outline icon" /> Priimti{" "}
                                {this.state.documentStateCount.approved}
                              </div>
                              <img alt="" src={"/image/approved.png"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card-body">
                        <div className="form-group row d-flex px-4">
                          <div style={{ width: "200px" }}>
                            <div className="ui fluid image">
                              <div className="ui red ribbon label">
                                <i className="copy outline icon" /> Atmesti{" "}
                                {this.state.documentStateCount.rejected}
                              </div>
                              <img alt="" src={"/image/rejected.png"} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.buildNewData()}
                </div>
              </div>
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
