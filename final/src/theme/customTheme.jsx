import { createMuiTheme, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import "../index.css";
import "../assets/styles.scss";

export const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
export const theme = createMuiTheme({
  direction: "rtl",
  typography: {
    fontFamily: ["Vazir"],
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#192d50",
    },
    secondary: {
      main: "#ffcc80",
    },
    background: {
      default: "#f7f6f7",
    },
    text: {
      color: "#030b15",
    },
  },
});
