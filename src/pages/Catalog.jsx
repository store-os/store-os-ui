import React, { useState, useEffect } from 'react';
import SCard from "../components/SCard";
import axios from 'axios';

const Catalog = () => {
  const [data, setData] = useState({ products: [] });
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/v1/products',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.products.map(item => (
        <SCard
          title={item.title}
          brand=""
          hoverable={true}
          price={item.price}
          cover={item.images[0]}
          available={item.available}
          details={item.mini_description}
          productId={item.id}
        ></SCard>
      ))}
    </div>
  );
};

export default Catalog;
