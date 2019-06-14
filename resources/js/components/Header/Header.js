import React from "react";

import "./Header.css"

const Header = props => {
  return (
    <header id="header">
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h1>
              <i className="fas fa-cogs" /> Dashboard <small>Manage Your site</small>
            </h1>
          </div>
          <div className="col-md-2">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Create Content
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#addpage">
                  Add Page
                </a>
                <a className="dropdown-item" href="#addpost">
                  Add Post
                </a>
                <a className="dropdown-item" href="#adduser">
                  Add User
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
