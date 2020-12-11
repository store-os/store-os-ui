import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Breadcrumb,
  Typography,
  Rate,
  Button,
  Descriptions,
  Divider,
  Collapse,
  Badge,
} from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const OneBlog = () => {
  let { blogId } = useParams();
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BLOG_URL}/${blogId}`
      );
      setData(result.data);
      setSelectedImage(result.data.images[0]);
    };

    fetchData();
  }, []);

  return (
    <Main>
      {data && (
        <Row>
          
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            <div dangerouslySetInnerHTML={{__html:data.content}}></div>

         
        </Row>
      )}
    </Main>
  );
};

const Main = styled.main`
  padding: 4%;
`;

const Carousel = styled.div`
  padding: 0 20%;
  img {
    width: 100%;
    height: 360px;
    object-fit: contain;
    margin-bottom: 48px;
  }
`;

export default OneBlog;
