import React, { Fragment } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavbarItems = props => {
  let navItems = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <NavigationItem link="/" exact classes="nav-link">
          Home
        </NavigationItem>
        <NavigationItem link="/dashboard" exact classes="nav-link">
          Dashboard
        </NavigationItem>
      </ul>
      <ul className="navbar-nav right">
        <li className="nav-item">
          <a className="nav-link" href="#user">
            Welcome, Thiago <span className="sr-only" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Logout
          </a>
        </li>
      </ul>
    </Fragment>
  );
  if (props.dashboard) {
    navItems = (
      <Fragment>
        <ul className="navbar-nav mr-auto">
          <NavigationItem link="/dashboard" exact classes="nav-link">
            Dashboard
          </NavigationItem>
        </ul>
        <ul className="navbar-nav right">
          <li className="nav-item">
            <a className="nav-link" href="#user">
              Welcome, Thiago <span className="sr-only" />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Logout
            </a>
          </li>
        </ul>
      </Fragment>
    );
  }
  return <Fragment>{navItems}</Fragment>;
};

export default NavbarItems;
