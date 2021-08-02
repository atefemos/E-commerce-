import React, { Suspense, lazy } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { jss, theme } from "./theme/customTheme";
import { StylesProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IsLoading from "./components/IsLoading";
import Carts from "./pages/customer/Carts";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/admin/LogIn";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Payment from "./pages/customer/Payment";
import Successful from "./pages/customer/Successful";
import UnSuccessful from "./pages/customer/UnSuccessful";

//------Lazy Load------

const PanelProducts = lazy(() => import("./pages/admin/panel/PanelProducts"));
const PanelSupply = lazy(() => import("./pages/admin/panel/PanelSupply"));
const PanelOrders = lazy(() => import("./pages/admin/panel/PanelOrders"));
const ProductsList = lazy(() => import("./pages/customer/ProductsList"));
const ProductDetail = lazy(() => import("./pages/customer/ProductDetail"));
const Category = lazy(() => import("./pages/customer/Category"));

function App() {
  return (
    <React.Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<IsLoading />}>
            <ToastContainer
              className="toast_right"
              autoClose={2000}
              position="top-left"
            />
            <Router>
              <Switch>
                <Route path="/" exact component={ProductsList} />
                <Route path="/cards" exact component={Carts} />
                <Route path="/products/:id" exact component={ProductDetail} />
                <Route path="/category/:name" exact component={Category} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/successful" exact component={Successful} />
                <Route path="/unsuccessful" exact component={UnSuccessful} />
                <Route path="/login" exact component={LogIn} />
                <ProtectedRoute
                  path="/panelproducts"
                  exact
                  component={PanelProducts}
                />
                <ProtectedRoute
                  path="/panelsupply"
                  exact
                  component={PanelSupply}
                />
                <ProtectedRoute
                  path="/panelOrders"
                  exact
                  component={PanelOrders}
                />
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
