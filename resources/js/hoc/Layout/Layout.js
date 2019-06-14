import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Navbar from "../../components/Navigation/Navbar/Navbar";
import Header from "../../components/Header/Header";

class Layout extends Component {
  state = {
    dashboard: false
  };
  componentWillMount() {
    // console.log(this.props.location.pathname.split("/"));
    if (this.props.location.pathname.split("/")[1] === "dashboard") {
      this.setState(prevState => {
        return { dashboard: !prevState.dashboard };
      });
    } else {
      this.setState({dashboard: false})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.location.pathname.split("/")[1] === "dashboard");
    return this.props.location.pathname.split("/")[1] === "dashboard";
  }

  onClickDashboard = () => {
    this.setState(prevState => {
      return { dashboard: !prevState.dashboard };
    });
  }

  render() {
    console.log(this.state.dashboard);
    return (
      <Fragment>
        <Navbar dashboard={this.state.dashboard} updateDashboard={this.onClickDashboard} />
        <Header />
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
