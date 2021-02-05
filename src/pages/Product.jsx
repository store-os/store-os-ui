import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import SCard from "../components/SCard";
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
  Carousel,
} from "antd";
import { useViewport } from "../hooks/useViewPort.jsx";
import SCartNoticiation from "../components/SCartNotification";
import SDrawerForm from "../components/SDrawerForm";
import {dataMoreInfo} from "../data/MoreInfo.jsx"


const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const Product = () => {
  let viewport = useViewport();
  let { productId } = useParams();
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_PRODUCTS_URL}/${productId}`
      );
      setData(result.data);
      setSelectedImage(result.data.product.images[0]);
    };

    fetchData();
  }, []);

  return (
    <Main>
      {data && (
        <Row>
          <Col md={24} lg={14}>
            {viewport.device === "DESKTOP" ? (
              <Gallery>
                {data.product.images.map((image) => (
                  <img
                    src={image}
                    alt="Blog entry cover"
                    style={{
                      height: 420,
                    }}
                  ></img>
                ))}
              </Gallery>
            ) : (
              <Carousel>
                {data.product.images.map((image, i) => (
                  <div>
                    <img
                      style={{
                        height:
                          viewport.device === "TABLET"
                            ? 420
                            : viewport.device === "MOBILE"
                            ? 280
                            : "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      src={image}
                      alt="Carousel product"
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </Col>
          <Col md={24} lg={10} style={{ textAlign: "left", padding: "2%" }}>
            <Breadcrumb>
              <Breadcrumb.Item
                href={"/catalog?category=" + data.product.levels.category}
              >
                {data.product.levels.category}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={
                  "/catalog?category=" +
                  data.product.levels.category +
                  "&subcategory=" +
                  data.product.levels.subcategory
                }
              >
                {data.product.levels.subcategory}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                href={
                  "/catalog?category=" +
                  data.product.levels.category +
                  "&subcategory=" +
                  data.product.levels.subcategory +
                  "&subsubcategory=" +
                  data.product.levels.subsubcategory
                }
              >
                {data.product.levels.subsubcategory}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.product.title}
            </Title>
            <p>Product id: {data.product.id}</p>
            <ValueContainer>
              {data.product.discount ? (
                <React.Fragment>
                  <Price>{data.product.final_price}€</Price>
                  <Price
                    style={{
                      textDecoration: "line-through",
                      fontSize: "18px",
                      color: "#b9b9b9",
                    }}
                  >
                    {data.product.price}€
                  </Price>
                </React.Fragment>
              ) : (
                <Price>{data.product.price}€</Price>
              )}
              {data.product.rating && <Rating></Rating>}
            </ValueContainer>
            {(data.product.description && (
              <Description style={{ marginBottom: "4%" }}>
                {data.product.description}
              </Description>
            )) || (
              <Description style={{ marginBottom: "4%" }}>
                There are no description for this product
              </Description>
            )}

            {data.product.available ? (
              <Button
                type="primary"
                block
                className="snipcart-add-item"
                data-item-id={data.product.id}
                data-item-price={data.product.price}
                data-item-url={data.product.url}
                data-item-description={data.product.shortDescription}
                data-item-image={data.product.images[0]}
                data-item-name={data.product.title}
                onClick={() => SCartNoticiation(data.product.title)}
              >
                Add to cart
              </Button>
            ):
            (
              <SDrawerForm data={dataMoreInfo} product_id={data.product.id}/>
            )}

            <Divider />

            <div
              className="ant-descriptions-title"
              style={{ marginBottom: 20 }}
            >
              Características
            </div>

            {data.product.metadata.features ? (
              <Collapse>
                {data.product.metadata.features.map((feature, i) => (
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

            <div
              className="ant-descriptions-title"
              style={{ marginBottom: 20 }}
            >
              Equipamiento
            </div>

            {data.product.metadata.equipment ? (
              data.product.metadata.equipment.map((equipment) => (
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

            {data.product.metadata.specs ? (
              <Descriptions
                bordered
                title="Especificaciones"
                layout="vertical"
                size={"small"}
              >
                {data.product.metadata.specs.map((spec) => (
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

            <Divider />

            {data.relatedProducts.products && (
              <React.Fragment>
                <div
                  className="ant-descriptions-title"
                  style={{ marginBottom: 20 }}
                >
                  Productos relacionados
                </div>

                <Row gutter={[24, 24]}>
                  <TransitionGroupCatalog>
                    {data.relatedProducts.products.map((item, index) => (
                      <CSSTransitionCatalog
                      classNames="fade"
                      timeout={420}
                      key={index}
                    >
                        {data.relatedProducts.products.length === index + 1 ? (
                          <Col key={item.id} xs={24} sm={12} xl={12} xxl={12}>
                            <div>
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
                          <Col key={item.id} xs={24} sm={12} xl={12} xxl={12}>
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

              </React.Fragment>
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

const Gallery = styled.div`
  padding: 0 20%;
  img {
    width: 100%;
    height: 360px;
    object-fit: contain;
    margin-bottom: 48px;
  }
`;



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
