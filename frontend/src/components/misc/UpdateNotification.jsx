import React, { useState } from 'react';
import Activity from '@/assets/images/icons/activity.svg';
import { Modal, ButtonIconed } from '@/components';
import { useFetch } from '@/hooks';
import lastChange from '@/LAST_CHANGE.json';

const UpdateNotification = () => {
  const [update, setUpdate] = useState();
  const url = `${import.meta.env.VITE_API_URL}/version`;
  const { value } = useFetch(url, {}, []);
  if (update === undefined && value?.version > lastChange.version) {
    setUpdate(value);
  }

  return (
    <>
      {update && (
        <Modal
          handleClose={() => setUpdate(null)}
          title="Update available!"
          centered
        >
          <div className="gap-3 flex flex-col sm:gap-5">
            <div>
              <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Changes [{update.version}]:
              </div>
              <ul className="space-y-1">
                {update.changes.map((change, idx) => (
                  <li key={idx}>{change}</li>
                ))}
              </ul>
            </div>
            <div className="flex">
              <ButtonIconed
                variant="primary"
                onClick={() => {
                  window.location.reload(true);
                }}
                icon={<Activity />}
                text="Apply Update"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateNotification;
