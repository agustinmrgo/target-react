import React from 'react';
import { element } from 'prop-types';
import { ReactComponent as Iphone6 } from 'assets/iphone6.svg';
import { ReactComponent as AppStoreBtn } from 'assets/appstore.svg';
import { ReactComponent as FacebookBtn } from 'assets/facebook.svg';
import { ReactComponent as TwitterBtn } from 'assets/twitter.svg';

const LandingLayout = ({ leftSideElement, rightSideElement }) => {
  return (
    <div className="flex-container-centered">
      <div className="flex-item flex-column-container">{leftSideElement}</div>
      <div className="flex-item flex-column-container blue-background">
        {rightSideElement || (
          <>
            <div className="svg-container">
              {/* <object
                alt="iphone 6 image"
                type="image/svg+xml"
                data="../../../assets/iphone6"
                width="100%"
                height="100%"
                className="svg-content"
              /> */}
              <Iphone6 className="iphone-6" />
            </div>
            <AppStoreBtn />
            <div className="flex-container social-buttons-container logo">
              <FacebookBtn />
              <TwitterBtn />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

LandingLayout.propTypes = {
  leftSideElement: element.isRequired,
  rightSideElement: element
};

export default LandingLayout;
