import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import GoogleMapReact from 'google-map-react';

import './homePage.scss';

import LogoutButton from 'components/user/LogoutButton';

const defaultCoords = { lat: -26.851311, lng: -65.702984 };

const HomePage = () => {
  const [locationStatus, setLocationStatus] = useState('');
  const [lati, setLati] = useState(-26.851311);
  const [long, setLong] = useState(-65.702984);
  const { user } = useSession();

  useEffect(() => {
    const success = position => {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
    };
    const error = () => setLocationStatus('Unable to retrieve your location');
    navigator.geolocation.getCurrentPosition(success, error);
  }, [locationStatus]);

  return (
    <div>
      {user && user.email && (
        <div className="map-container">
          <div className="home-sidebar">
            <p>
              <FormattedMessage id="home.welcome" values={user} />
            </p>
            <LogoutButton />
          </div>
          <div className="home-main">
            <GoogleMapReact
              defaultCenter={defaultCoords}
              center={{ lat: lati, lng: long }}
              defaultZoom={11}
            >
              <div lat={lati} lng={long} className="map-marker">
                Some marker!
              </div>
            </GoogleMapReact>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
