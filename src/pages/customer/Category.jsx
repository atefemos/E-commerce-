import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import ListItemText from "@material-ui/core/ListItemText";
import MainHeader from "../../components/MainHeader";
import { Grid, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/actions/productsActions";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BasicCard from "../../components/BasicCard";
import { storeInLocalStorage } from "../../utils/cartLocalStorage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  typo: {
    marginBottom: theme.spacing(2),
  },
}));

const Category = () => {
  const classes = useStyles();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const { name } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const categories = ["پوشاک", "کیف", "کفش", "اکسسوری"];
  const subCats = ["زنانه", "مردانه"];
  const data = products.filter((item) => item.category === name);

  const Icon = ({ item }) => {
    const [selected, setSelected] = useState(false);
    return (
      <ListItemIcon
        onClick={() => {
          history.push(`/category/${item}`);
          setSelected(!selected);
        }}
      >
        {selected ? <TurnedInIcon /> : <TurnedInNotIcon />}
      </ListItemIcon>
    );
  };

  const addCart = (item) => {
    storeInLocalStorage("carts", `${item.id}`, { ...item, count: 1 });
    window.location.reload();
  };

  return (
    <Paper className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <MainHeader />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {categories.map((item, index) => (
              <ListItem key={index}>
                <Icon item={item} />
                {item}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {subCats.map((item, index) => (
              <ListItem key={index}>
                <Icon item={item} />
                {item}
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography varient="h3" className={classes.typo}>
          {name}
        </Typography>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <BasicCard
                txtTitle={item.name}
                txtPrice={`${Number(item.price).toLocaleString()} تومان`}
                txtUrl={item.url}
                onClick={() => history.push(`/products/${item.id}`)}
                addCart={() => addCart(item)}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </Paper>
  );
};

export default Category;
