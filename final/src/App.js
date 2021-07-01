import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import productsList from "./pages/Customer/productList";

function App() {
  return (
    <React.Fragment className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={productsList} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
