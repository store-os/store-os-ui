import React from 'react'
import styled from "styled-components";


const SIntro = () => (
  <IntroContainer>
    <IntroH2>Our Mission</IntroH2>

    <IntroP>
      Every single person who understands the impact of the web should be an
      advocate and strive for a better, more inclusive web for all.
    </IntroP>
  </IntroContainer>
)

export default SIntro


const IntroContainer = styled.div`{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--main-blue);
    color: var(--white);
    height: 40vh;
    padding: 20px;
}`

const IntroH2 = styled.h2`{
    margin: 0;
}`

const IntroP = styled.p`{
    max-width: 85vw;
}`

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