import React from "react";
import { Row, Col, Space, Typography } from "antd";
import {
  ClockCircleOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {ContactData} from "../../data/Home.jsx";

const { Title, Paragraph } = Typography;

const ContactSection = ({ data }) => {
  const channels = [
    {
      title: data.title_horario,
      description: data.description_horario,
      icon: (
        <ClockCircleOutlined
          style={{
            fontSize: data.fontSize_icon,
          }}
        />
      ),
    },
    {
      title: data.title_telefono,
      description: data.description_telefono,
      icon: (
        <PhoneOutlined
          style={{
            fontSize: data.fontSize_icon,
          }}
        />
      ),
    },
    {
      title: data.title_ubicacion,
      description: data.description_ubicacion,
      icon: (
        <EnvironmentOutlined
          style={{
            fontSize: data.fontSize_icon,
          }}
        />
      ),
    },
    {
      title: data.title_email,
      description: data.description_email,
      icon: (
        <MailOutlined
          style={{
            fontSize: data.fontSize_icon,
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
              <Col xs={{ span: 12 }} md={{ span: 6 }} align="middle" key={index}>
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
