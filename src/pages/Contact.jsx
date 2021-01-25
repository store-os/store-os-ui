import React from "react";
import { Row } from "antd";
import styled from "styled-components";
import IntroSection from "../components/SIntro.jsx";
import InfoSection from "../components/Contact/SInfo.jsx";
import FormSection from "../components/Contact/SForm.jsx";
import MapSection from "../components/Contact/SMap.jsx";
import {dataContactIntro, dataForm, socialInfo} from "../data/Contact.jsx" 


const Contact = () => {
  return (
    <ContactContainer>
      <IntroSection data={dataContactIntro} />
      <Row style={{ width: "100%" }}>
        <FormSection data={dataForm} />
        <InfoSection data={socialInfo} />
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
