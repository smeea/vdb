import React from 'react';
import WifiOff from 'assets/images/icons/wifi-off.svg';
import { useApp } from 'context';

const OfflineNotification = () => {
  const { isOffline, isMobile } = useApp();

  return (
    <>
      {isOffline ? (
        <nav
          className={`bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark
          ${
            isMobile
              ? 'top-0 bg-bgPrimary dark:bg-bgPrimaryDark'
              : 'fixed bottom-0'
          }
`}
        >
          <div className="flex w-full items-center justify-center">
            <div className="flex ">
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
