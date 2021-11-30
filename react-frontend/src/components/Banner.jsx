import React, { useContext } from 'react';
import AppContext from 'context/AppContext.js';

function Banner(props) {
  const { isMobile } = useContext(AppContext);

  return (
    <div
      className={
        isMobile
          ? 'd-flex justify-content-between align-items-center mb-3 logo-box'
          : 'd-flex justify-content-between align-items-center my-3 logo-box'
      }
    >
      <div className="d-flex align-items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
        />
        <div className="d-inline logo-text px-2">VDB</div>
        {!isMobile && (
          <div className="d-inline logo-subtext ps-2">
            <i>&mdash; your digital retainer</i>
          </div>
        )}
      </div>
      <div className="d-inline px-2">
        <div className="d-flex justify-content-end small">
          <i>If only I had a laptop...</i>
        </div>
        <div className="d-flex justify-content-end small">
          <i>- Enkidu, The Noah</i>
        </div>
      </div>
    </div>
  );
}

export default Banner;
