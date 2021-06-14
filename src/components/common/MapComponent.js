import React, { useState, useEffect } from 'react';
import { number, shape } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';

const coordsShape = shape({ lat: number, lng: number });

const MapComponent = ({ defaultCenter, center, defaultZoom, ...props }) => {
  const [locationStatus, setLocationStatus] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);
  }, [locationStatus]);

  return (
    <GoogleMapReact
      defaultCenter={defaultCenter}
      center={currentLocation}
      defaultZoom={defaultZoom}
      {...props}
    >
      <div lat={currentLocation.lat} lng={currentLocation.lng} className="map-location-marker">
        <FormattedMessage id="home.current_location" />
      </div>
    </GoogleMapReact>
  );
};

MapComponent.propTypes = {
  defaultCenter: coordsShape,
  center: coordsShape,
  defaultZoom: number
};

MapComponent.defaultProps = {
  defaultCenter: { lat: -26.851311, lng: -65.702984 },
  center: { lat: -26.851311, lng: -65.702984 },
  defaultZoom: 12
};

export default MapComponent;
