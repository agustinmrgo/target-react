import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';
import Loading from 'components/common/Loading';
import { targetIcon } from 'utils/helpers';
import { yellowTargetBackground } from 'constants/colors';
import routesPaths from 'constants/routesPaths';
import { FULFILLED, PENDING, REJECTED } from 'constants/actionStatusConstants';

import { useDispatch, useTarget, useStatus } from 'hooks';
import {
  getAllTargets,
  setCurrentTargetCoordinates,
  createTarget
} from 'state/actions/targetActions';

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
  const setClickedCoordenates = useDispatch(setCurrentTargetCoordinates);
  const { targets } = useTarget();
  const { status: getAllTargetsStatus, error: getAllTargetsError } = useStatus(getAllTargets);
  const { status: createTargetStatus, error: createTargetError } = useStatus(createTarget);
  const history = useHistory();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);

    if (getAllTargetsStatus !== FULFILLED) {
      getAllTargetsRequest();
    }
  }, [locationStatus, getAllTargetsRequest, getAllTargetsStatus]);

  useEffect(() => {
    if (createTargetStatus === FULFILLED) {
      getAllTargetsRequest();
    }
  }, [createTargetStatus, getAllTargetsRequest]);

  const handleTargetsCircles = ({ map, maps }) => {
    // console.log(
    //   '🚀 ~ file: Map.js ~ maps.ControlPosition.BOTTOM_CENTER',
    //   maps.ControlPosition.BOTTOM_CENTER
    // );
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

  const createMapOptions = { disableDefaultUI: true, zoomControl: true };

  return (
    <>
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
      {getAllTargetsStatus === PENDING && <Loading />}
      {(getAllTargetsStatus === REJECTED || createTargetStatus === REJECTED) && (
        <div className="error-message">
          <p>{getAllTargetsError || createTargetError}</p>
          <p>
            <FormattedMessage id="network.rejected" />
          </p>
        </div>
      )}
    </>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
