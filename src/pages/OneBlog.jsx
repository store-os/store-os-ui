import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Carousel,
  Comment, 
  Tooltip,
  Row,
  Card,
  Typography,
  Col,
  Collapse,
  Tag,
} from "antd";
import {
  LeftCircleFilled,
  RightCircleFilled,
  TwitterOutlined,
  YoutubeFilled,
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
} from '@ant-design/icons';

const { utcToZonedTime, format } = require('date-fns-tz')
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const OneBlog = () => {
  let { blogId } = useParams();
  const [data, setData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [previousPage, setPreviousPage] = useState();
  
  const [nextPage, setNextPage] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        `${process.env.REACT_APP_BLOG_URL}/${blogId}`
      );
      setData(result.data);
      setSelectedImage(result.data.images[0]);
      var prev = parseInt(result.data.id) - 1
      if (prev !== 0){
        setPreviousPage(String(prev))
      }
      var next = parseInt(result.data.id) + 1

      const limitPage = await axios(
        `${process.env.REACT_APP_BLOG_URL}`
      );
      
    
      if (next <= limitPage.data.hits){
        setNextPage(String(next))
      }
    
      
      
    };

    fetchData();
  }, []);

  return (
    <Main>
      {data && (
        <Card>

        {data.images && 
          <Row>
              <Carousel>
                {data.images.map((image) => (
                  <img src={image} alt=""></img>
                ))}
              </Carousel>
          </Row>
        }

        <Row>
  
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            
            <Paragraph>
              {data.author && 
                <Comment
                  author={data.author.name}
                  avatar={
                    <Avatar
                      src={data.author.avatar}
                      alt={data.author.name}
                    />
                  }
                  content={
                    <p>
                      {data.author.role}
                    </p>
                  }
                  datetime={ data.date &&
                    <Tooltip title={format(utcToZonedTime(new Date(data.date),'Europe/Madrid'),'EEEE, dd/MM/yyyy',{ timeZone: 'Europe/Madrid' })}>
                      <span>{format(utcToZonedTime(new Date(data.date),'Europe/Madrid'),'EEEE, dd/MM/yyyy',{ timeZone: 'Europe/Madrid' })}</span>
                    </Tooltip>
                  }
                />
              }
              <div dangerouslySetInnerHTML={{__html:data.content}}></div> 

            </Paragraph>

            {data.label.map((tag) => (
              <Tag>{tag}</Tag>
              ))
            }

            {data.social.instagram &&
              <a href={data.social.instagram} target="_blank">
                <Tag icon={<InstagramFilled />} color="#C13584">
                </Tag>
            </a>
            }

            {data.social.facebook &&
              <a href={data.social.facebook} target="_blank">
                <Tag icon={<FacebookFilled />} color="#3b5999">
                </Tag>
             </a>
            }

            {data.social.linkedin &&
              <a href={data.social.linkedin} target="_blank">
                <Tag icon={<LinkedinFilled />} color="#55acee">
                </Tag>
            </a>
            }

            {data.social.twitter &&
              <a href={data.social.twitter} target="_blank">
                <Tag icon={<TwitterOutlined />} color="#55acee">
                </Tag>
            </a>
            }

            {data.social.youtube &&
              <a href={data.social.youtube} target="_blank">
                <Tag icon={<YoutubeFilled />} color="#55acee">
                </Tag>
            </a>
            }
        </Row>
        </Card>
      )}
      <Row gutter={[16,16]}>
      {previousPage && 
      <Col span={12}>
        <Left href={`/blog/${previousPage}`}> 
        <Tag icon={<LeftCircleFilled />} >
          </Tag>
          Blog previo
      </Left>
      </Col>
      }


      { nextPage && 
      <Col span={12}>
      <Right href={`/blog/${nextPage}`}> 
                Siguiente blog
                <Tag icon={<RightCircleFilled />} >
                </Tag>
            </Right>
      </Col>
      }
      </Row>
    </Main>
    
  );
};

const Main = styled.main`
  padding: 4%;
`;

const Left = styled.a`
  float:left;
  width:100px;
`;

const Right = styled.a`
  float:right;
  width:100px;
`;

export default OneBlog;
