import React from 'react'
import GoogleMapReact from 'google-map-react'


import {
    EnvironmentFilled,
  } from "@ant-design/icons";


const LocationPin = ({ text }) => (
    <div className="pin">
      <EnvironmentFilled/>
      <p className="pin-text">{text}</p>
    </div>
  )
  
  const SMap = ({ location, zoomLevel }) => (
    <div className="map">
      <h2 className="map-h2">Ven a visitarnos!</h2>
  
      <div className="google-map" style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  )
  
  export default SMap

