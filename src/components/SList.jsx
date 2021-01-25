import React from "react";
import { Row, Col, Space, Typography } from "antd";
import styled from "styled-components";


const { Title, Paragraph } = Typography;


const ServicesSection = ({
  TitleSection,
  data
  } ) => {
  return (
    <React.Fragment>
      { TitleSection != "" && (
        <Title level={2}>{TitleSection}</Title>
      )
      }
      
      <Row>
        {data.length > 0 &&
          data.map((service, index) => {
            return (
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Space direction="vertical" size="middle">
                  <ServiceImage src={service.image} key={index} />
                  <Title level={3}>{service.title}</Title>
                  <Paragraph>{service.description}</Paragraph>
                </Space>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

const ServiceImage = styled.img`
  width: 100%
  object-fit: cover;
`;

export default ServicesSection;
