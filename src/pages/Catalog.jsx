import React, { useState, useEffect } from "react";
import SCard from "../components/SCard";
import axios from "axios";
import { Row, Col, Layout } from "antd";
import styled from "styled-components";
import SCategories from "../components/SCategories";

const { Sider, Content } = Layout;

const Catalog = ({location}) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        location.search
          ? process.env.REACT_APP_PRODUCTS_URL + location.search
          : process.env.REACT_APP_PRODUCTS_URL
      );

      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {data && (
        <Layout>
          <Sider width="20%" theme="light">
            <SCategories
              categories={data.aggregations.categories.buckets}
            ></SCategories>
          </Sider>
          <MainContent>
            <Row gutter={[48, 48]}>
              { console.log({data}) }
              {data.products.map((item) => (
                <Col key={item.id} span={6}>
                  <SCard
                    title={item.title}
                    brand=""
                    hoverable={true}
                    price={item.price}
                    url={item.url}
                    discount={item.final_price}
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
      )}
    </React.Fragment>
  );
};

const MainContent = styled(Content)`
  padding: 36px;
`;

export default Catalog;
