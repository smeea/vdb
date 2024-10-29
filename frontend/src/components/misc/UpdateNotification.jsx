import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Activity from '@/assets/images/icons/activity.svg?react';
import { Spinner, Hr, Modal, ButtonIconed, TextWithLinks } from '@/components';
import { useFetch } from '@/hooks';
import lastChange from '@/LAST_CHANGE.json';

const UpdateNotification = () => {
  const [update, setUpdate] = useState();
  const [isLoading, setIsLoading] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_API_URL}/version`;
  const { value } = useFetch(url, {}, []);
  if (update === undefined && value?.version > lastChange.version) {
    setUpdate(value);
  }

  return (
    <>
      {update && (
        <Modal handleClose={() => setUpdate(null)} title="Update available!" centered>
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Changes [{update.version}]:
              </div>
              <ul className="flex flex-col gap-1.5">
                {update.changes.map((change, idx) => (
                  <li key={idx}>
                    <TextWithLinks>{change}</TextWithLinks>
                  </li>
                ))}
              </ul>
            </div>
            <Hr />
            <ButtonIconed
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                navigate(location.pathname);
              }}
              icon={isLoading ? <Spinner className="size-5" /> : <Activity />}
              text={isLoading ? 'Loading, please wait...' : 'Apply Update'}
            />
            <div className="text-sm text-fgRed dark:text-fgRedDark">
              If this window show up again after clicking Apply Update, please refresh the page
              (Ctrl+F5 on Windows/Linux, Command+Shift+R on MacOS, swipe down on mobile)
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateNotification;
