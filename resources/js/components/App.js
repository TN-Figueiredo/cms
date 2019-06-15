import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Layout from "../hoc/Layout/Layout";
import Dashboard from "../containers/Dashboard/Dashboard.containers";

const App = () => {
    let routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          {/* <Route path="/" component={Main} /> */}
        </Switch>
      );
    return (
        <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
};

export default App;
