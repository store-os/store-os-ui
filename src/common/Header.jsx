import React, { useState } from "react";
import styled from "styled-components";
import { Layout, Badge, Menu, Dropdown, Space, Drawer } from "antd";
import { Link } from "react-router-dom";
import mainLogo from "../../src/logo.png";
import { useViewport, DESKTOP } from "../hooks/useViewPort.jsx";
import { CaretDownOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { SubMenu } = Menu;

const AppHeader = ({ data, searchClick }) => {
  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  let viewport = useViewport();
  const menu = (
    <React.Fragment>
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
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16%",
          backgroundColor: "white",
          lineHeight: "initial",
        }}
      >
        {viewport.device !== DESKTOP && (
          <React.Fragment>
            <Action size="middle">
              <div className="mobile-menu" onClick={showMenu}>
                <i className="mi-menu" />
              </div>{" "}
            </Action>
            <Drawer
              placement="left"
              closable={true}
              onClose={onClose}
              visible={visible}
              closeIcon={<i className="mi-close" style={{ fontSize: 24 }} />}
              bodyStyle={{ padding: "64px 0" }}
            >
              <Menu mode="inline">
                <Menu.Item key="sub0">
                  <a href={`${window.location.origin}/`}>Home</a>
                </Menu.Item>
                <SubMenu key="sub1" title="Catalogo">
                  {menu}
                </SubMenu>
                <Menu.Item key="sub2">
                  <a href={`${window.location.origin}/blog`}>Blog</a>
                </Menu.Item>
                <Menu.Item key="sub3">
                  <a href={`${window.location.origin}/about`}>About</a>
                </Menu.Item>
                <Menu.Item key="sub4">
                  <a href={`${window.location.origin}/contact`}>Contact</a>
                </Menu.Item>
              </Menu>
            </Drawer>
          </React.Fragment>
        )}
        <Logo>
          <img
            src={mainLogo}
            style={{ width: 140, display: "flex", marginRight: 48 }}
            alt="App logo"
          />
        </Logo>
        {viewport.device === DESKTOP ? (
          <React.Fragment>
            <Navigation size="large">
              <Nav to="/">Home</Nav>
              <Dropdown
                className="ant-dropdown-link"
                overlay={<Menu>{menu}</Menu>}
              >
                <Nav
                  onClick={(e) => e.preventDefault()}
                  to="/catalog"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Catalog
                  <CaretDownOutlined style={{ fontSize: 11, marginLeft: 8 }} />
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
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Action size="middle">
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
          </React.Fragment>
        )}
      </Header>
      <SubHeader />
    </React.Fragment>
  );
};

const SubHeader = styled.div`
  height: 48px;
  width: 100%;
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

  .ant-dropdown-link:hover {
    span {
      transform: rotate(180deg);
    }
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
