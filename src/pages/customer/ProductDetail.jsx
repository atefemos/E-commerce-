import React, { useEffect } from "react";
import {
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

const useStyle = makeStyles({
  paper: {
    backgroundColor: "#e3edf7",
  },
  image: {
    height: 400,
  },
});

const ProductDetail = () => {
  const classes = useStyle();
  const { id } = useParams();
  const product = useSelector((state) => state.allProducts.selectedProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAProduct(id));
  }, []);

  return (
    <Paper className={classes.paper}>
      <MainHeader />
      <CardActionArea>
        <div>
          <CardMedia
            image={product?.url}
            className={classes.image}
            title="image of a product"
          />
        </div>
        <div>
          <Typography varient="h3">{product?.name}</Typography>
          <Typography varient="h3">{product?.category}</Typography>
          <Typography varient="body">{product?.detail}</Typography>
          <Typography varient="h3">{product?.price} تومان</Typography>
        </div>
        <Btn text="افزودن به سبد خرید" color={"primary"} />
      </CardActionArea>
    </Paper>
  );
};

export default ProductDetail;
