import React, { useState, useEffect } from "react";
import IsLoading from "../components/IsLoading";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/actions";

const WithLoading = (WrappedComponent, action) => {
  const WithLoadingComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts);
    let history = useHistory();

    useEffect(() => {
      const getData = async () => {
        const dataFromServer = await fetchData();
        setData(dataFromServer);
        setIsLoading(false);
        dispatch(getProducts());
      };
      getData();
    }, []);

    const fetchData = async () => {
      let res = await action();
      return res;
    };

    if (isLoading) {
      return <IsLoading />;
    } else {
      return <WrappedComponent data={data} products={products} {...props} />;
    }
  };
  return WithLoadingComponent;
};

export default WithLoading;
