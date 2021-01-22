import "./App.css";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import OneBlog from "./pages/OneBlog.jsx";
import AppHeader from "./common/Header";
import AppFooter from "./common/Footer";
import React from "react";
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import TagManager from 'react-gtm-module'

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
          <AppFooter
          maxColumnsPerRow={4}
          columns={FooterData}
          />
        </Layout>
      </div>
    </Router>
  );
}

const FooterData = [
  {
    title: 'Ven a visitarnos!',
    items: [
      {
        title: 'oficina@alchersan.com',
        url: 'mailto:oficina@alchersan.com',
        openExternal: true,
      },
      {
        title: '985 79 30 27',
        url: 'tel:+34985793027',
        openExternal: true,
      }, 
      {
        title: 'Ver en mapa',
        url: 'https://www.google.es/maps/dir//comercial+alchersan/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0xd368a540f7ef79d:0x5bb3ac739939c2f6?sa=X&ved=2ahUKEwiCi7vKpZHuAhWoA2MBHTxYD5AQ9RcwDHoECBEQBQ',
        openExternal: true,
      },
      {
        description: "Polígono Les Peñes Parcela 40F",
      },
      {
        description: "33199",
      },
      {
        description: "Granda, Siero, Asturias, ES",
      },                
    ],
  },
  {
    title: 'Barre la web!',
    items: [
      {        
        title: 'Gama Profesional',        
        url: 'https://www.instagram.com/karcher_alchersan/',
        openExternal: true,
      },
      {        
        title: 'Gama Home Garden',        
        url: 'https://www.linkedin.com/company/alchersan',
        openExternal: true,
      },
      {        
        title: 'Nuestros blogs',        
        url: 'https://www.linkedin.com/company/alchersan',
        openExternal: true,
      },
      {        
        title: 'Buscador',        
        url: 'https://www.linkedin.com/company/alchersan',
        openExternal: true,
      },
    ],
  },
  {
    title: 'Síguenos!',
    items: [
      {        
        title: 'Instagram',        
        url: 'https://www.instagram.com/karcher_alchersan/',
        openExternal: true,
      },
      {        
        title: 'Linkedin',        
        url: 'https://www.linkedin.com/company/alchersan',
        openExternal: true,
      },
      {        
        description: 'Subscríbete a nuestra newsletter',        
        form: 'on',
      },
    ],
  },
  {
    icon: (
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
        alt="more products"
      />
    ),
    title: 'Test column',
    items: [
      {
        icon: (
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
            alt="yuque"
          />
        ),
        title: 'Texto 1',
        url: 'https://yuque.com',
        description: 'Descripción texto 1',
        openExternal: true,
      },
      {
        icon: (
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
            alt="yuque"
          />
        ),
        title: 'Texto 2',
        url: 'https://yunfengdie.com',
        description: 'Descripción texto 2',
        openExternal: true,
      },
    ],
  },
]

export default App;
