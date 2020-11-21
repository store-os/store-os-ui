import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  const [data, setData] = useState();
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(process.env.REACT_APP_BLOG_URL);
      setData(result.data);
    };

    fetchData();
  }, []);
  return <p>{data && data.posts[0].title}</p>;
};

export default Blog;
