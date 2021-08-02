import { CardMedia, Typography } from "@material-ui/core";
import { makeStyles, Paper } from "@material-ui/core";
import React from "react";
import MainHeader from "../../components/MainHeader";
import { theme } from "../../theme/customTheme";
import CancelIcon from "@material-ui/icons/Cancel";
import failed from "../../assets/images/failed.jpg";

const useStyle = makeStyles({
  root: {
    backgroundColor: "#e3edf7",
  },
  typo: {
    margin: theme.spacing(4),
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "50%",
    margin: "0 auto",
  },
});
const UnSuccessful = () => {
  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      <MainHeader />
      <div className={classes.flex}>
        <CancelIcon color={"error"} fontSize={"large"} />
        <Typography varient="h3" className={classes.typo}>
          پرداخت ناموفق
        </Typography>
      </div>
      <CardMedia
        src={failed}
        alt="failed payment"
        component="img"
        className={classes.img}
      />
    </Paper>
  );
};

export default UnSuccessful;
