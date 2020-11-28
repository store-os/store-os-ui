import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Breadcrumb, Typography, Rate, Button } from "antd";
import { BrowserRouter as Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Product = () => {
  let { productId } = useParams();
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_PRODUCTS_URL}/${productId}`
      );
      setData(result.data);
      setSelectedImage(result.data.images[0]);
    };

    fetchData();
  }, []);
  return (
    <Main>
      {data && (
        <Row>
          <Col span={6}>
            <SecondaryImages>
              {data.images.map((image) => (
                <img src={image} onClick={() => setSelectedImage(image)}></img>
              ))}
            </SecondaryImages>
          </Col>
          <Col span={10}>
            <MainImage src={selectedImage}></MainImage>
          </Col>
          <Col span={8} style={{ textAlign: "left", padding: "2%" }}>
            <Breadcrumb>
              <Breadcrumb.Item href={"/catalog?category=" + data.levels.category}>
                {data.levels.category}
              </Breadcrumb.Item>
              <Breadcrumb.Item href={"/catalog?category=" + data.levels.category + "&subcategory=" + data.levels.subcategory}>{data.levels.subcategory}</Breadcrumb.Item>
              <Breadcrumb.Item href={"/catalog?category=" + data.levels.category + "&subcategory=" + data.levels.subcategory + "&subsubcategory=" + data.levels.subsubcategory}>{data.levels.subsubcategory}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            <p>Product: {data.id}</p>
            <ValueContainer>
              {data.discount_price > 0 ? (
                <React.Fragment>
                  <Price level={3} style={{ margin: 0 }}>
                    {data.price * ((100 - data.discount_price) / 100)}
                  </Price>
                  <Price
                    level={3}
                    style={{ margin: 0, textDecoration: "line-through" }}
                  >
                    {data.price}
                  </Price>
                </React.Fragment>
              ) : (
                <Price level={3} style={{ margin: 0 }}>
                  {data.price}
                </Price>
              )}
              {data.rating && <Rating></Rating>}
            </ValueContainer>
            {(data.description && (
              <Description style={{ marginBottom: "4%" }}>
                {data.description}
              </Description>
            )) || (
              <Description style={{ marginBottom: "4%" }}>
                There are no description for this product
              </Description>
            )}

            {data.available && (
              <Button 
                type="primary" 
                block
                className="snipcart-add-item"
                data-item-id={data.id}
                data-item-price={data.price}
                data-item-url={data.url}
                data-item-description={data.shortDescription}
                data-item-image={data.images[0]}
                data-item-name={data.title}
              >
                Add to cart
              </Button>
            )}
          </Col>
        </Row>
      )}
    </Main>
  );
};

const Main = styled.main`
  padding: 4%;
`;

const SecondaryImages = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  img {
    width: 48%;
    margin-bottom: 12%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MainImage = styled.img`
  width: 84%;
  height: 64%;
  padding-top: 2%;
  object-fit: contain;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6%;
`;

const Price = styled(Title)``;

const Rating = styled(Rate)``;

const Description = styled(Paragraph)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

export default Product;
