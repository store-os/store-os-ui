import "./App.css";
import Home from "../src/pages/Home.jsx";
import Catalog from "../src/pages/Catalog.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Typography } from "antd";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/">
              <Home></Home>
            </Route>
            <Route path="/catalog">
              <Catalog></Catalog>
            </Route>
          </Switch>
        </Router>
        <Footer></Footer>
      </Layout>

      {/* <Title level={2}>👽 Some magic is missing here!</Title> */}
    </div>
  );
}

export default App;
