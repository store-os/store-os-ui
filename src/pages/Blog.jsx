import React, { useState, useEffect } from "react";
import axios from "axios";
import SBlog from "../components/SBlog";
import { Row, Col } from "antd";
import { blogContent } from "../data/Blog.jsx";

const Blog = () => {
  const [data, setData] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(process.env.REACT_APP_BLOG_URL);
      setData(result.data);
    };

    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Row style={{ height: 200, backgroundColor: "#131313" }}>
        <Col span={24} style={{ display: "flex", flexDirection: "column" }}>
          {blogContent.header !== "" && (
            <h1 style={{ color: "white", fontSize: 48, marginBottom: 8 }}>
              {blogContent.header}
            </h1>
          )}{" "}
          {blogContent.paragraph !== "" && (
            <p style={{ color: "white" }}>{blogContent.paragraph}</p>
          )}
        </Col>
      </Row>
      <h2 style={{ margin: "20px 12%", fontSize: 32 }}>Blog</h2>
      <Row>
        {data &&
          data.posts &&
          data.posts.map((entry) => (
            <Col span={8}>
              {console.log(data)}
              <SBlog
                thumbnail={entry.images[0]}
                title={entry.title}
                description={entry.description}
                blogId={entry.id}
              />
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Blog;
