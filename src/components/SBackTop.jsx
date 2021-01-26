import React from "react";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 20,
};

const SBackTop = () => {
  return (
    <BackTop>
      <div style={style} visibilityHeight='840'>
        <ArrowUpOutlined />
      </div>
    </BackTop>
  );
};

export default SBackTop;
