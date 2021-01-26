import React from "react";
import styled from "styled-components";
import { Layout, Badge, Menu, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import mainLogo from "../../src/logo.png";

const { Header } = Layout;

const AppHeader = ({ data, searchClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key={0}>
        <a href={`${window.location.origin}/catalog`}>Todos los productos</a>
      </Menu.Item>
      {data &&
        data.aggregations.categories.buckets &&
        data.aggregations.categories.buckets.map((category, i) => {
          return (
            <Menu.Item key={i + 1}>
              <a
                href={`${window.location.origin}/catalog?category=${category.key}`}
              >
                {category.key}
              </a>
            </Menu.Item>
          );
        })}
    </Menu>
  );

  return (
    <React.Fragment>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 16%",
          backgroundColor: "white",
          lineHeight: "initial",
        }}
      >
        <Logo>
          <img
            src={mainLogo}
            style={{ width: 140, display: "flex", marginRight: 48 }}
            alt="App logo"
          />
        </Logo>
        <Navigation size="large">
          <Nav to="/">Home</Nav>
          <Dropdown overlay={menu}>
            <Nav
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              to="/catalog"
            >
              Catalog
            </Nav>
          </Dropdown>
          <Nav to="/blog">Blog</Nav>
          <Nav to="/about">About</Nav>
          <Nav to="/contact">Contact</Nav>
        </Navigation>
        <Action size="middle">
          <div className="site-search" onClick={() => searchClick()}>
            <i className="mi-search" /> <span>Search</span>
          </div>
          <div className="snipcart-customer-signin">
            <i className="mi-user" />
          </div>
          <div className="snipcart-checkout">
            <Badge
              count={
                <span className="snipcart-items-count ant-badge-count"></span>
              }
              style={{ backgroundColor: "#1890ff" }}
            >
              <i className="mi-shopping-cart" />
            </Badge>
          </div>
        </Action>
      </Header>
      <SubHeader />
    </React.Fragment>
  );
};

const SubHeader = styled.div`
  height: 48px;
  widht: 100%;
  background-color: #131313;
`;

const Nav = styled(Link)``;

const Logo = styled.div``;

const Navigation = styled(Space)`
  display: flex;
  flex: 1;
  a {
    color: black;
  }
`;

const Action = styled(Space)`
  i {
    font-size: x-large;
    color: black;
  }
  .site-search {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      color: black;
      margin: 0 8px;
    }
  }
`;

export default AppHeader;
