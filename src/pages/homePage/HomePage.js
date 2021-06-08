import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'hooks';
// import { MapContainer, Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';

import './homePage.scss';

import LogoutButton from 'components/user/LogoutButton';

const HomePage = () => {
  const { user } = useSession();
  // const defaultPosition = [48.864716, 2.349]; // Paris position
  // const position = [51.505, -0.09];
  return (
    <div>
      {user && user.email && (
        <div className="map-container">
          <div className="container-sidebar">
            <p>
              <FormattedMessage id="home.welcome" values={user} />
            </p>
          </div>
          <div className="container-main">
            {/* <LeafletMap center={position} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup.
                  <br />
                  Easily customizable.
                </Popup>
              </Marker>
            </LeafletMap> */}
            {/* <Map center={[45.4, -75.7]} zoom={12}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </Map> */}
            {/* <iframe
              title="embedded-map"
              className="map-frame"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJOwg_06VPwokRYv534QaPC8g&key=AIzaSyASUUbWw1kTgSYzba64Y7H7T4W8rTlJdfc"
            /> */}
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <LogoutButton />
    </div>
  );
};

export default HomePage;
