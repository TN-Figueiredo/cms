import React, { Component } from "react";
import { connect } from "react-redux"

// Components
import DashboardComponent from "../../components/Dashboard/dashboard";

// Actions
import * as actionTypes from "../../store/actions"

// Styles
import "./Dashboard.css"

class Dashboard extends Component {
    componentWillMount() {
        document.title = "Admin Area | Dashboard";
        this.props.onFetchAllArticles();
    }

    render() {
        return (
            <div className="Dashboard">
                <DashboardComponent />
            </div>
        );
    }
}

const mapStateToProps = ({ auth, article }) => {
    return {
        auth: auth,
        article: article
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchAllArticles: () => dispatch(actionTypes.fetchAllArticles())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
