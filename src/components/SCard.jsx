import styled from "styled-components";
import { Button, Card } from "antd";
import PropTypes from "prop-types";
import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

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
  productId = ""
}) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`product/${productId}`}>
      <MainCard
        price={price}
        brand={brand}
        discount={discount}
        hoverable={hoverable}
        cover={<Thumbnail alt="example" src={hoverable && isHovered && cover.length > 1 ? cover[1] : cover[0]} />}
        onMouseEnter={() => setIsHovered(!isHovered)}
        onMouseLeave={() => setIsHovered(!isHovered)}
        headStyle={cardHeaderStyles}
        bodyStyle={cardContentStyles}
      >
        <Brand>{brand}</Brand>
        <Meta title={title} description={shortDescription} />
        <Details>{details}</Details>
        <Actions details={details}>
          <p>{price}€</p>
          {available && (
            <Button type="primary" shape="round" size="middle">
              Add to cart
            </Button>
          )}
        </Actions>
      </MainCard>
    </Link>
  );
};

const MainCard = styled(Card)`
  display: flex;
  flex-direction: column;
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
`;

const Brand = styled.h1`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
`;

const Details = styled.span`
  margin-top: 6px;
  font-size: 12px;
  color: #3F743D;
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

const Thumbnail = styled.img`
  height: 260px;
  object-fit: cover;
`

SCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  brand: PropTypes.string,
  discount: PropTypes.number,
  hoverable: PropTypes.bool,
  cover: PropTypes.array
}

export default SCard;
