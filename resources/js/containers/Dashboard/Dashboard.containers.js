import React, { Component } from "react";

// Components
import DashboardComponent from "../../components/Dashboard/dashboard";


// Styles
import "./Dashboard.css"

class Dashboard extends Component {
    componentWillMount() {
        document.title = "Admin Area | Dashboard";
    }

    render() {
        return (
            <div className="Dashboard">
                <DashboardComponent />
            </div>
        );
    }
}

export default Dashboard;
