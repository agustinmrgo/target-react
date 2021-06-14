import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
import GoogleMapReact from 'google-map-react';

import LogoutButton from 'components/user/LogoutButton';
import MainLayout from 'components/common/MainLayout';

const defaultCoords = { lat: -26.851311, lng: -65.702984 };

const HomePage = () => {
  const [locationStatus, setLocationStatus] = useState('');
  const [lati, setLati] = useState(defualtCoords.lat);
  const [long, setLong] = useState(defaultCoords.lng);
  const { user } = useSession();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setLati(latitude);
      setLong(longitude);
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
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
                <FormattedMessage id="home.current_location" />
              </div>
            </GoogleMapReact>
          }
        />
      )}
    </>
  );
};

export default HomePage;
