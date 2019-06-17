import React from "react";
import NavbarItems from "../NavigationItems/NavbarItems";
import { withRouter } from "react-router-dom";

import Logo from "../../Logo/Logo";

import "./Navbar.css";

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/dashboard">
          <Logo height="33px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <NavbarItems dashboard={props.dashboard} classes="navbar-nav mr-auto" />
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
