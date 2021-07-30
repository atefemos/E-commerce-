import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import MainHeader from "../../components/MainHeader";
import { getAProduct } from "../../store/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Btn from "../../components/Btn";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { theme } from "../../theme/customTheme";
import { storeInLocalStorage } from "../../utils/cartLocalStorage";

//------set styles------
const useStyle = makeStyles({
  paper: {
    backgroundColor: "#e3edf7",
  },
  root: {
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  image: {
    height: "auto",
    width: 280,
    margin: theme.spacing(3),
  },
  btn: {
    border: "1px solid black",
  },
  badge: {
    padding: theme.spacing(3),
    fontSize: 16,
  },
  typo: {
    margin: theme.spacing(3),
  },
  flex: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: theme.spacing(3),
  },
});

const ProductDetail = () => {
  const classes = useStyle();
  const { id } = useParams();

  //------redux------
  const item = useSelector((state) => state.allProducts.selectedProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAProduct(id));
  }, []);

  const [count, setCount] = useState(null);

  return (
    <Paper className={classes.paper}>
      <MainHeader />
      <CardActionArea className={classes.root}>
        <div className={classes.flex}>
          <div>
            <CardMedia
              image={item?.url}
              className={classes.image}
              title="image of a product"
            />
          </div>
          <div>
            <Typography varient="h3" className={classes.typo}>
              {item?.name}
            </Typography>
            <Typography varient="h3" className={classes.typo}>
              {item?.category}
            </Typography>
            <Typography varient="body" className={classes.typo}>
              {item?.detail}
            </Typography>
            <div className={classes.flex}>
              <Button
                aria-label="reduce"
                className={classes.btn}
                onClick={() => {
                  setCount(Math.max(count - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Badge className={classes.badge}>{count}</Badge>
              <Button
                aria-label="increase"
                className={classes.btn}
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
              <Typography varient="h3" className={classes.typo}>
                {Number(item?.price).toLocaleString()} تومان
              </Typography>
            </div>
          </div>
        </div>
        <Btn
          text="افزودن به سبد خرید"
          color={"primary"}
          onClick={() => storeInLocalStorage("carts", `${item.id}`, { item })}
        />
      </CardActionArea>
    </Paper>
  );
};

export default ProductDetail;
