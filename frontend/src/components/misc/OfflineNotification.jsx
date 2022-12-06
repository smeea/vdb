import React from 'react';
import WifiOff from 'assets/images/icons/wifi-off.svg';
import { useApp } from 'context';

const OfflineNotification = () => {
  const { isOffline, isMobile } = useApp();

  return (
    <>
      {isOffline ? (
        <nav
          className="sticky offline-bar top-0"
          /* fixed={isMobile ? null : 'bottom'} */
          /* sticky={isMobile ? 'top' : null} */
          /* className="offline-bar" */
        >
          <div className="flex justify-center items-center w-100 m-1">
            <div className="flex pe-2">
              <WifiOff width="20" height="20" viewBox="0 0 16 16" />
            </div>
            OFFLINE
          </div>
        </nav>
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

export default OfflineNotification;
