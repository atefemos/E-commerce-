import { createMuiTheme, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import "../index.css";

export const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["IranSanse"],
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#192d50",
    },
    secondary: {
      main: "#ffcc80",
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
  fontSize: "1.1rem",
  "@media (min-width:600px)": {
    fontSize: "1.3rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};
