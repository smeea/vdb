import React, { useState, useEffect } from 'react';
import { Modal, ButtonIconed } from 'components';
import Activity from 'assets/images/icons/activity.svg';
import ListUl from 'assets/images/icons/list-task.svg';
import changes from '~/../CHANGES.json';

const UpdateNotification = () => {
  const version = changes[0].version
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
        if (data.version > version) {
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
