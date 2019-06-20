import React, { Fragment } from "react";

export default function WebsiteOverview() {
    return (
        <Fragment>
            <div className="">
                <div className="card-header main-color-bg">
                    Website Overview
                </div>
                <div className="card-body">
                    <div className="card-deck">
                        <div className="card dash-box">
                            <div className="card-body">
                                <h2>
                                    <i className="fas fa-user" /> 203
                                </h2>
                                <h4>Users</h4>
                            </div>
                        </div>
                        <div className="card dash-box">
                            <div className="card-body">
                                <h2>
                                    <i className="fas fa-list-alt" /> 12
                                </h2>
                                <h4>Pages</h4>
                            </div>
                        </div>
                        <div className="card dash-box">
                            <div className="card-body">
                                <h2>
                                    <i className="fas fa-pen" /> 33
                                </h2>
                                <h4>Posts</h4>
                            </div>
                        </div>
                        <div className="card dash-box">
                            <div className="card-body">
                                <h2>
                                    <i className="far fa-chart-bar" />
                                    12,334
                                </h2>
                                <h4>Visitors</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Users */}

            <div className="card">
                <div className="card-header">Latest Users</div>
                <div className="card-body">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Jill Smith</td>
                                <td>jillsmith@gmail.com</td>
                                <td>Dec 12, 2016</td>
                            </tr>
                            <tr>
                                <td>Eve Jackson</td>
                                <td>ejackson@yahoo.com</td>
                                <td>Dec 13, 2016</td>
                            </tr>
                            <tr>
                                <td>John Doe</td>
                                <td>jdoe@gmail.com</td>
                                <td>Dec 13, 2016</td>
                            </tr>
                            <tr>
                                <td>Stephanie Landon</td>
                                <td>landon@yahoo.com</td>
                                <td>Dec 14, 2016</td>
                            </tr>
                            <tr>
                                <td>Mike Johnson</td>
                                <td>mjohnson@gmail.com</td>
                                <td>Dec 15, 2016</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
}
