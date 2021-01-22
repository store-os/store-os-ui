import React from "react";
import styled from "styled-components";
import { Layout, Badge, Menu, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import mainLogo from "../../src/logo.svg";
import Column from "./Column.jsx"

const { Footer } = Layout;

const prefixCls = "rc-footer"


const AppFooter = ({ maxColumnsPerRow, columns }) => (
    
    <ContainerSection className={`${prefixCls}-container`}>
        {columns && columns.length > 0 && (
          <ColumnsSection
            className={`${prefixCls}-columns`}
            style={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            {columns.map(
              (
                {
                  title,
                  icon,
                  style: columnStyle,
                  className: columnClassName,
                  items = [],
                },
                i,
              ) => {
                /*
                if (shouldWrap) {
                  styleObject.flex = `0 0 ${100 / (maxColumnsPerRow + 1) +
                    0.1}%`;
                }*/
                return (
                  <Column
                    key={i}
                    prefixCls={prefixCls}
                    title={title}
                    icon={icon}
                    items={items}
                    //style={styleObject}
                    className={columnClassName}
                  />
                );
              },
            )}
          </ColumnsSection>

            
        )}
      </ContainerSection>
  );

export default AppFooter;


const ContainerSection = styled.section`
    width: 100%;
    max-width: 1200px;
    padding: 80px 0 20px;
    margin: auto;
`;

const ColumnsSection = styled.section`
    display: flex;
    justify-content: space-around; 
`
