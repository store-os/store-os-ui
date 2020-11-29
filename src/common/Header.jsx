import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Layout, Badge, Menu, Dropdown, Space } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import mainLogo from "../../src/logo.svg";

const { Header } = Layout;

const AppHeader = ({data}) => {

  const menu = (
    <Menu>
      <Menu.Item>
        <a href={`${window.location.origin}/catalog`}>Todos los productos</a>
      </Menu.Item>
      {data &&
        data.aggregations.categories.buckets &&
        data.aggregations.categories.buckets.map((category) => {
          return (
            <Menu.Item>
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
            style={{ width: 60, display: "flex", marginRight: 20 }}
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
          <Nav className="site-search">
            <i className="mi-search" /> <span>Search</span>
          </Nav>
          <Nav className="snipcart-customer-signin">
            <i className="mi-user" />
          </Nav>
          <Nav className="snipcart-checkout">
            <Badge
              count={
                <span className="snipcart-items-count ant-badge-count"></span>
              }
              style={{ backgroundColor: "#1890ff" }}
            >
              <i className="mi-shopping-cart" />
            </Badge>
          </Nav>
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
    span {
      color: black;
      margin: 0 8px;
    }
  }
`;

export default AppHeader;
