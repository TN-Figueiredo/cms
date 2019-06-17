import React, { Fragment } from "react";

import NavigationItem from "./NavigationItem/NavigationItem";

const DashboardSidebarItems = () => {
    let stylesLink = "list-group-item list-group-item-action";
    let stylesSpan = "badge badge-dark float-right m-2";
    return (
        <Fragment>
            <div className="list-group list-unstyled">
                <NavigationItem link="/dashboard" classes={stylesLink + " active main-color-bg"}>
                    <i className="fas fa-cogs" /> Dashboard
                </NavigationItem>
                <NavigationItem link="/dashboard/pages" classes={stylesLink}>
                    <i className="fas fa-list-alt" /> Pages
                    <span className={stylesSpan}>12</span>
                </NavigationItem>
                <NavigationItem link="#posts" classes={stylesLink}>
                    <i className="fas fa-pen" /> Posts
                    <span className={stylesSpan}>33</span>
                </NavigationItem>
                <NavigationItem link="#users" classes={stylesLink}>
                    <i className="fas fa-user" /> Users
                    <span className={stylesSpan}>203</span>
                </NavigationItem>
            </div>


            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Disk Space Used</h4>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "60%" }}
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            60%
                        </div>
                    </div>
                    <h4 className="card-title">Bandwidth Used</h4>
                    <div className="progress">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: "40%" }}
                            aria-valuenow="40"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            40%
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardSidebarItems;
