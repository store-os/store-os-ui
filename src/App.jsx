import "./App.css";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import AppHeader from "./common/Header";
import React, { useState, useEffect } from "react";
import {Helmet} from "react-helmet";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";

function App() {
/*   const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(process.env.REACT_APP_PRODUCTS_URL);
      setData(result.data);
    };

    fetchData();
  }, []); */

  return (
    
    <Router>
      <Helmet
        defaultTitle="StoreOs"
        >
      <script>{`
        {
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:2139255,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
      </script>
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
          </Switch>
          <footer></footer>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
