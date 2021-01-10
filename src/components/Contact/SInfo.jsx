import React from "react";
import { Typography, Col } from "antd";
import {
  PhoneFilled,
  EnvironmentFilled,
  MailFilled,
  YoutubeFilled,
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
  TwitterOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const social = {
  instagram: "https://www.instagram.com/karcher_alchersan/",
  phone: "+34 985 79 30 27",
  mail: "oficina@alchersan.com",
  address:
    "Polígono Les Peñes Parcela 40F, 33199, Granda Siero, Asturias, España",
  GoogleMapsLink:
    "https://www.google.es/maps/dir//comercial+alchersan/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0xd368a540f7ef79d:0x5bb3ac739939c2f6?sa=X&ved=2ahUKEwiCi7vKpZHuAhWoA2MBHTxYD5AQ9RcwDHoECBEQBQ",
  linkedin: "https://www.linkedin.com/company/alchersan",
};

const SInfo = () => (
  <Col span={10} offset={2}>
    <Title level={3}>Contact information</Title>

    <div className="info-details-container">
      {social.address && (
        <p>
          <a href={social.GoogleMapsLink} target="_blank" rel="noreferrer">
            <EnvironmentFilled /> {social.address}
          </a>
        </p>
      )}

      {social.phone && (
        <p>
          <a href={"tel:" + social.phone} target="_blank" rel="noreferrer">
            <PhoneFilled /> {social.phone}
          </a>
        </p>
      )}

      {social.mail && (
        <p>
          <a href={"mailto:" + social.mail} target="_blank" rel="noreferrer">
            <MailFilled /> {social.mail}
          </a>
        </p>
      )}
    </div>

    <div className="info-icons-container">
      {social.instagram && (
        <a href={social.instagram} target="_blank" rel="noreferrer">
          <InstagramFilled />
        </a>
      )}

      {social.facebook && (
        <a href={social.facebook} target="_blank" rel="noreferrer">
          <FacebookFilled style={{ backgroundColor: "#3b5999" }} />
        </a>
      )}

      {social.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noreferrer">
          <LinkedinFilled style={{ backgroundColor: "#55acee" }} />
        </a>
      )}

      {social.twitter && (
        <a href={social.twitter} target="_blank" rel="noreferrer">
          <TwitterOutlined style={{ backgroundColor: "#55acee" }} />
        </a>
      )}

      {social.youtube && (
        <a href={social.youtube} target="_blank" rel="noreferrer">
          <YoutubeFilled style={{ backgroundColor: "#55acee" }} />
        </a>
      )}
    </div>
  </Col>
);
export default SInfo;
