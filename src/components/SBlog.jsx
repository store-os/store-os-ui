import React, { useState } from "react";
import { Card } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const { Meta } = Card;

const SBlog = ({ thumbnail, title, description, link }) => {
  return (
    <Card
      cover={<img alt="example" src={thumbnail} />}
      actions={[<LinkOutlined key="setting" />]}
      bordered={false}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default SBlog;
