import React from 'react';
import WifiOff from '@icons/wifi-off.svg?react';
import { GlobalNotification } from '@/components';
import { useApp } from '@/context';

const OfflineNotification = () => {
  const { isOnline } = useApp();

  return (
    <>
      {!isOnline && (
        <GlobalNotification>
          <WifiOff width="20" height="20" viewBox="0 0 16 16" />
          OFFLINE
        </GlobalNotification>
      )}
    </>
  );
};

export default OfflineNotification;
