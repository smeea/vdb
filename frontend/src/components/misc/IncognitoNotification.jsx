import React from 'react';
import { Link } from 'react-router-dom';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg';
import { GlobalNotification } from '@/components';
import { useApp } from '@/context';

const IncognitoNotification = () => {
  const { isNoIndexDB } = useApp();

  return (
    <>
      {isNoIndexDB ? (
        <GlobalNotification>
          <div className="flex flex-col justify-center text-base  py-1">
            <div className="flex items-center justify-center">
              <Exclamation
                width="17"
                heigth="17"
                viewBox="0 0 16 16"
                className="inline pr-1"
              />
              Don&apos;t work on Firefox in Incognito mode
            </div>
            <div className="flex items-center justify-center text-sm">
              <Link
                target="_blank"
                to="https://bugzilla.mozilla.org/show_bug.cgi?id=781982"
              >
                https://bugzilla.mozilla.org/show_bug.cgi?id=781982
              </Link>
            </div>
          </div>
        </GlobalNotification>
      ) : (
        <React.Fragment />
      )}
    </>
  );
};

export default IncognitoNotification;
