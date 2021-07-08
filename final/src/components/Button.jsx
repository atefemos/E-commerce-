import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme/customTheme";

const useStyles = makeStyles((theme) => ({
  submit: {
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

const Btn = ({ text, color }) => {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      className={classes.submit}
      color={color}
    >
      {text}
    </Button>
  );
};

export default Btn;
