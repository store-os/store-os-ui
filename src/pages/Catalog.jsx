import React, { useState, useEffect } from "react";
import SCard from "../components/SCard";
import axios from "axios";
import { Row, Col, Layout, Collapse } from "antd";
import styled from "styled-components";
import SCategories from "../components/SCategories";
import SPrice from "../components/SPrice";
import SSort from "../components/SSort";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

let queryPrice = "",
  queryCategories = "",
  querySort = "fieldsort=title.keyword&order=asc";

const Catalog = ({ location }) => {
  const [data, setData] = useState();
  const [fullQuery, setFullQuery] = useState("");
  useEffect(() => {
    async function fetchData() {
      let result;
      if (fullQuery === "") {
        result = await axios(
          location.search
            ? process.env.REACT_APP_PRODUCTS_URL + location.search
            : process.env.REACT_APP_PRODUCTS_URL
        );
      } else {
        result = await axios(
          fullQuery
            ? process.env.REACT_APP_PRODUCTS_URL + fullQuery
            : process.env.REACT_APP_PRODUCTS_URL
        );
      }
      setData(result.data);
    }

    fetchData();
  }, [fullQuery]);

  function applyFilterCategories(evt) {
    console.log(evt);
    queryCategories = evt.query;
    if (queryCategories !== "") {
      setFullQuery(`?${queryCategories}&${queryPrice}&${querySort}`);
    } else {
      setFullQuery(`?${queryPrice}&${querySort}`);
    }
  }

  function applyFilterPrice(evt) {
    console.log(evt);
    queryPrice = evt.query;
    if (queryPrice !== "") {
      setFullQuery(`?${queryPrice}&${queryCategories}&${querySort}`);
    } else {
      setFullQuery(`?${queryCategories}&${querySort}`);
    }
  }

  function applyFilterSort(evt) {
    console.log(evt);
    querySort = evt.query;
    if (querySort !== "") {
      setFullQuery(`?${queryCategories}&${queryPrice}&${querySort}`);
    } else {
      setFullQuery(`?${queryCategories}`);
    }
  }

  return (
    <React.Fragment>
      {data && (
        <Layout>
          <Sider
            width="20%"
            theme="light"
            style={{ padding: "0 12px", marginTop: "40px" }}
          >
            <Collapse
              defaultActiveKey={["1", "2"]}
              ghost
              extra={<span>325</span>}
            >
              <Panel header="Categories" key="1">
                <SCategories
                  onCategoriesQuery={applyFilterCategories}
                  data={data}
                ></SCategories>
              </Panel>
              <Panel header="Price" key="2">
                <SPrice
                  maxValue={data.aggregations.maxPrice.value}
                  minValue={data.aggregations.minPrice.value}
                  range={true}
                  onPriceQuery={applyFilterPrice}
                />
              </Panel>
              <Panel header="Sort" key="3">
                <SSort
                  onSortQuery={applyFilterSort}
                />
              </Panel>
            </Collapse>
          </Sider>

          <MainContent>
            <Row gutter={[48, 48]}>
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
