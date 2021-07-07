import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { jss, theme } from "./theme/customTheme";
import { StylesProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from "./pages/customer/ProductsList";
import Cards from "./pages/customer/Cards";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/admin/LogIn";
import PanelProducts from "./pages/admin/panel/PanelProducts";
import PanelSupply from "./pages/admin/panel/PanelSupply";
import PanelOrders from "./pages/admin/panel/PanelOrders";

function App() {
  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/" exact component={ProductsList} />
              <Route path="/cards" exact component={Cards} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/login" exact component={LogIn} />
              <Route
                path="/login/panelproducts"
                exact
                component={PanelProducts}
              />
              <Route path="/login/panelsupply" exact component={PanelSupply} />
              <Route path="/login/panelOrders" exact component={PanelOrders} />
              <Route path="*" exact component={NotFound} />
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
