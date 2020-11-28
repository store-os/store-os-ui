import React, { useState, useEffect } from "react";
import SCard from "../components/SCard";
import axios from "axios";
import { Row, Col, Layout, Collapse } from "antd";
import styled from "styled-components";
import SCategories from "../components/SCategories";
import SPrice from "../components/SPrice";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

const Catalog = ({ location }) => {
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
          <Sider
            width="20%"
            theme="light"
            style={{ padding: "0 12px", marginTop: "40px" }}
          >
            <Collapse defaultActiveKey={["1", "2"]} ghost extra={<span>325</span>}>
              <Panel header="Categories" key="1">
                <SCategories
                  categories={data.aggregations.categories.buckets}
                ></SCategories>
              </Panel>
              <Panel header="Price" key="2">
                <SPrice
                  max={data.aggregations.maxPrice.value}
                  min={data.aggregations.minPrice.value}
                  range={true}
                />
              </Panel>
            </Collapse>
          </Sider>

          <MainContent>
            <Row gutter={[48, 48]}>
              {console.log({ data })}
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
