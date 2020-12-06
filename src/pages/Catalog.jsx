import React, { useState, useCallback, useRef } from "react";
import SCard from "../components/SCard";
import { Row, Col, Layout, Collapse } from "antd";
import styled from "styled-components";
import SCategories from "../components/SCategories";
import SPrice from "../components/SPrice";
import SSort from "../components/SSort";
import useScrollFilter from "../hooks/useScrollFilter";

const { Sider, Content } = Layout;
const { Panel } = Collapse;

let queryPrice = "",
  queryCategories = "",
  querySort = "fieldsort=title.keyword&order=asc";

const Catalog = ({ location }) => {
  const [fullQuery, setFullQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { data, products, hasMore, loading, error } = useScrollFilter(
    fullQuery,
    pageNumber
  );

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 1 }
      );
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  function applyFilterCategories(evt) {
    queryCategories = evt.query;
    if (queryCategories !== "") {
      setFullQuery(`${queryCategories}&${queryPrice}&${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryPrice}&${querySort}`);
      setPageNumber(1);
    }
  }

  function applyFilterPrice(evt) {
    queryPrice = evt.query;
    if (queryPrice !== "") {
      setFullQuery(`${queryPrice}&${queryCategories}&${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryCategories}&${querySort}`);
      setPageNumber(1);
    }
  }

  function applyFilterSort(evt) {
    querySort = evt.query;
    if (querySort !== "") {
      setFullQuery(`${queryCategories}&${queryPrice}&${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryCategories}`);
      setPageNumber(1);
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
            </Collapse>
          </Sider>

          <MainContent>
            <Row
              gutter={[48, 48]}
              style={{
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TotalResults>Total results: {data.hits}</TotalResults>
              <SSort onSortQuery={applyFilterSort} />
            </Row>
            <Row gutter={[48, 48]}>
              {products.map((item, index) => (
                <Col key={item.id} span={6}>
                  {products.length === index + 1 ? (
                    <div ref={lastProductRef}>
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
                    </div>
                  ) : (
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
                  )}
                </Col>
              ))}
            </Row>
            <div>{loading && "Loading..."}</div>
            <div>{error && "Error"}</div>
          </MainContent>
        </Layout>
      )}
    </React.Fragment>
  );
};

const MainContent = styled(Content)`
  padding: 36px;
`;

const TotalResults = styled.div``;

export default Catalog;
