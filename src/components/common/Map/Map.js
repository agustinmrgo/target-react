import React, { useState, useEffect } from 'react';
import { number, shape, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GoogleMapReact from 'google-map-react';
import Loading from 'components/common/Loading';

import { useDispatch, useTargets } from 'hooks';
import { getAllTargets } from 'state/actions/targetActions';

import ArtTopicIcon from 'assets/art_topic_icon.png';
import SeriesTopicIcon from 'assets/series_topic_icon.png';
import MoviesTopicIcon from 'assets/movies_topic_icon.png';
import FoodTopicIcon from 'assets/food_topic_icon.png';
import DatingTopicIcon from 'assets/dating_topic_icon.png';
import FootballTopicIcon from 'assets/football_topic_icon.png';
import MusicTopicIcon from 'assets/music_topic_icon.png';
import PoliticsTopicIcon from 'assets/politics_topic_icon.png';

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
  const { targets } = useTargets();

  useEffect(() => {
    const success = ({ coords: { latitude, longitude } }) => {
      setCurrentLocation({ lat: latitude, lng: longitude });
    };
    const error = () => setLocationStatus(<FormattedMessage id="home.current_location_failed" />);
    navigator.geolocation.getCurrentPosition(success, error);
    getAllTargetsRequest();
  }, [locationStatus, getAllTargetsRequest]);

  // eslint-disable-next-line react/no-multi-comp
  const targetIcon = target => {
    switch (target.topicId) {
      case 2:
        return FootballTopicIcon;
      case 13:
        return PoliticsTopicIcon;
      case 14:
        return ArtTopicIcon;
      case 15:
        return DatingTopicIcon;
      case 16:
        return MusicTopicIcon;
      case 17:
        return MoviesTopicIcon;
      case 18:
        return SeriesTopicIcon;
      case 19:
        return FoodTopicIcon;
      default:
        return MusicTopicIcon;
    }
  };

  const handleTargetsCircles = ({ map, maps }) => {
    return targets.map(({ target }) => {
      return [
        new maps.Circle({
          strokeColor: '#efc638',
          strokeOpacity: 0.7,
          strokeWeight: 1,
          fillColor: '#efc638',
          fillOpacity: 0.7,
          map,
          center: { lat: target.lat, lng: target.lng },
          radius: target.radius
        }),
        new maps.Marker({
          position: { lat: target.lat, lng: target.lng },
          map,
          icon: {
            url: targetIcon(target)
          }
        })
      ];
    });
  };

  // const renderTargets = () => {
  //   let topicIcon = null;
  //   return targets.map(({ target }) => {
  //     topicIcon = null;
  //     switch (target.topicId) {
  //       case 2:
  //         topicIcon = <FootballTopicIcon className="topic-icon" />;
  //         break;
  //       case 13:
  //         topicIcon = <PoliticsTopicIcon className="" />;
  //         break;
  //       case 14:
  //         topicIcon = <ArtTopicIcon className="" />;
  //         break;
  //       case 15:
  //         topicIcon = <DatingTopicIcon className="" />;
  //         break;
  //       case 16:
  //         topicIcon = <MusicTopicIcon className="" />;
  //         break;
  //       case 17:
  //         topicIcon = <MoviesTopicIcon className="" />;
  //         break;
  //       case 18:
  //         topicIcon = <SeriesTopicIcon className="" />;
  //         break;
  //       case 19:
  //         topicIcon = <FoodTopicIcon className="" />;
  //         break;
  //       default:
  //         topicIcon = <FootballTopicIcon className="" />;
  //         break;
  //     }
  //     return (
  //       <div
  //         key={target.id}
  //         lat={target.lat}
  //         lng={target.lng}
  //         style={{ transform: 'translate(50%, 50%)' }}
  //       >
  //         {/* <div
  //           className="target-background"
  //           key={target.id}
  //           lat={target.lat}
  //           lng={target.lng}
  //           style={{ width: target.radius / 100, height: target.radius / 100 }}
  //         /> */}
  //         {/* <FootballTopicIcon
  //           key={target.id}
  //           lat={target.lat}
  //           lng={target.lng}
  //           className="topic-icon"
  //         /> */}
  //         {/* <LocationOval className="current-location-marker" /> */}
  //         {topicIcon}
  //       </div>
  //       // <div
  //       //   className="target-background"
  //       //   key={target.id}
  //       //   lat={target.lat}
  //       //   lng={target.lng}
  //       //   style={{ width: 100, height: 100 }}
  //       // >
  //       //   {topicIcon}
  //       // </div>
  //     );
  //   });
  // };

  return (
    <>
      {targets.length !== 0 && (
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
          {/* {targets.length !== 0 && renderTargets()} */}
        </GoogleMapReact>
      )}
      {targets.length === 0 && <Loading />}
    </>
  );
};

Map.propTypes = {
  defaultCenter: shape({ lat: number, lng: number }),
  defaultZoom: number,
  enableCurrentLocationMarker: bool
};

export default Map;
