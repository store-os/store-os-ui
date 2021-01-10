import React from "react";
import { Row, Col, Space, Typography } from "antd";
import styled from "styled-components";
import Service1 from "../../images/karcher_services_1.jpg";
import Service2 from "../../images/karcher_services_2.jpg";
import Service3 from "../../images/karcher_services_3.jpg";

const { Title, Paragraph } = Typography;

const services = [
  {
    title: "Venta",
    description:
      "Tenemos lo que necesitas, disponemos de todos los productos Kärcher que pueden hacer tu vida más fácil.",
    image: Service1,
  },
  {
    title: "Reparación",
    description:
      "La vida no es perfecta, y la de las máquinas tampoco. Por eso nuestros mecánicos, harán lo posible para que tengas tu máquina en las mejores condiciones independientemente del uso que le des.",
    image: Service2,
  },
  {
    title: "Reparto",
    description:
      "Esté donde esté tu negocio allí tendrás un profesional al servicio de tu máquina Kärcher.",
    image: Service3,
  },
];

const ServicesSection = () => {
  return (
    <React.Fragment>
      <Title level={2}>Nuestros servicios</Title>
      <Row>
        {services.length > 0 &&
          services.map((service, index) => {
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
