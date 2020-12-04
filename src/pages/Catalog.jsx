import React, { useState, useEffect, useCallback, useRef  } from "react";
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
  querySort = "fieldsort=title.keyword&order=asc",
  urlInit = process.env.REACT_APP_PRODUCTS_URL;

const Catalog = ({ location }) => {
  const [data, setData] = useState();
  const [fullQuery, setFullQuery] = useState(urlInit);
  

  const [facets, setFacets] = useState(false);

  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const page = useRef(1);
  const prevY = useRef(0);

  const observer = useRef(
    new IntersectionObserver(
      entries => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) {
          loadMore();
        }

        prevY.current = y;
      },
      { threshold: 1 }
    )
  );

  const fetchData = useCallback(async pageNumber => {
    let url;
    console.log("PAGENUMBER:",pageNumber)
    console.log("FULLQUERY:",fullQuery)
    if (fullQuery.includes("?")){
      url = fullQuery + "&page=" + (pageNumber-1)
      
    } else {
      url = fullQuery + "?page=" + (pageNumber-1)
      console.log("FROM ZERO", url)
    }

    console.log("URL :", url)
    
    setLoading(true);

    try {
      const res = await axios.get(url);
      const { status, data } = res;

      setData(data);

      setLoading(false);
      return { status, data };
    } catch (e) {
      setLoading(false);
      return e;
    }
  }, [fullQuery]);

  const handleInitial = useCallback(
    async page => {
      const newProducts = await fetchData(page);
      const { status, data } = newProducts;
      if (status === 200) {
        if(facets){
          setProducts(data.products);
        } else {
          setProducts(products => [...products, ...data.products]);
        }
      }
    },
    [fetchData, facets]
  );

  const loadMore = () => {
    page.current++;
    handleInitial(page.current);
  };

  useEffect(() => {
    handleInitial(page.current);
  }, [handleInitial]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);


  useEffect(() => {
    console.log("PRODUCTS",products)
  }, [products]);

 
  function applyFilterCategories(evt) {
    console.log(evt);
    queryCategories = evt.query;
    if (queryCategories !== "") {
      setFullQuery(`${urlInit}?${queryCategories}&${queryPrice}&${querySort}`);
      setFacets(true)
    } else {
      setFullQuery(`${urlInit}?${queryPrice}&${querySort}`);
      setFacets(true)
    }
  }

  function applyFilterPrice(evt) {
    console.log(evt);
    queryPrice = evt.query;
    if (queryPrice !== "") {
      setFullQuery(`${urlInit}?${queryPrice}&${queryCategories}&${querySort}`);
      setFacets(true)
    } else {
      setFullQuery(`${urlInit}?${queryCategories}&${querySort}`);
      setFacets(true)
    }

  }

  function applyFilterSort(evt) {
    console.log(evt);
    querySort = evt.query;
    if (querySort !== "") {
      setFullQuery(`${urlInit}?${queryCategories}&${queryPrice}&${querySort}`);
      setFacets(true)
    } else {
      setFullQuery(`${urlInit}?${queryCategories}`);
      setFacets(true)
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
              {products.map((item) => (
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
            {loading && <li>Loading ...</li>}

            <div ref={setElement} className="buttonContainer">
              <button className="buttonStyle">Load More</button>
            </div>
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
