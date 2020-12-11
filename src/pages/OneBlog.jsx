import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  Card,
  Typography,

  Collapse,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';

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
    
      setNextPage(String(next))
      
    };

    fetchData();
  }, []);

  return (
    <Main>
      {data && (
        <Card>
        <Row>
          
            <Title level={1} style={{ marginTop: "2%" }}>
              {data.title}
            </Title>
            <div dangerouslySetInnerHTML={{__html:data.content}}></div>
            
            {data.label.map((tag) => (
              <Tag>{tag}</Tag>
              ))
            }

            {data.social.instagram &&
              <a href={data.social.instagram} target="_blank">
                <Tag icon={<InstagramOutlined />} color="#C13584">
                Instagram
                </Tag>
            </a>
            }

            {data.social.facebook &&
              <a href={data.social.facebook} target="_blank">
                <Tag icon={<FacebookOutlined />} color="#3b5999">
                Facebook
                </Tag>
             </a>
            }

            {data.social.linkedin &&
              <a href={data.social.linkedin} target="_blank">
                <Tag icon={<LinkedinOutlined />} color="#55acee">
                  LinkedIn
                </Tag>
            </a>
            }

            {data.social.twitter &&
              <a href={data.social.twitter} target="_blank">
                <Tag icon={<TwitterOutlined />} color="#55acee">
                  Twitter
                </Tag>
            </a>
            }

            {data.social.youtube &&
              <a href={data.social.youtube} target="_blank">
                <Tag icon={<YoutubeOutlined />} color="#55acee">
                  Twitter
                </Tag>
            </a>
            }
        </Row>
        </Card>
      )}

      {previousPage && 
        <Link to={`/blog/${previousPage}`}>
          <Tag icon={<ArrowLeftOutlined />} >
          Blog previo
          </Tag>
        </Link>
      }
      { nextPage && 
      <Link to={`/blog/${nextPage}`} >
        <Tag icon={<ArrowRightOutlined />} >
        Siguiente blog
        </Tag>
      </Link>
      }
    </Main>
    
  );
};

const Main = styled.main`
  padding: 4%;
`;

export default OneBlog;
