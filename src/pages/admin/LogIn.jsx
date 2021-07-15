import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Btn from "../../components/Btn";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../api/login";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Paliz Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
    padding: theme.spacing(6),
    boxShadow: " 5px 5px 10px #b6a9a9, -5px -5px 10px #ffffff",
    borderRadius: "15px",
    border: "1px solid rgba(0,0,0,0.0)",
  },

  field: {
    borderRadius: "15px",
  },
}));

const LogIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password)) {
      login(email, password)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          history.push("/panelproducts");
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("لطفا ایمیل و پسورد خود را وارد کنید!");
    }
  };

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon fontSize={"large"} />
        </Avatar>
        <Typography component="h1" variant="h3">
          ورود به پنل مدیریت کالا
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="ایمیل یا نام کاربری"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Btn text={"ورود"} color="primary" />
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                یادآوری رمز عبور
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                صفحه اصلی
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={10}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default LogIn;
