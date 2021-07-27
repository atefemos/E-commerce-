import { Container, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import MainHeader from "../../components/MainHeader";
import { theme } from "../../theme/customTheme";

const useStyle = makeStyles({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.light,
  },
  typo: {
    margin: theme.spacing(3),
  },
});

const Profile = () => {
  const classes = useStyle();

  return (
    <Paper>
      <MainHeader />
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          نهایی کردن خرید
        </Typography>
      </Container>
    </Paper>
  );
};

export default Profile;
