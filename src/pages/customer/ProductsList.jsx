import { Paper } from "@material-ui/core";
import * as React from "react";
import MainHeader from "../../components/MainHeader";
import { makeStyles, styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { theme } from "../../theme/customTheme";
import { Grid } from "@material-ui/core";
import BasicCard from "../../components/BasicCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../store/actions/productsActions";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  paper: {
    backgroundColor: "#e3edf7",
  },
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: "5px",
    boxShadow:
      "6px 6px 10px -1px rgba(0, 0, 0,0.15),-6px -6px 10px -1px rgba(255,255,255,0.7)",
    border: "1px solid rgba(0,0,0,0.02)",
  },
  typo: {
    marginBottom: theme.spacing(2),
  },
  scroll: {
    overflowX: "scroll",
    flexWrap: "nowrap",
  },
});

const ProductsList = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const dress = products.filter((item) => item.category === "پوشاک");
  const bag = products.filter((item) => item.category === "کیف");
  const showes = products.filter((item) => item.category === "کفش");
  const accessory = products.filter((item) => item.category === "اکسسوری");

  const classes = useStyle();
  return (
    <Paper className={classes.paper}>
      <MainHeader />
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          پوشاک
        </Typography>
        <Grid container spacing={2} className={classes.scroll}>
          {dress.slice(0, 3).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <BasicCard
                txtTitle={item.name}
                txtPrice={`${item.price} تومان`}
                txtUrl={item.url}
                onClick={() => history.push(`/products/${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          کیف
        </Typography>
        <Grid container spacing={2} className={classes.scroll}>
          {bag.slice(0, 3).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <BasicCard
                txtTitle={item.name}
                txtPrice={`${item.price} تومان`}
                txtUrl={item.url}
                onClick={() => history.push(`/products/${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          کفش
        </Typography>
        <Grid container spacing={2} className={classes.scroll}>
          {showes.slice(0, 3).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <BasicCard
                txtTitle={item.name}
                txtPrice={`${item.price} تومان`}
                txtUrl={item.url}
                onClick={() => history.push(`/products/${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container className={classes.root}>
        <Typography variant="h3" className={classes.typo}>
          اکسسوری
        </Typography>
        <Grid container spacing={2} className={classes.scroll}>
          {accessory.slice(0, 3).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <BasicCard
                txtTitle={item.name}
                txtPrice={`${item.price} تومان`}
                txtUrl={item.url}
                onClick={() => history.push(`/products/${item.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
};

export default ProductsList;
