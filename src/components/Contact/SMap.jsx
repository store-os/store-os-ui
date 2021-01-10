import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const SMap = () => (
  <div style={{ width: "100%" }} className="map">
    <Title level={2}>Ven a visitarnos!</Title>
    <iframe
      src={`${process.env.REACT_APP_GOOGLE_MAPS_URL}`}
      width="100%"
      height="600"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen={true}
      aria-hidden={false}
      tabIndex="0"
      title="Mapa de Comercial Alchersán"
    ></iframe>
  </div>
);

export default SMap;
