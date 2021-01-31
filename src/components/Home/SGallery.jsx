import React from "react";
import { Row, Image, Typography } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const GallerySection = () => {
  const images = [
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p1.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p2.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p3.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p4.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p5.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p6.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p7.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p8.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p9.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p10.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p11.jpg",
    "https://s3-eu-west-1.amazonaws.com/test.alchersan.com/img/karcher/products/p12.jpg",
  ];

  return (
    <React.Fragment>
      <Title level={2}>Productos</Title>
      <Row
        style={{
          marginTop: 64,
          marginBottom: 64,
        }}
      >
        <Masonry>
          <Image.PreviewGroup>
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <figure key={index}>
                    <Image src={image} />
                  </figure>
                );
              })}
          </Image.PreviewGroup>
        </Masonry>
      </Row>
    </React.Fragment>
  );
};

const Masonry = styled.div`
  column-count: 4;
  column-gap: 10px;
  figure {
    margin: 0;
    display: grid;
    grid-template-rows: 1fr auto;
    margin-bottom: 10px;
    break-inside: avoid;
  }

  figure > img {
    grid-row: 1 / -1;
    grid-column: 1;
  }
`;

export default GallerySection;
