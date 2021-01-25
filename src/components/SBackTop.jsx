import React from "react";
import { BackTop } from "antd";
import {
    ArrowUpOutlined
  } from "@ant-design/icons";

import styled from "styled-components";


const SBackTop = () => {
  return (
    <BackTop visibilityHeight='900'>
         <BackTopContainer>
             <ArrowUpOutlined />
        </BackTopContainer>
        
    </BackTop>
  );
};

const BackTopContainer = styled.div`
    height: 100;
    width: 100;
    lineHeight: '40px';
    borderRadius: 4;
    backgroundColor: '#1088e9';
    color: '#fff';
    textAlign: 'center';
    fontSize: 14;
`;

export default SBackTop;
