import React, { Component } from "react";
import { Link } from "react-router-dom";
import avatar from "../../css/avatar.png";

export default class AdminNav extends Component {
  constructor(props) {
    super(props);
    this.showMenu = true;
    this.state = { showMenu: "sidebar py-3" };
  }

  toggleMenu = () => {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.setState({ showMenu: "sidebar py-3 show" });
    } else {
      this.setState({ showMenu: "sidebar py-3 shrink" });
    }
  };

  render() {
    let data = JSON.parse(localStorage.getItem("user"));
    let role = data.admin ? "Administratorius" : "Paprastas vartotojas";
    return (
      <React.Fragment>
        <header className="header">
          <nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
            <div
              onClick={() => this.toggleMenu()}
              className="sidebar-toggler text-gray-600 mr-4 mr-lg-5 "
            >
              <i className="fas fa-archway" />
            </div>
            <div className="font-weight-bold text-uppercase ">
              Dokumentu valdymas
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
                    src={avatar}
                    alt="Jason Doe"
                    style={{ maxWidth: "2.5rem" }}
                    className="img-fluid rounded-circle shadow"
                  />
                </div>
                <div aria-labelledby="userInfo" className="dropdown-menu">
                  <div className="dropdown-item">
                    <strong className="d-block text-uppercase headings-font-family">
                      {data.firstname + " " + data.lastname}
                    </strong>
                    <small>{role}</small>
                  </div>
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

        <div className="d-flex align-items-stretch">
          <div id="sidebar" className={this.state.showMenu}>
            <div className="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family">
              <i className="fas fa-tools fa-3x" />
            </div>
            <ul className="sidebar-menu list-unstyled">
              <Link to="/" style={{ textDecoration: "none" }}>
                <li className="sidebar-list-item">
                  <div className="sidebar-link text-muted">
                    <i className="fas fa-users mr-3 text-gray" />
                    <span>Pagrindinis</span>
                  </div>
                </li>
              </Link>
              <Link to="/users/add" style={{ textDecoration: "none" }}>
                <li className="sidebar-list-item">
                  <div className="sidebar-link text-muted">
                    <i className="fas fa-user mr-3 text-gray" />
                    <span>Naujas vartotojas</span>
                  </div>
                </li>
              </Link>

              <Link to="/groups/add" style={{ textDecoration: "none" }}>
                <li className="sidebar-list-item">
                  <div className="sidebar-link text-muted">
                    <i className="fas fa-clipboard-list  mr-3 text-gray" />
                    <span>Grupės</span>
                  </div>
                </li>
              </Link>
              <Link to="/types/add" style={{ textDecoration: "none" }}>
                <li className="sidebar-list-item">
                  <div className="sidebar-link text-muted">
                    <i className="fas fa-file-signature mr-3 text-gray" />
                    <span>Dokumentų tipai</span>
                  </div>
                </li>
              </Link>
              <Link to="/groups/types" style={{ textDecoration: "none" }}>
                <li className="sidebar-list-item">
                  <div className="sidebar-link text-muted">
                    <i className="fas fa-clipboard  mr-3 text-gray" />
                    <span>Grupių rūšys</span>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          {this.props.children}
        </div>

        {/* <div className="wrapper">
          <nav id="sidebar" className={this.state.showMenu ? "active" : ""}>
            <div className="sidebar-header">
              <h1>Dokumentų tvarkymas </h1>
            </div>

            <ul className="list-unstyled components">
              <p>Administratorius</p>
              <hr />
              <li>
                <Link to="/">
                  <div className="btn btn-info my-1">
                    <i className="fas fa-id-card left">Visi vartotojai</i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/users/add">
                  <div className="btn btn-info my-1">
                    <i className="fas fa-file-signature left">
                      Naujas Vartotojas
                    </i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/groups/add">
                  <div className="btn btn-info my-1">
                    <i className="fas fa-file-alt left">Nauja grupė</i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/document_types/add">
                  <div className="btn btn-info my-1">
                    <i className="fas fa-file-alt left">
                      Naujas dokumento tipas
                    </i>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/document_types/groups">
                  <div className="btn btn-info my-1">
                    <i className="fas fa-file-alt left">
                      Dokumentų tipų grupės
                    </i>
                  </div>
                </Link>
              </li>
            </ul>

            <hr />
          </nav>

          <div id="contentz">
            <nav className="navbar navbar-default ">
              <div className="d-flex">
                <button
                  onClick={() => this.changeState()}
                  type="button"
                  id="sidebarCollapse"
                  className="btn btn-info navbar-btn"
                >
                  <i className="fas fa-bars" />
                  <span> Meniu</span>
                </button>
                <div className="p-2 flex-fill bd-highlight" />
              </div>
              <div className="navbar-header">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.props.logout()}
                >
                  <span>
                    <i className="fas fa-sign-out-alt" />
                    Atsijungti
                  </span>
                </button>
              </div>
            </nav>
            {this.props.children}
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}
