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
import { Layout, Badge, Input, AutoComplete } from "antd";

const { Header, Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Header
            style={{
              display: "flex",
              height: "80px",
              padding: "0 16%",
              flexWrap: "wrap",
              alignItems: "center",
              backgroundColor: "white"
            }}
          >
            <Logo>
              <img
                src={mainLogo}
                style={{ width: 60, display: "flex", marginRight: 20 }}
              />
            </Logo>
            <Navigation>
              <Nav to="/">Home</Nav>
              <Nav to="/catalog">Catalog</Nav>
              <Nav to="/blog">Blog</Nav>
              <Nav to="/about">About</Nav>
              <Nav to="/contact">Contact</Nav>
            </Navigation>
            <Action>
              <Nav>
                <i class="mi-user" />
              </Nav>
              <Nav className="snipcart-checkout">
                <Badge count={2} style={{ backgroundColor: "#1890ff" }}>
                  <i class="mi-shopping-cart" />
                </Badge>
              </Nav>
              {/* <span className="snipcart-items-count"></span> */}
              {/* <span className="snipcart-total-price"></span> */}
            </Action>
          </Header>
          <Search>
              <AutoComplete
                dropdownMatchSelectWidth={500}
                style={{ width: '100%' }}
              ><Input.Search size="large" placeholder="Search for a product..." /></AutoComplete>
            </Search>
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
  color: black;
  text-transform: uppercase;
`;

const Logo = styled.div``;

const Navigation = styled.div`
  display: flex;
  flex-grow: 1;
  margin-left: 12%;
`;

const Action = styled.div`
  i {
    font-size: x-large;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 68px;
  background-color: #2B2B2B;
  padding: 0 20px;
`;

export default App;
