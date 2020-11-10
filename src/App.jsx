import "./App.css";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout } from "antd";

const { Header, Footer } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Header>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
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

export default App;
