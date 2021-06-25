import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';

import { useDispatch, useTargets } from 'hooks';
import { getAllTargets } from 'state/actions/targetActions';

import { ReactComponent as LocationOval } from 'assets/oval_location.svg';
import { ReactComponent as LocationIcon } from 'assets/icon_location.svg';
import { DEFAULT_COORDINATES } from 'constants/constants';
// import Target from './Target';
import './map.scss';

// const greatPlaceStyle = {
//   position: 'absolute',
//   transform: 'translate(-50%, -50%)'
// };

const Map = ({
  defaultCenter = DEFAULT_COORDINATES,
  defaultZoom = 14,
  enableCurrentLocationMarker = true,
  ...props
}) => {
  const [locationStatus, setLocationStatus] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const getAllTargetsRequest = useDispatch(getAllTargets);
  const { targets } = useTargets();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);
    getAllTargetsRequest();
  }, [locationStatus, getAllTargetsRequest]);

  const renderTargets = () =>
    targets.map(({ target }) => (
      <div key={target.id} lat={target.lat} lng={target.lng}>
        <LocationOval className="current-location-marker" />
        <LocationIcon className="current-location-marker current-location-icon" />
      </div>
    ));

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
      {targets.length !== 0 && renderTargets()}
      {/* {targets.map(({ target }) => (
        <Target key={target.id} target={target} />
        ))} */}
      {/* {targets.length !== 0 && (
        <Target
          key={targets[0].id}
          target={targets[0]}
          style={greatPlaceStyle}
          lat={targets[0].lat}
          lng={targets[0].lng}
        />
      )} */}
      {/* <div
        lat={-26.8098598}
        lng={-65.2309896}
        style={{ border: '3px solid red', width: 40, height: 40, color: 'red' }}
      >
        HI !
      </div> */}
    </GoogleMapReact>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
