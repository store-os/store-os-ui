import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Breadcrumb, Typography, Rate, Button } from "antd";

const { Title, Paragraph } = Typography;

const Product = () => {
  let { productId } = useParams();
  const [data, setData] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_PRODUCTS_URL}/${productId}`
      );
      setData(result.data);
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
                <img src={image}></img>
              ))}
            </SecondaryImages>
          </Col>
          <Col span={10}>
            <MainImage src={data.images[0]}></MainImage>
          </Col>
          <Col span={8} style={{ textAlign: "left", padding: "2%" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{data.levels.category}</Breadcrumb.Item>
              <Breadcrumb.Item>{data.levels.subcategory}</Breadcrumb.Item>
              <Breadcrumb.Item>{data.levels.subsubcategory}</Breadcrumb.Item>
            </Breadcrumb>
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            <p>Product: {data.id}</p>
            <ValueContainer>
              <Price level={3} style={{ margin: 0 }}>
                {data.price}
              </Price>
              <Rating></Rating>
            </ValueContainer>
            {console.log(data)}
            <Description style={{marginBottom: "4%"}}>{data.description}</Description>
            <Button type="primary" block>
              Add to cart
            </Button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 48%;
    margin-bottom: 10%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const MainImage = styled.img`
  width: 84%;
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
