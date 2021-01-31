import React from "react";
import styled from "styled-components";
import Column from "./Column.jsx";

const prefixCls = "rc-footer";

const AppFooter = ({ data, maxColumnsPerRow, columns }) => (
  <FooterSection className={`${prefixCls}-container`}>
    {columns && columns.length > 0 && (
      <ColumnsSection
        className={`${prefixCls}-columns`}
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
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
            i
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
          }
        )}
      </ColumnsSection>
    )}
  </FooterSection>
);

export default AppFooter;

const FooterSection = styled.footer`
  flex-shrink: 0;
  background-color: #f7f7f7;
`;

const ColumnsSection = styled.section`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  padding: 80px 24px 20px;
  margin: auto;
`;
