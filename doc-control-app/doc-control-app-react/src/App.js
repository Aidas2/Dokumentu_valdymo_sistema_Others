import React, { Component } from "react";
import Authentication from "./components/Authentication/Authentication";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/style.default.css";
import "./css/custom.css";
import "popper.js";
import "bootstrap";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    Axios.interceptors.response.use(null, function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
        delete Axios.defaults.headers.Authorization;
        return <Route path="/" render={props => <Authentication {...props} />} />
      }
      return Promise.reject(error);
    });
  }
  render() {
    return (
      <Router>
        <Route path="/" render={props => <Authentication {...props} />} />
      </Router>
    );
  }
}

export default App;
