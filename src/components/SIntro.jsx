import React from "react";
import styled from "styled-components";
import { Typography, Image, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

const SIntro = ({
  data
}) => (
  <IntroContainer>
    { data.introSrc !== "" && (
      <IntroImage
      width={data.introWidth}
      src={data.introSrc}
    />
    )
    }
    <Section>
      <Row> 
        <Col span={12}>
        {
          data.introTitle !== "" && (
            <Title>
              <TitleBorder>{data.introTitle}</TitleBorder>
            </Title>
          )
        }
        </Col>
        <Col span={12}>
        {
        data.introHeading !== "" && (
          <Title level={2}>
            {data.introHeading}
          </Title>
        ) 
        }
        {
          data.introParagraph !== "" && (
            <Paragraph>
              {data.introParagraph}
          </Paragraph>
          ) 
        }
        </Col>
      </Row>
      
      
    </Section>
  </IntroContainer>
);

export default SIntro;

const IntroContainer = styled.div`
   {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--main-blue);
    color: var(--white);
    min-height: 40vh;
    width: 100%;
    padding: 20px;
  }
`;

const IntroImage = styled(Image)`
  height: 340px;
  object-fit: cover;
  object-position: top;
`;

const Section = styled.div`
  margin: 40px 0;
`;

const TitleBorder = styled.div`
  background-color: transparent;
  border: 0;
  border-top: solid 1px #000;
  display: block;
  height: 0;
  margin: 0 auto 20px 0;
  padding: 0;
  width: 37.5%;
`

/*
  @media screen and (min-width: 699px) {
    .intro-container {
      justify-content: start;
      align-items: flex-start;
      text-align: left;
      padding: 10%;
      height: 25vh;
    }
  
    .intro-p {
      max-width: 450px;
    }
  }
  */
