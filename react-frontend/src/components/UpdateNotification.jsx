import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ButtonIconed } from 'components';
import X from 'assets/images/icons/x.svg';
import Activity from 'assets/images/icons/activity.svg';
import ListUl from 'assets/images/icons/list-task.svg';
import { useApp } from 'context';

const UpdateNotification = ({ appVersion }) => {
  const { isMobile } = useApp();
  const [show, setShow] = useState(false);
  const [version, setVersion] = useState();
  const [changes, setChanges] = useState();

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

  useEffect(() => {
    if (version && appVersion && appVersion < version) {
      setShow(true);
    }
  }, [version, appVersion]);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      animation={false}
      centered={true}
    >
      <Modal.Header className="py-2 px-3 py-md-3 px-md-4">
        <div className="d-flex bold blue large align-items-center">
          <div className="d-flex pe-2">
            <Activity />
          </div>
          Update available!
        </div>
        <Button variant="outline-secondary" onClick={() => setShow(false)}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center bold blue p-2">
          <div className="d-flex pe-2">
            <ListUl />
          </div>
          Changes [{version}]:
        </div>
        <div className="px-2">{changes}</div>
      </Modal.Body>
      <Modal.Footer>
        <ButtonIconed
          variant="primary"
          onClick={() => {
            window.location.reload(true);
          }}
          icon={<Activity />}
          text="Apply Update"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateNotification;
