import "./App.css";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import OneBlog from "./pages/OneBlog.jsx";
import SBackTop from "./components/SBackTop.jsx"
import AppHeader from "./common/Header";
import AppFooter from "./common/Footer";
import React from "react";
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout, BackTop } from "antd";
import TagManager from 'react-gtm-module'

import {FooterData} from "./data/Footer.jsx"

const tagManagerArgs = {
    gtmId: process.env.REACT_APP_ANALYTICS_SCRIPT
}

TagManager.initialize(tagManagerArgs)

function App() {

  return (
    
    <Router>
      <Helmet
        defaultTitle={`${process.env.REACT_APP_WEBSITE_NAME}`}
        >
      <script>{`${process.env.REACT_APP_HOTJAR_SCRIPT}`}</script>
      
      </Helmet>
      <div className="App">
        <Layout>
          <AppHeader/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/product/:productId" component={Product} />
            <Route exact path="/blog/:blogId" component={OneBlog} />
          </Switch>
          <SBackTop/>
          <AppFooter
          maxColumnsPerRow={4}
          columns={FooterData}
          />
        </Layout>
        
      </div>
    </Router>
  );
}


export default App;
