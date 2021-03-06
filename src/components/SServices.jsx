import React from "react";
import { Row, Col, Space, Typography } from "antd";
import styled from "styled-components";

const { Title, Paragraph } = Typography;

const ServicesSection = ({ data }) => {
  return (
    <React.Fragment>
      {data.title !== "" && <Title level={2}>{data.title}</Title>}

      <Row gutter={[48, 48]}>
        {data.service.length > 0 &&
          data.service.map((service, index) => {
            return (
              <Col
                s={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                key={index}
              >
                <Space direction="vertical" size="middle">
                  {service.image !== "" && (
                    <ServiceImage src={service.image} key={index} />
                  )}
                  {service.title !== "" && (
                    <Title level={3}>{service.title}</Title>
                  )}
                  {service.description !== "" && (
                    <Paragraph>{service.description}</Paragraph>
                  )}
                </Space>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

const ServiceImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export default ServicesSection;
