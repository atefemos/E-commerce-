import React from "react";
import "./App.scss";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsList from "./pages/customer/ProductsList";
import Cards from "./pages/customer/Cards";
import Profile from "./pages/customer/Profile";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/admin/LogIn";
import Panel from "./pages/admin/Panel";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: [
    "Vazir"
    ],
 }
});


function App() {
  return (
    <React.Fragment className="App">
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

export default App;
