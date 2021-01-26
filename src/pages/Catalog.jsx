import React, { useState, useCallback, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SCard from "../components/SCard";
import { Row, Col, Layout, Collapse, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import SCategories from "../components/SCategories";
import SPrice from "../components/SPrice";
import SSort from "../components/SSort";
import SAutocomplete from "../components/SAutocomplete";
import useScrollFilter from "../hooks/useScrollFilter";

const { Sider, Content } = Layout;
const { Panel } = Collapse;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

let queryPrice = "",
  queryCategories = "",
  querySort = "&fieldsort=title.keyword&order=asc",
  querySearch = "";

const Catalog = ({ location }) => {
  const [fullQuery, setFullQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data,
    products,
    hasMore,
    loading,
    error,
    autocomplete,
  } = useScrollFilter(fullQuery, pageNumber);

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
    queryCategories = "&" + evt.query;
    if (queryCategories !== "") {
      setFullQuery(`${querySearch}${queryCategories}${queryPrice}${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryPrice}${querySort}`);
      setPageNumber(1);
    }
  }

  function applyFilterPrice(evt) {
    queryPrice = "&" + evt.query;
    if (queryPrice !== "") {
      setFullQuery(`${querySearch}${queryCategories}${queryPrice}${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryCategories}${querySort}`);
      setPageNumber(1);
    }
  }

  function applyFilterSort(evt) {
    querySort = "&" + evt.query;
    if (querySort !== "") {
      setFullQuery(`${querySearch}${queryCategories}${queryPrice}${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${queryCategories}`);
      setPageNumber(1);
    }
  }

  function applyFilterSearch(evt) {
    querySearch = evt.query;
    console.log("QUERY SEARCH:", querySearch);
    if (querySearch !== "") {
      setFullQuery(`${querySearch}${queryCategories}${queryPrice}${querySort}`);
      setPageNumber(1);
    } else {
      setFullQuery(`${querySearch}`);
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
                margin: "8px 0 48px 0",
              }}
            >
              <SAutocomplete
                onSearchQuery={applyFilterSearch}
                autocomplete={autocomplete}
              />
            </Row>
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
              <TransitionGroupCatalog>
                {products.map((item, index) => (
                  <CSSTransitionCatalog
                    in={!loading}
                    classNames="fade"
                    timeout={420}
                    key={index}
                  >
                    {products.length === index + 1 ? (
                      <Col key={item.id} span={6}>
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
                      </Col>
                    ) : (
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
                    )}
                  </CSSTransitionCatalog>
                ))}
              </TransitionGroupCatalog>
            </Row>
            <div>
              {loading && <Spin tip="Loading..." indicator={antIcon} />}
            </div>
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

const TransitionGroupCatalog = styled(TransitionGroup)`
  display: flex;
  flex-flow: row wrap;
`;

const CSSTransitionCatalog = styled(CSSTransition)`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 480s ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.2;
    transition: opacity 120ms ease-out;
  }
  .fade-exit-done {
    opacity: 0;
  }
  .fade-appear {
    opacity: 0;
  }
  .fade-appear-active {
    opacity: 1;
    transition: opacity 480s ease;
  }
`;

export default Catalog;
