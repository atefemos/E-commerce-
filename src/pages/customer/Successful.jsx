import { CardMedia, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import MainHeader from "../../components/MainHeader";
import { theme } from "../../theme/customTheme";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import success from "../../assets/images/success.png";

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

const Successful = () => {
  const classes = useStyle();
  return (
    <Paper className={classes.root}>
      <MainHeader />
      <div className={classes.flex}>
        <CheckCircleIcon color={"primary"} fontSize={"large"} />
        <Typography varient="h3" className={classes.typo}>
          پرداخت موفق
        </Typography>
      </div>
      <CardMedia
        src={success}
        alt="successful payment"
        component="img"
        className={classes.img}
      />
    </Paper>
  );
};

export default Successful;
