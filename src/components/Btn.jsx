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
      "2px 2px 4px 0 rgba(0, 0, 0, 0.4),-2px -2px 4px 0 rgba(255, 255, 255, 0.5)",
    "&:hover": {
      boxShadow:
        " inset 2px 2px 6px 0 rgba(0, 0, 0, 0.4), inset -2px -2px 6px 0 rgba(255, 255, 255, 0.5)",
      "&:focus, &:active": {
        backgroundColor: theme.palette.paper.main,
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
