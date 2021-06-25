import React from 'react';
import { number, shape } from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import GoogleMapReact from 'google-map-react';

// import { useDispatch, useTargets } from 'hooks';
// import { getAllTargets } from 'state/actions/targetActions';

import { ReactComponent as LocationOval } from 'assets/oval_location.svg';
import { ReactComponent as LocationIcon } from 'assets/icon_location.svg';
import './map.scss';

// const greatPlaceStyle = {
//   position: 'absolute',
//   transform: 'translate(-50%, -50%)'
// };

const Target = ({ target }) => {
  // console.log('🚀 ~ Target ~ target\n', target);
  return (
    <div lat={target.lat} lng={target.lng}>
      <LocationOval className="current-location-marker" />
      <LocationIcon className="current-location-marker current-location-icon" />
    </div>
  );
};

Target.propTypes = {
  target: shape({ id: number, radius: number, lat: number, lng: number }).isRequired
};

export default Target;
