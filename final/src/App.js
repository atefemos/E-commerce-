import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from "./pages/customer/ProductsList";
import Cards from "./pages/customer/Cards";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/admin/LogIn";
import Panel from "./pages/admin/Panel";

function App() {
  return (
    <React.Fragment className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={ProductsList} />
          <Route path="/cards" exact component={Cards} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/login/panel" exact component={Panel} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
