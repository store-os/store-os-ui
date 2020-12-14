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
  ArrowLeftOutlined,
  ArrowRightOutlined,
  TwitterOutlined,
  YoutubeFilled,
  InstagramFilled,
  FacebookFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const { utcToZonedTime, format } = require("date-fns-tz");
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
      const result = await axios(`${process.env.REACT_APP_BLOG_URL}/${blogId}`);
      setData(result.data);
      setSelectedImage(result.data.images[0]);
      var prev = parseInt(result.data.id) - 1;
      if (prev !== 0) {
        setPreviousPage(String(prev));
      }
      var next = parseInt(result.data.id) + 1;

      const limitPage = await axios(`${process.env.REACT_APP_BLOG_URL}`);

      if (next <= limitPage.data.hits) {
        setNextPage(String(next));
      }
    };

    fetchData();
  }, []);

  return (
    <Main>
      {data && (
        <Row>
          <Col span={6}>
            <Back href={`/blog`}>
              <ArrowLeftOutlined style={{ marginRight: 12 }} />
              <span>Volver al blog</span>
            </Back>
          </Col>
          <Col span={12}>
            {data.images && (
              <Row>
                <BlogCarousel src={data.images[0]} alt="">
                  {/* {data.images.map((image) => (
                    <img src={image} alt=""></img>
                  ))} */}
                </BlogCarousel>
              </Row>
            )}

            <Row>
              <Title style={{ marginTop: "4%" }}>{data.title}</Title>
              <Paragraph>
                <PostInfo>
                  {data.author && (
                    <Comment
                      author={data.author.name}
                      avatar={
                        <Avatar
                          src={data.author.avatar}
                          alt={data.author.name}
                        />
                      }
                      content={<p>{data.author.role}</p>}
                      datetime={
                        data.date && (
                          <Tooltip
                            title={format(
                              utcToZonedTime(
                                new Date(data.date),
                                "Europe/Madrid"
                              ),
                              "EEEE, dd/MM/yyyy",
                              { timeZone: "Europe/Madrid" }
                            )}
                          >
                            <span>
                              {format(
                                utcToZonedTime(
                                  new Date(data.date),
                                  "Europe/Madrid"
                                ),
                                "EEEE, dd/MM/yyyy",
                                { timeZone: "Europe/Madrid" }
                              )}
                            </span>
                          </Tooltip>
                        )
                      }
                    />
                  )}
                  <TagContainer>
                    {data.label.map((tag) => (
                      <Tag>{tag}</Tag>
                    ))}
                  </TagContainer>
                </PostInfo>

                <HTMLContianer
                  dangerouslySetInnerHTML={{ __html: data.content }}
                ></HTMLContianer>
              </Paragraph>
            </Row>
            <Row>
              <Col span={12}>
                {previousPage && (
                  <Left href={`/blog/${previousPage}`}>
                    <ArrowLeftOutlined style={{ marginRight: 12 }} />
                    <span>Blog previo</span>
                  </Left>
                )}
              </Col>

              <Col span={12}>
                {nextPage && (
                  <Right href={`/blog/${nextPage}`}>
                    <span>Siguiente blog</span>
                    <ArrowRightOutlined style={{ marginLeft: 12 }} />
                  </Right>
                )}
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Social>
              {data.social.instagram && (
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramFilled style={{ backgroundColor: "#C13584" }} />
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
            </Social>
          </Col>
        </Row>
      )}
    </Main>
  );
};

const Main = styled.main`
  margin-bottom: 80px;
`;

const BlogCarousel = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top;
`;

const HTMLContianer = styled.div`
  & img {
    width: 100%;
  }
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Social = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 40px 0;
}
& > a {
  margin-bottom: 18px;
}
  & > a > span {
    width: 42px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    & > svg {
      font-size: 20px;
    }
  }
`;

const TagContainer = styled.div``;

const Left = styled.a`
  display: flex;
  align-items: center;
`;

const Right = styled.a`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Back = styled.a`
  display: inline-flex;
  width: calc(100% - 120px);
  justify-content: flex-end;
  align-items: center;
  margin: 20px 60px;
`;

export default OneBlog;
