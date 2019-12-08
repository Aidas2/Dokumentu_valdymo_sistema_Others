import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class NavLink extends Component {
  render() {
    var isActive =
      this.context.router.route.location.pathname === this.props.to;
    var className = isActive ? "selected" : "";
    return (
      <Link {...this.props}>
        <div className={className}>{this.props.children}</div>
      </Link>
    );
  }
}
NavLink.contextTypes = {
  router: PropTypes.object
};
export default NavLink;
