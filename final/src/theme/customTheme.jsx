import { createMuiTheme, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";

export const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["IranSanse"],
    fontSize: 12,
  },
  palette: {
    primary: {
      light: "#054288",
      main: "#052357",
      dark: "#030b15",
    },
    secondary: {
      main: "#dfceba",
      dark: "#c59f89",
    },
    paper: {
      main: "#800040",
    },
    background: {
      default: "#f7f6f7",
    },
    text: {
      color: "#030b15",
    },
  },
});

theme.typography.h3 = {
  fontFamily: ["IranSanse"],
  fontSize: "0.8rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.5rem",
  },
};
