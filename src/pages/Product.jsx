import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Rate,
  Button,
  Descriptions,
  Divider,
  Collapse,
  Badge,
} from "antd";
import {useViewport, MOBILE, TABLET } from "../hooks/useViewPort.jsx"
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;


const Product = () => {
  const { viewport } = useViewport()
  console.log("VIEWPORT", viewport)
  if (viewport.device === MOBILE) {
    console.log("MOBILE")
  }else if (viewport.device == TABLET) {
    console.log("TABLET")
  } else {
    console.log("DESKTOP")
  }
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
          <Col span={14}>
            <Carousel>
              {data.images.map((image) => (
                <img src={image} onClick={() => setSelectedImage(image)}></img>
              ))}
            </Carousel>
          </Col>
          <Col span={10} style={{ textAlign: "left", padding: "2%" }}>
            <Breadcrumb>
              <Breadcrumb.Item
                href={"/catalog?category=" + data.levels.category}
              >
                {data.levels.category}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={
                  "/catalog?category=" +
                  data.levels.category +
                  "&subcategory=" +
                  data.levels.subcategory
                }
              >
                {data.levels.subcategory}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={
                  "/catalog?category=" +
                  data.levels.category +
                  "&subcategory=" +
                  data.levels.subcategory +
                  "&subsubcategory=" +
                  data.levels.subsubcategory
                }
              >
                {data.levels.subsubcategory}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            <p>Product id: {data.id}</p>
            <ValueContainer>
              {data.discount ? (
                <React.Fragment>
                  <Price>{data.final_price}€</Price>
                  <Price
                    style={{
                      textDecoration: "line-through",
                      fontSize: "18px",
                      color: "#b9b9b9",
                    }}
                  >
                    {data.price}€
                  </Price>
                </React.Fragment>
              ) : (
                <Price>{data.price}€</Price>
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

            <Divider />

            <div className="ant-descriptions-title" style={{ marginBottom: 20 }}>
              Características
            </div>

            {data.metadata.features ? (
              <Collapse>
                {data.metadata.features.map((feature, i) => (
                  <Panel header={feature.title} key={i}>
                    {feature.description}
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <p>
                No existe información sobre las características de este producto
              </p>
            )}

            <Divider />

            <div className="ant-descriptions-title" style={{ marginBottom: 20 }}>
              Equipamiento
            </div>

            {data.metadata.equipment ? (
              data.metadata.equipment.map((equipment) => (
                <Badge
                  color={"volcano"}
                  text={equipment}
                  style={{ marginRight: 12 }}
                ></Badge>
              ))
            ) : (
              <p>No existe información sobre equipamiento para este producto</p>
            )}

            <Divider />

            {data.metadata.specs ? (
              <Descriptions
                bordered
                title="Especificaciones"
                layout="vertical"
                size={"small"}
              >
                {data.metadata.specs.map((spec) => (
                  <Descriptions.Item label={spec.spec}>
                    {spec.value}
                    {spec.measure}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            ) : (
              <p>
                No existe información sobre las especificaciones de este
                producto
              </p>
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
  align-items: baseline;
  margin-bottom: 6%;
`;

const Price = styled.div`
  font-size: 28px;
  margin-right: 8px;
`;

const Rating = styled(Rate)``;

const Description = styled(Paragraph)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
`;

const Carousel = styled.div`
  padding: 0 20%;
  img {
    width: 100%;
    height: 360px;
    object-fit: contain;
    margin-bottom: 48px;
  }
`;

/* const ProductCarousel = styled(Carousel)`
  &.ant-carousel .slick-slider {
    display: flex;
    justify-content: center;
  }
  .slick-list {
    width: 800px;
  }
  .slick-dots li {
    width: 240px;
    height: 240px;
    background-color: red;
    margin-bottom: 40px;
  }
  .slick-dots li button {
    width: 100%;
    height: 100%;
  }
`; */

export default Product;
