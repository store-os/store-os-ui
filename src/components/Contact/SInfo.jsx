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


const SInfo = ({data}) => (
  <Col span={10} offset={2}>
    { 
      data.title!= "" && 
      <Title level={3}>{data.title}</Title>
    }
    <div className="info-details-container">
      {data.social.address && (
        <p>
          <a href={data.social.GoogleMapsLink} target="_blank" rel="noreferrer">
            <EnvironmentFilled /> {data.social.address}
          </a>
        </p>
      )}

      {data.social.phone && (
        <p>
          <a href={"tel:" + data.social.phone} target="_blank" rel="noreferrer">
            <PhoneFilled /> {data.social.phone}
          </a>
        </p>
      )}

      {data.social.mail && (
        <p>
          <a href={"mailto:" + data.social.mail} target="_blank" rel="noreferrer">
            <MailFilled /> {data.social.mail}
          </a>
        </p>
      )}
    </div>

    <div className="info-icons-container">
      {data.social.instagram && (
        <a href={data.social.instagram} target="_blank" rel="noreferrer">
          <InstagramFilled />
        </a>
      )}

      {data.social.facebook && (
        <a href={data.social.facebook} target="_blank" rel="noreferrer">
          <FacebookFilled style={{ backgroundColor: "#3b5999" }} />
        </a>
      )}

      {data.social.linkedin && (
        <a href={data.social.linkedin} target="_blank" rel="noreferrer">
          <LinkedinFilled style={{ backgroundColor: "#55acee" }} />
        </a>
      )}

      {data.social.twitter && (
        <a href={data.social.twitter} target="_blank" rel="noreferrer">
          <TwitterOutlined style={{ backgroundColor: "#55acee" }} />
        </a>
      )}

      {data.social.youtube && (
        <a href={data.social.youtube} target="_blank" rel="noreferrer">
          <YoutubeFilled style={{ backgroundColor: "#55acee" }} />
        </a>
      )}
    </div>
  </Col>
);
export default SInfo;
