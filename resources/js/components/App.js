import React from "react";
import { Route, Switch } from "react-router-dom";

const App = () => {
    return (
        <Switch>
            <Route path="/dashboard" render={() => <h1>Dashboard</h1>} />
            <Route path="/" render={() => <h1>/</h1>} />
        </Switch>
    );
};

export default App;
