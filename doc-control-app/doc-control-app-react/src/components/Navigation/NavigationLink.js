import React from "react";
import NavLink from "../../components/Utilities/Navigation/NavLink";
import ZipDownloadHandler from "../DownloadAttachments/ZipDownloadHandler";
import CsvDownloadHandler from "../DownloadAttachments/CsvDownloadHandler";
export default function NavigationLink(props) {
  // evepront.preventDefault();
  let allLinks = () => {
    let data = props.navigation.map((nav, index) => {
      let topTab = nav.topTab ? (
        <li className="sidebar-list-item ml-2 my-3">
          <i className={nav.topTab.icon} />
          <span>{nav.topTab.title}</span>
        </li>
      ) : null;
      let bottomTab = nav.bottomTab ? <div className="line" /> : null;
      return nav.type !== "dropdown" ? (
        <React.Fragment key={`nav-${index}`}>
          {topTab}
          <NavLink to={nav.to} style={{ textDecoration: "none" }}>
            <li className="sidebar-list-item ">
              <div className="sidebar-link text-muted">
                <i className={nav.icon} />
                <span className="mx-auto">{nav.name}</span>
              </div>
            </li>
          </NavLink>
          {bottomTab}
        </React.Fragment>
      ) : (
        <React.Fragment key={`nav-${index}`}>
          {topTab}
          <NavLink to="#" style={{ textDecoration: "none" }}>
            <li className="dropdown sidebar-list-item">
              <div
                className="sidebar-link text-muted"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className={nav.icon} />
                <span className="mx-auto">{nav.name}</span>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {/* <ResponseMessage> */}
                <p
                  className="dropdown-item text-muted"
                  onClick={event => ZipDownloadHandler(event, props)}
                >
                  Atsisiųsti bylas ZIP formatu
                </p>
                {/* </ResponseMessage> */}
                <p
                  className="dropdown-item text-muted "
                  onClick={event => CsvDownloadHandler(event, props)}
                >
                  Atsisiųsti dokumentų sąrašą CSV formatu
                </p>
              </div>
            </li>
          </NavLink>
          {bottomTab}
        </React.Fragment>
      );
    });
    return data;
  };

  return <ul className="sidebar-menu list-unstyled">{allLinks()}</ul>;
}
