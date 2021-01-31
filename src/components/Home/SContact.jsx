import React from "react";
import { Row, Col, Space, Typography } from "antd";
import {
  ClockCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ContactSection = () => {
  const channels = [
    {
      title: "Horario",
      description: "De Luness a Viernes 9:30 - 13:30 15:30 - 19:30",
      icon: (
        <ClockCircleOutlined
          style={{
            fontSize: 40,
          }}
        />
      ),
    },
    {
      title: "¡Llámanos!",
      description: "Polígono Les Peñes Parcela 40F, 33199, Granda, Siero",
      icon: (
        <PhoneOutlined
          style={{
            fontSize: 40,
          }}
        />
      ),
    },
    {
      title: "¡Encuéntranos!",
      description: "985 79 30 27",
      icon: (
        <EnvironmentOutlined
          style={{
            fontSize: 40,
          }}
        />
      ),
    },
    {
      title: "¡Consúltanos!",
      description: "consultas@alchersan.com",
      icon: (
        <MailOutlined
          style={{
            fontSize: 40,
          }}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Title level={2}>Contáctanos</Title>
      <Row
        style={{
          marginTop: 64,
          marginBottom: 64,
        }}
        justify="start"
      >
        {channels.length > 0 &&
          channels.map((channel, index) => {
            return (
              <Col xs={{ span: 12 }} md={{ span: 6 }} align="middle">
                <Space direction="vertical" align="center">
                  {channel.icon}
                  <Title level={5}>{channel.title}</Title>
                  <Paragraph align="center">{channel.description}</Paragraph>
                </Space>
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};

export default ContactSection;
