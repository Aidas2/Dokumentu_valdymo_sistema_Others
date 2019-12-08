import React from "react";
import NavigationLink from "./NavigationLink";
import { withRouter } from "react-router";
import ResponseMessage from "../Utilities/ResponseMessage";

class HeaderSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.showMenu = true;
    this.state = { menuClass: "sidebar py-3" };
  }

  toggleMenu = () => {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.setState({ menuClass: "sidebar py-3 show" });
    } else {
      this.setState({ menuClass: "sidebar py-3 shrink" });
    }
  };

  render() {
    let date = new Date();

    return (
      <React.Fragment>
        <header className="header">
          <nav className="navbar navbar-expand-lg px-4 py-2 shadow background">
            <div
              onClick={() => this.toggleMenu()}
              className="sidebar-toggler text-gray-600 mr-4 mr-lg-5 "
            >
              <i className="flag-lt">
                <img src={"/image/logo.png"} alt="flag" />
              </i>
            </div>
            <div className="font-weight-bold text-uppercase ">
              {this.props.title}
            </div>
            <ul className="ml-auto d-flex align-items-center list-unstyled mb-0">
              <li className="nav-item dropdown ml-auto">
                <div
                  id="userInfo"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle"
                >
                  <img
                    src={this.props.avatar}
                    alt="avatar"
                    style={{ maxWidth: "2.5rem" }}
                    className="img-fluid rounded-circle shadow"
                  />
                </div>
                <div aria-labelledby="userInfo" className="dropdown-menu">
                  <div className="dropdown-item">
                    <strong className="d-block text-uppercase headings-font-family">
                      {this.props.user.firstname +
                        " " +
                        this.props.user.lastname}
                    </strong>
                    <small>{this.props.role}</small>
                  </div>
                  {this.props.user.admin ? (
                    ""
                  ) : (
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        this.props.history.push("/user/profile");
                      }}
                    >
                      Profilis
                    </div>
                  )}

                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={() => this.props.logout()}
                  >
                    Atsijungti
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </header>
        <div className="d-flex align-items-stretch ">
          <div id="sidebar" className={this.state.menuClass}>
            <ResponseMessage>
              <NavigationLink navigation={this.props.nav} {...this.props} />
            </ResponseMessage>
          </div>
          {this.props.children}
        </div>
        <footer className="footer">
          <nav className="navbar navbar-expand-lg px-4 py-5 shadow background  d-flex justify-content-center">
            <div className="font-weight-bold">
              © {date.getFullYear()} Akademija.IT Visos teisės saugomos.
            </div>
          </nav>
        </footer>
      </React.Fragment>
    );
  }
}

export default withRouter(HeaderSideBar);
