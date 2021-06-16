import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';

import { ReactComponent as LocationOval } from 'assets/oval_location.svg';
import { ReactComponent as LocationIcon } from 'assets/icon_location.svg';
import { DEFAULT_COORDINATES } from '../../../constants/constants';
import './map.scss';

const Map = ({
  defaultCenter = DEFAULT_COORDINATES,
  defaultZoom = 14,
  enableCurrentLocationMarker = true,
  ...props
}) => {
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
      {enableCurrentLocationMarker && (
        <div lat={currentLocation.lat} lng={currentLocation.lng}>
          <LocationOval className="current-location-marker" />
          <LocationIcon className="current-location-marker current-location-icon" />
        </div>
      )}
    </GoogleMapReact>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
