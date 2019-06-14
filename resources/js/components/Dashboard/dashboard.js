import React from "react";

const dashboard = () => {
    return (
        <section id="main">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group marginbottom">
                            <a
                                href="/dashboard"
                                className="list-group-item list-group-item-action active main-color-bg"
                            >
                                <i className="fas fa-cogs" /> Dashboard
                            </a>
                            <a
                                href="#pages"
                                className="list-group-item list-group-item-action"
                            >
                                <i className="fas fa-list-alt" /> Pages
                                <span className="badge badge-dark float-right m-2">
                                    12
                                </span>
                            </a>
                            <a
                                href="#posts"
                                className="list-group-item list-group-item-action"
                            >
                                <i className="fas fa-pen" /> Posts
                                <span className="badge badge-dark float-right m-2">
                                    33
                                </span>
                            </a>
                            <a
                                href="#users"
                                className="list-group-item list-group-item-action"
                            >
                                <i className="fas fa-user" /> Users
                                <span className="badge badge-dark float-right m-2">
                                    203
                                </span>
                            </a>
                        </div>

                        {/* TODO */}

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
                    </div>
                    {/* TODO */}
                    <div className="col-md-9">
                        <div className="card marginbottom">
                            <div className="card-header main-color-bg">
                                Website Overview
                            </div>
                            <div className="card-body">
                                <div className="card-deck">
                                    <div className="card dash-box">
                                        <div className="card-body">
                                            <h2>
                                                <i className="fas fa-user" />{" "}
                                                203
                                            </h2>
                                            <h4>Users</h4>
                                        </div>
                                    </div>
                                    <div className="card dash-box">
                                        <div className="card-body">
                                            <h2>
                                                <i className="fas fa-list-alt" />{" "}
                                                12
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default dashboard;
