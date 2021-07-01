import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from "./pages/customer/ProductsList";
import Cards from "./pages/customer/Cards";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <React.Fragment className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={ProductsList} />
          <Route path="/cards" exact component={Cards} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
