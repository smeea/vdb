import React from 'react';
import { Navbar } from 'react-bootstrap';
import WifiOff from 'assets/images/icons/wifi-off.svg';
import { useApp } from 'context';

const OfflineNotification = () => {
  const { isOffline, isMobile } = useApp();

  return (
    <>
      {isOffline ? (
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
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

export default OfflineNotification;
