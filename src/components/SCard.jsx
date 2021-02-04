import styled from "styled-components";
import { Button, Card, Image } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SCartNoticiation from "../components/SCartNotification";
import SDrawerForm from "../components/SDrawerForm";
import { dataMoreInfo } from "../data/MoreInfo.jsx";

const { Meta } = Card;

const cardHeaderStyles = {
  padding: "24px 16px 0 16px",
};

const cardContentStyles = {
  display: "flex",
  flexWrap: "wrap",
  padding: "20px 16px 20px 16px",
  flex: 1,
};

const SCard = ({
  title = "",
  shortDescription = "",
  price,
  url = "",
  brand = "",
  discount,
  hoverable = false,
  cover,
  available,
  details = "",
  productId = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <React.Fragment>
      <MainCard
        price={price}
        brand={brand}
        discount={discount}
        hoverable={hoverable}
        cover={
          <Link to={`product/${productId}`}>
            <Thumbnail
              alt="example"
              src={
                cover ? (
                  hoverable && isHovered && cover.length > 1 ? (
                    cover[1]
                  ) : (
                    cover[0]
                  )
                ) : (
                  <Image
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                )
              }
            />
          </Link>
        }
        onMouseEnter={() => setIsHovered(!isHovered)}
        onMouseLeave={() => setIsHovered(!isHovered)}
        headStyle={cardHeaderStyles}
        bodyStyle={cardContentStyles}
      >
        <Brand>{brand}</Brand>
        <Link className="title__link-product" to={`product/${productId}`}>
          <Meta title={title} description={shortDescription} />
        </Link>

        <Details>{details}</Details>
        <Actions details={details}>
          {discount ? (
            <Price>
              <p>{discount}€</p>
              <p>{price}€</p>
            </Price>
          ) : (
            <p>{price}€</p>
          )}
          {available ? (
            <Button
              type="primary"
              size="middle"
              className="snipcart-add-item"
              data-item-id={productId}
              data-item-price={price}
              data-item-url={url}
              data-item-description={shortDescription}
              data-item-image={cover[0]}
              data-item-name={title}
              onClick={() => SCartNoticiation(title)}
            >
              Add to cart
            </Button>
          ) : (
            <SDrawerForm
              data={dataMoreInfo}
              product_id={productId}
              triggerType="secondary"
            />
          )}
        </Actions>
      </MainCard>
    </React.Fragment>
  );
};

const MainCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: default;
  div.ant-card-body,
  div.ant-card-meta {
    width: 100%;
  }
  img {
    width: 100%;
  }
  div.ant-card-meta-title {
    color: #707070;
    font-weight: 400;
    text-align: left;
    line-height: initial;
    white-space: initial;
  }

  a.title__link-product {
    width: 100%;
  }
`;

const Brand = styled.h1`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
`;

const Details = styled.span`
  margin-top: 6px;
  font-size: 12px;
  color: #3f743d;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: flex-end;
  width: 100%;
  margin-top: ${(props) => (props.details ? "12px" : "28px")};
  p {
    font-size: 18px;
    margin: 0;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 22px;
  & > p:first-of-type {
    margin-right: 10px;
    font-size: 22px;
  }
  & > p:last-of-type {
    text-decoration: line-through;
    color: #b9b9b9;
    font-size: 16px;
  }
`;

const Thumbnail = styled.img`
  height: 260px;
  object-fit: contain;
`;

SCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  url: PropTypes.string,
  brand: PropTypes.string,
  discount: PropTypes.number,
  hoverable: PropTypes.bool,
  cover: PropTypes.array,
};

export default SCard;
