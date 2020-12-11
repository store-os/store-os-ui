import React from "react";
import { Card } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const { Meta } = Card;

const SBlog = ({ thumbnail, title, description, blogId }) => {
  return (
    <Card
      cover={
        <Link to={`blog/${blogId}`}>
          <Thumbnail 
            alt="example" 
            src={thumbnail}/>
        </Link>
      }
      actions={[<LinkOutlined key="setting" />]}
      bordered={false}
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

const Thumbnail = styled.img`
  height: 260px;
  width: 360px;
  object-fit: contain;
`;


export default SBlog;
