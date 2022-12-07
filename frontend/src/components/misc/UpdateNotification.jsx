import React, { useState, useEffect } from 'react';
import { Modal, ButtonIconed } from 'components';
import Activity from 'assets/images/icons/activity.svg';
import ListUl from 'assets/images/icons/list-task.svg';

const UpdateNotification = ({ appVersion }) => {
  const [version, setVersion] = useState(undefined);
  const [changes, setChanges] = useState(undefined);
  const [show, setShow] = useState(
    version && appVersion && appVersion < version
  );

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
        setVersion(data.version);

        setChanges(
          <ul>
            {data.changes.map((change, idx) => (
              <li key={idx}>{change}</li>
            ))}
          </ul>
        );
      });
  }, []);

  return (
    <>
      {show && (
        <Modal
          handleClose={() => setShow(false)}
          title="Update available!"
          centered
        >
          <div>
            <div className="text-blue flex items-center p-2 font-bold">
              <div className="pe-2 flex">
                <ListUl />
              </div>
              Changes [{version}]:
            </div>
            <div className="px-2">{changes}</div>
            {/* TODO fix button placement */}
            <ButtonIconed
              variant="primary"
              onClick={() => {
                window.location.reload(true);
              }}
              icon={<Activity />}
              text="Apply Update"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default UpdateNotification;
