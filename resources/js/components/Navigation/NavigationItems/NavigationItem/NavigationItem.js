import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = props => {
  return (
    <li className="nav-item active">
      <NavLink className={props.classes} to={props.link} exact={props.exact}>{props.children}</NavLink>
    </li>
  );
};

export default NavigationItem;
