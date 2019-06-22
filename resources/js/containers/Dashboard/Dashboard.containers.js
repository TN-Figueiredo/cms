import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route } from "react-router-dom";

// Components
import DashboardSidebarItems from "../../components/Navigation/NavigationItems/DashboardSidebarItems";
import WebsiteOverview from "../../components/Dashboard/WebsiteOverview/WebsiteOverview";
import Articles from "../../components/Dashboard/Articles/Articles";

// Actions
import * as actionTypes from "../../store/actions";

// Styles
import "./Dashboard.css";

class Dashboard extends Component {
    state = {
        section: null
    };
    componentWillMount() {
        document.title = "Admin Area | Dashboard";
        this.props.onFetchAllArticles();
    }

    render() {
        return (
            <div className="Dashboard">
                <section id="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <DashboardSidebarItems articlesMeta={this.props.article.meta} />
                            </div>
                            <div className="col-md-9">
                                <Route
                                    exact
                                    path="/dashboard/articles"
                                    component={Articles}
                                />
                                <Route
                                    exact
                                    path="/dashboard"
                                    component={WebsiteOverview}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, article }) => {
    return {
        auth: auth,
        article: article
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllArticles: () => dispatch(actionTypes.fetchAllArticles())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Dashboard));
