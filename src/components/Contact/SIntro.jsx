import React from "react";
import styled from "styled-components";
import { Typography, Image } from "antd";

const { Title, Paragraph } = Typography;

const SIntro = () => (
  <IntroContainer>
    <IntroImage
      width={"100%"}
      src="https://s1.kaercher-media.com/media/image/file/5236/d0/karcher-centers-espana.webp"
      preview={false}
    />
    <Section>
      <Title>Our Mission</Title>
      <Paragraph>
        Every single person who understands the impact of the web <br />
        should be an advocate and strive for a better, more inclusive web for
        all.
      </Paragraph>
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
