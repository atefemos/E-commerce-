import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme/customTheme";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import "../assets/styles.scss";
import Button from "../components/Button";
import { ButtonGroup } from "@material-ui/core";

const useStyle = makeStyles({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 3),
    position: "fixed",
  },
});
const AdminHeader = () => {
  const classes = useStyle();
  return (
    <AppBar className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography component="h1" variant="h3" color={"secondary"}>
            پنل مدیریت فروشگاه
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <ButtonGroup
            variant="text"
            color="paper"
            aria-label="contained primary button group"
          >
            <Button text={"کالاها"} />
            <Button text={"موجوی و قیمت ها"} />
            <Button text={"سفارش"} />
          </ButtonGroup>
        </Box>
        <Box>
          <Link to={"/"} className="link">
            <Button text={"بازگشت به صفحه اصلی"} color={"paper"} />
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
};

export default AdminHeader;
