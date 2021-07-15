import React, { Suspense, lazy } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { jss, theme } from "./theme/customTheme";
import { StylesProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from "./pages/customer/ProductsList";
import IsLoading from "./components/IsLoading";
import Cards from "./pages/customer/Cards";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/admin/LogIn";
import { ToastContainer } from "react-toastify";

const PanelProducts = lazy(() => import("./pages/admin/panel/PanelProducts"));
const PanelSupply = lazy(() => import("./pages/admin/panel/PanelSupply"));
const PanelOrders = lazy(() => import("./pages/admin/panel/PanelOrders"));

function App() {
  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<IsLoading />}>
            <ToastContainer />
            <Router>
              <Switch>
                <Route path="/" exact component={ProductsList} />
                <Route path="/cards" exact component={Cards} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/login" exact component={LogIn} />
                <Route path="/panelproducts" exact component={PanelProducts} />
                <Route path="/panelsupply" exact component={PanelSupply} />
                <Route path="/panelOrders" exact component={PanelOrders} />
                <Route path="*" exact component={NotFound} />
              </Switch>
            </Router>
          </Suspense>
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
