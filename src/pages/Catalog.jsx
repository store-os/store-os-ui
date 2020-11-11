import React, { useState, useEffect } from 'react';
import SCard from "../components/SCard";
import axios from 'axios';
import { Row, Col, Layout } from 'antd';
import styled from "styled-components";

const { Sider, Content } = Layout;


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
    <Layout>
      <Sider width="20%">Sider</Sider>
      <MainContent>
        <Row gutter={[48, 48]}>
          {data.products.map(item => (
            <Col span={6}>
              <SCard
                title={item.title}
                brand=""
                hoverable={true}
                price={item.price}
                cover={item.images}
                available={item.available}
                details={`Ref. ${item.id}`}
                productId={item.id}
              ></SCard>
            </Col>
          ))}
        </Row>
      </MainContent>
    </Layout>
  );
};

const MainContent = styled(Content)`
  margin: 36px;
`;

export default Catalog;
