import React, { useState, useEffect } from 'react';
import { Modal, ButtonIconed } from 'components';
import Activity from 'assets/images/icons/activity.svg';
import ListUl from 'assets/images/icons/list-task.svg';
import lastChange from '~/../LAST_CHANGE.json';

const UpdateNotification = () => {
  const [update, setUpdate] = useState();

  useEffect(() => {
    const url = `${process.env.API_URL}version`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.version > lastChange.version) {
          setUpdate(data);
        }
      });
  }, []);

  return (
    <>
      {update && (
        <Modal
          handleClose={() => setUpdate(false)}
          title="Update available!"
          centered
        >
          <div className="flex items-center font-bold text-fgSecondary dark:text-fgSecondaryDark">
            <div className="flex ">
              <ListUl />
            </div>
            Changes [{update.version}]:
          </div>
          <div>
            <ul>
              {update.changes.map((change, idx) => (
                <li key={idx}>{change}</li>
              ))}
            </ul>
          </div>
          <ButtonIconed
            variant="primary"
            onClick={() => {
              window.location.reload(true);
            }}
            icon={<Activity />}
            text="Apply Update"
          />
        </Modal>
      )}
    </>
  );
};

export default UpdateNotification;
