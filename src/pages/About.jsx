import React from "react";
import { Row } from "antd";
import styled from "styled-components";
import IntroSection from "../components/SIntro.jsx";
import ServicesSection from "../components/SServices.jsx";
import FormSection from "../components/Contact/SForm.jsx";

import {DataAboutIntro, AboutServices, AboutTeam, DataAboutForm } from "../data/AboutUs.jsx"

import MailchimpSubscribe from '../components/Subscription/MailchimpSubscribe.jsx'
import SimpleForm from '../components/Subscription/SimpleForm.jsx'


const About = () => {
  return (
    <AboutContainer>
      <IntroSection data={DataAboutIntro}/>
      
      <Container>
        <ServicesSection data={AboutServices} />
        <ServicesSection data={AboutTeam} />
        
      </Container>
      <Row style={{ width: "100%" }}>
        <FormSection data={DataAboutForm} />
      </Row>
     
      <MailchimpSubscribe
                    url={process.env.REACT_APP_MAILCHIMP_URL}
                    render={({ subscribe, status, message }) => (
                    <div>
                        <SimpleForm onSubmitted={formData => subscribe(formData)} />
                        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
                        {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
                        {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
                    </div>
                    )}
                />    
            
            
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 64px auto;
`;


export default About;