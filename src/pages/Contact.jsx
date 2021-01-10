import React from "react";
import { Row } from "antd";
import styled from "styled-components";
import IntroSection from "../components/Contact/SIntro.jsx";
import InfoSection from "../components/Contact/SInfo.jsx";
import FormSection from "../components/Contact/SForm.jsx";
import MapSection from "../components/Contact/SMap.jsx";

const Contact = () => {
  return (
    <ContactContainer>
      <IntroSection />
      <Row>
        <FormSection />
        <InfoSection />
      </Row>
      <MapSection />
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Contact;
