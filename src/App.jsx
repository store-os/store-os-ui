import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import OneBlog from "./pages/OneBlog.jsx";
import SBackTop from "./components/SBackTop.jsx";
import AppHeader from "./common/Header";
import AppFooter from "./common/Footer";
import Search from "./components/SSearch";
import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import TagManager from "react-gtm-module";

import { FooterData } from "./data/Footer.jsx";

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_ANALYTICS_SCRIPT,
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  let cancel;

  function initialRequest() {
    axios({
      method: "GET",
      url: process.env.REACT_APP_PRODUCTS_URL,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }

  const toggleVisibility = () => {
    setDrawerVisible(!drawerVisible);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  return (
    <Router>
      <Helmet defaultTitle={`${process.env.REACT_APP_WEBSITE_NAME}`}>
        <script>{`${process.env.REACT_APP_HOTJAR_SCRIPT}`}</script>
      </Helmet>
      <div className="App">
        <Layout>
          <AppHeader data={data} searchClick={toggleVisibility} />
          <AppMain>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/catalog" component={Catalog} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/product/:productId" component={Product} />
              <Route exact path="/blog/:blogId" component={OneBlog} />
            </Switch>
          </AppMain>
          <AppFooter data={data} maxColumnsPerRow={4} columns={FooterData} />
          <SBackTop />
        </Layout>
        <Search visibility={drawerVisible} searchClose={toggleVisibility} />
      </div>
    </Router>
  );
};

const AppMain = styled.main`
  flex: 1 0 auto;
`;

export default App;
