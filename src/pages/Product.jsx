import {
  useParams
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  let { productId } = useParams();
  const [data, setData] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_PRODUCTS_URL}/${productId}`,
      );
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      {data &&
        <React.Fragment>
          <p>Product: {data.id}</p>
          {data.images.map(image => (
            <img src={image}></img>
          ))}
        </React.Fragment>
      }
    </React.Fragment>
  );
};

export default Product;
