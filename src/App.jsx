import "./App.css";
import styled from "styled-components";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import mainLogo from "../src/logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";

const { Header, Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Header style={{ display: "flex" }}>
            <img
              src={mainLogo}
              style={{ width: 60, display: "flex", marginRight: 20 }}
            />
            <Nav to="/">Home</Nav>
            <Nav to="/catalog">Catalog</Nav>
            <Nav to="/blog">Blog</Nav>
            <Nav to="/about">About</Nav>
            <Nav to="/contact">Contact</Nav>
            <Nav className="snipcart-checkout">Cart</Nav>
            <span className="snipcart-items-count"></span>
            {/* <span className="snipcart-total-price"></span> */}
          </Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/product/:productId" component={Product} />
          </Switch>
          <Footer></Footer>
        </Layout>
      </div>
    </Router>
  );
}

const Nav = styled(Link)`
  margin-right: 20px;
  color: white;
`;

export default App;
