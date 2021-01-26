import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import MailchimpSubscribe from "../components/Subscription/MailchimpSubscribe.jsx";
import SimpleForm from "../components/Subscription/SimpleForm.jsx";

const Column = ({ prefixCls, icon, title, items = [], style, className }) => (
  <ColumnDiv
    className={classNames(`${prefixCls}-column`, className)}
    style={style}
  >
    {(title || icon) && (
      <h2>
        {icon && (
          <SpanIcon className={`${prefixCls}-column-icon`}>{icon}</SpanIcon>
        )}
        {title}
      </h2>
    )}
    {items.map((item, i) => {
      const LinkComponent = item.LinkComponent || "a";
      return (
        <ItemDiv
          className={classNames(`${prefixCls}-item`, item.className)}
          style={item.style}
          key={i}
        >
          <LinkComponent
            href={item.url}
            to={typeof LinkComponent !== "string" ? item.url : undefined}
            target={item.openExternal ? "_blank" : undefined}
            rel={item.openExternal ? "noopener noreferrer" : undefined}
          >
            {item.icon && (
              <ItemIconSpan className={`${prefixCls}-item-icon`}>
                {item.icon}
              </ItemIconSpan>
            )}

            {item.title}
          </LinkComponent>
          {item.description && (
            <>
              <span className={`${prefixCls}-item-separator`}> </span>
              <span className={`${prefixCls}-item-description`}>
                {item.description}
              </span>
            </>
          )}
          {item.form && (
            <MailchimpSubscribe
              url={process.env.REACT_APP_MAILCHIMP_URL}
              render={({ subscribe, status, message }) => (
                <div>
                  <SimpleForm onSubmitted={(formData) => subscribe(formData)} />
                  {status === "sending" && (
                    <div style={{ color: "blue" }}>sending...</div>
                  )}
                  {status === "error" && (
                    <div
                      style={{ color: "red" }}
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  )}
                  {status === "success" && (
                    <div style={{ color: "green" }}>Subscribed !</div>
                  )}
                </div>
              )}
            />
          )}
        </ItemDiv>
      );
    })}
  </ColumnDiv>
);

export default Column;

const SpanIcon = styled.span`
  margin-right: 0.5em;
  width: 22px;
  display: inline-block;
  vertical-align: middle;
  top: -1px;
  position: relative;
  text-align: center;

  > span,
  > svg,
  img {
    width: 100%;
    display: block;
  }
}
`;

const ColumnDiv = styled.div`
  margin-bottom: 60px;

  h2 {
    position: relative;
    margin: 0 auto 24px;
    font-weight: 500;
    font-size: 16px;
  }
`;

const ItemDiv = styled.div`
  margin: 12px 0;
`;

const ItemIconSpan = styled.div`
  margin-right: 0.4em;
  width: 16px;
  display: inline-block;
  vertical-align: middle;
  top: -1px;
  position: relative;
  text-align: center;

  > span,
  > svg,
  img {
    width: 100%;
    display: block;
  }
`;
