import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    height: "25px",
    [theme.breakpoints.up("sm")]: {
      height: "30px",
    },
    [theme.breakpoints.up("md")]: {
      height: "50px",
    },
    margin: theme.spacing(3, 0, 2),
    borderRadius: 5,
    boxShadow:
      "6px 6px 10px -1 rgba(0, 0, 0, 0.2),-6px -6px 10px -1 rgba(255, 255, 255, 0.5)",
    border: "1px solid rgba(0,0,0,0.0)",
    "&:hover": {
      boxShadow:
        "inset 4px 4px 6px -1px rgba(0,0,0,0.2),inset -4px -4px 6px -1px rgba(255,255,255,0.7),-0.5px -0.5px 0 rgba(255,255,255,1),0.5px 0.5px 0 rgba(0,0,0,0.15),0px 12px 10px -10px rgba(0,0,0,0.05)",
      backgroundColor: theme.palette.paper.main,
      border: "1px solid rgba(0,0,0,0.01)",
      "&:focus, &:active": {
        backgroundColor: theme.palette.paper.main,
        border: "1px solid rgba(0,0,0,0.01)",
        boxShadow:
          "inset 4px 4px 6px -1px rgba(0,0,0,0.2),inset -4px -4px 6px -1px rgba(255,255,255,0.7),-0.5px -0.5px 0 rgba(255,255,255,1),0.5px 0.5px 0 rgba(0,0,0,0.15),0px 12px 10px -10px rgba(0,0,0,0.05)",
        color: "white",
      },
    },
  },
}));

const Btn = ({ text, color, onClick, href }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.submit}
      color={color}
      href={href}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Btn;
