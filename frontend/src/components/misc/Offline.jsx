import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import WifiOff from 'assets/images/icons/wifi-off.svg';
import { useApp } from 'context';

const Offline = (props) => {
  const { isMobile } = useApp();

  return (
    <Navbar
      fixed={isMobile ? null : 'bottom'}
      sticky={isMobile ? 'top' : null}
      className="offline-bar"
    >
      <div className="d-flex justify-content-center align-items-center w-100 m-1">
        <div className="d-flex pe-2">
          <WifiOff width="20" height="20" viewBox="0 0 16 16" />
        </div>
        OFFLINE
      </div>
    </Navbar>
  );
}

export default Offline;
