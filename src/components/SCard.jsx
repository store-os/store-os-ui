import styled from "styled-components";
import { Button, Card } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
                hoverable && isHovered && cover.length > 1 ? cover[1] : cover[0]
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
        <Link class="title__link-product" to={`product/${productId}`}>
          <Meta title={title} description={shortDescription}/>
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

          {available && (
            <Button
              type="primary"
              shape="round"
              size="middle"
              className="snipcart-add-item"
              data-item-id={productId}
              data-item-price={price}
              data-item-url={"/product/" + productId}
              data-item-description={shortDescription}
              data-item-image={cover[0]}
              data-item-name={title}
            >
              Add to cart
            </Button>
          )}
        </Actions>
      </MainCard>
    </React.Fragment>
  );
};

const MainCard = styled(Card)`
  display: flex;
  flex-direction: column;
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
  brand: PropTypes.string,
  discount: PropTypes.number,
  hoverable: PropTypes.bool,
  cover: PropTypes.array,
};

export default SCard;
