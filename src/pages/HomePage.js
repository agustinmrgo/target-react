import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import GoogleMapReact from 'google-map-react';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';

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
    <>
      {user && user.email && (
        <MainLayout
          sidebarContent={
            <>
              <p>
                <FormattedMessage id="home.welcome" values={user} />
              </p>
              <LogoutButton />
            </>
          }
          mainContent={
            <GoogleMapReact
              defaultCenter={defaultCoords}
              center={{ lat: lati, lng: long }}
              defaultZoom={12}
            >
              <div lat={lati} lng={long} className="map-marker">
                <FormattedMessage id="home.current-location" />
              </div>
            </GoogleMapReact>
          }
        />
      )}
    </>
  );
};

export default HomePage;
