import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme/customTheme";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import "../assets/styles.scss";
import Btn from "./Btn";
import { ButtonGroup } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import List from "@material-ui/core/List";

const useStyle = makeStyles({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 3),
    position: "fixed",
  },
  display: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline-flex",
    },
  },
  notDisplay: {
    display: "inline-flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

const AdminHeader = () => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <AppBar className={classes.root}>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography component="h1" variant="h3" color={"secondary"}>
            پنل مدیریت فروشگاه
          </Typography>
        </Box>
        <Box flexGrow={0.5}>
          <ButtonGroup
            size="small"
            color="primary"
            aria-label="small outlined primary button group"
            className={classes.display}
          >
            <Btn text={"کالاها"} href="/panelproducts" />
            <Btn text={"موجوی و قیمت ها"} href="/panelsupply" />
            <Btn text={"سفارش"} href="/panelOrders" />
          </ButtonGroup>
        </Box>
        <Box className={classes.notDisplay}>
          <Btn text={"منو"} onClick={toggleDrawer} />
        </Box>
        <Box m={0.5}>
          <Link to={"/"} className="link">
            <Btn text={"پالیز"} color={"paper"} />
          </Link>
        </Box>
      </Box>
      {open && (
        <List>
          {["کالاها", "موجودی و قیمت ها", "سفارش ها"].map((text, index) => (
            <ListItem button key={text} className={classes.notDisplay}>
              <ListItemIcon>
                {index === 0 && (
                  <Link to="/panelproducts">
                    <ShoppingBasketIcon color={"secondary"} />
                  </Link>
                )}
                {index === 1 && (
                  <Link to="/panelsupply">
                    <AddShoppingCartIcon color={"secondary"} />
                  </Link>
                )}
                {index === 2 && (
                  <Link to="/panelOrders">
                    <ShoppingCartIcon color={"secondary"} />
                  </Link>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      )}
    </AppBar>
  );
};

export default AdminHeader;
