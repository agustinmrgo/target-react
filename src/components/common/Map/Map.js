import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import GoogleMapReact from 'google-map-react';
import Loading from 'components/common/Loading';
import { targetIcon } from 'utils/helpers';

import { yellowTargetBackground } from 'constants/colors';
import routesPaths from 'constants/routesPaths';
import { FULFILLED, PENDING, REJECTED } from 'constants/actionStatusConstants';

import { useDispatch, useTarget, useStatus, useResponsive } from 'hooks';
import {
  getAllTargets,
  setCurrentTargetCoordinates,
  createTarget
} from 'state/actions/targetActions';

import { ReactComponent as LocationOval } from 'assets/oval_location.svg';
import { ReactComponent as LocationIcon } from 'assets/icon_location.svg';
import ProfileIcon from 'assets/profile_placeholder.svg';
import { DEFAULT_COORDINATES } from 'constants/constants';
import './map.scss';

const Map = ({
  defaultCenter = DEFAULT_COORDINATES,
  defaultZoom = 14,
  enableCurrentLocationMarker = true,
  ...props
}) => {
  const intl = useIntl();
  const [locationStatus, setLocationStatus] = useState('');
  const [currentLocation, setCurrentLocation] = useState(defaultCenter);
  const getAllTargetsRequest = useDispatch(getAllTargets);
  const setClickedCoordenates = useDispatch(setCurrentTargetCoordinates);
  const { targets } = useTarget();
  const { status: getAllTargetsStatus, error: getAllTargetsError } = useStatus(getAllTargets);
  const { status: createTargetStatus, error: createTargetError } = useStatus(createTarget);
  const history = useHistory();
  const isTabletOrMobile = useResponsive();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);
    getAllTargetsRequest();
  }, [locationStatus, getAllTargetsRequest]);

  useEffect(() => {
    if (createTargetStatus === FULFILLED) {
      getAllTargetsRequest();
    }
  }, [createTargetStatus, getAllTargetsRequest]);

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

  const handleMapClick = ({ lat, lng }) => {
    setClickedCoordenates({ lat, lng });
    if (window.location.pathname !== routesPaths.createTarget) {
      history.push(routesPaths.createTarget);
    }
  };

  const handleHomeClick = () => history.push(routesPaths.index);

  const createMapOptions = { disableDefaultUI: true, zoomControl: true };

  return (
    <div className="map-container">
      {getAllTargetsStatus === FULFILLED && (
        <GoogleMapReact
          defaultCenter={defaultCenter}
          center={currentLocation}
          defaultZoom={defaultZoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleTargetsCircles}
          onClick={handleMapClick}
          options={createMapOptions}
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
      {isTabletOrMobile && (
        <div className="home-icon-background floating-icon" onClick={handleHomeClick}>
          <img
            src={ProfileIcon}
            alt={intl.formatMessage({ id: 'alt.smilies' })}
            className="home-icon"
          />
        </div>
      )}
      {getAllTargetsStatus === PENDING && <Loading />}
      {(getAllTargetsStatus === REJECTED || createTargetStatus === REJECTED) && (
        <div className="error-message">
          <p>{getAllTargetsError || createTargetError}</p>
          <p>
            <FormattedMessage id="network.rejected" />
          </p>
        </div>
      )}
    </div>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
