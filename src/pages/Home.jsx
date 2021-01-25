import React from "react";
import styled from "styled-components";
import SliderSection from "../components/Home/SSlider";
import ServicesSection from "../components/SServices";
import IntroductionSection from "../components/Home/SIntroduction";
import StatisticsSection from "../components/Home/SStatistics";
import ContactSection from "../components/Home/SContact";
import GallerySection from "../components/Home/SGallery";

import {Services} from "../data/Home.jsx"


const Home = () => {
  return (
    <React.Fragment>
      <SliderSection />
      <Container>
        <ServicesSection data={Services} />
        <IntroductionSection />
        <StatisticsSection />
        <ContactSection />
        <GallerySection />
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 64px auto;
`;

export default Home;
