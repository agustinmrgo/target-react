import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';
import Loading from 'components/common/Loading';
import { targetIcon } from 'utils/helpers';
import { yellowTargetBackground } from 'constants/colors';
import { FULFILLED } from 'constants/actionStatusConstants';

import { useDispatch, useTargets } from 'hooks';
import { getAllTargets } from 'state/actions/targetActions';

import { ReactComponent as LocationOval } from 'assets/oval_location.svg';
import { ReactComponent as LocationIcon } from 'assets/icon_location.svg';
import { DEFAULT_COORDINATES } from 'constants/constants';
import './map.scss';

const Map = ({
  defaultCenter = DEFAULT_COORDINATES,
  defaultZoom = 14,
  enableCurrentLocationMarker = true,
  ...props
}) => {
  const [locationStatus, setLocationStatus] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const getAllTargetsRequest = useDispatch(getAllTargets);
  const { targets, status } = useTargets();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);
    getAllTargetsRequest();
  }, [locationStatus, getAllTargetsRequest]);

  const handleTargetsCircles = ({ map, maps }) => {
    return targets.map(({ target: { lat, lng, radius, topicId } }) => {
      return [
        new maps.Circle({
          strokeColor: yellowTargetBackground,
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: yellowTargetBackground,
          fillOpacity: 0.7,
          map,
          center: { lat, lng },
          radius
        }),
        new maps.Marker({
          position: { lat, lng },
          map,
          icon: {
            url: targetIcon(topicId)
          }
        })
      ];
    });
  };

  return (
    <>
      {status === FULFILLED && (
        <GoogleMapReact
          defaultCenter={defaultCenter}
          center={currentLocation}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleTargetsCircles}
          {...props}
        >
          {enableCurrentLocationMarker && (
            <div lat={currentLocation.lat} lng={currentLocation.lng}>
              <LocationOval className="current-location-marker" />
              <LocationIcon className="current-location-marker current-location-icon" />
            </div>
          )}
        </GoogleMapReact>
      )}
      {status !== FULFILLED && <Loading />}
    </>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
