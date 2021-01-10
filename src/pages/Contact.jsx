
import React from "react";

import IntroSection from '../components/SIntro.jsx'
import InfoSection from '../components/SInfo.jsx'
import FormSection from '../components/SForm.jsx'
import MapSection from '../components/SMap.jsx'

const location = {
  address: 'Comercial Alchersán',
  lat: 43.3814921,
  lng: -5.767275,
}

const Contact = () => {  

  return (
    <div>
    <IntroSection />
    <InfoSection />
    <FormSection />
    <MapSection location={location} zoomLevel={17} /> {/* include it here */}
    </div>
  );
};


export default Contact;
