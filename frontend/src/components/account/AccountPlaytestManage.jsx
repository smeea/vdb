import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import { AccountPlaytestAdd } from 'components';
import { useApp } from 'context';

const AccountPlaytestPlayer = ({ changePlaytester, username }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <div
      className={`flex items-center ${state ? '' : 'text-neutral-500'}`}
      onClick={handleClick}
    >
      <div className="flex items-center pe-2">
        <>
          {state ? (
            <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
          ) : (
            <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
          )}
        </>
      </div>
      {username}
    </div>
  );
};

const AccountPlaytestManage = ({ setShow }) => {
  const { isMobile, isNarrow, username } = useApp();

  const [playtesters, setPlaytesters] = useState([]);
  const [newPlaytesters, setNewPlaytesters] = useState([]);

  const changePlaytester = (u, isAdd) => {
    const url = `${process.env.API_URL}playtest`;
    const options = {
      method: isAdd ? 'PUT' : 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: u }),
    };

    fetch(url, options);
  };

  const getPlaytesters = () => {
    const url = `${process.env.API_URL}playtest`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        setPlaytesters(data);
      });
  };

  useEffect(() => {
    getPlaytesters();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} animation={false} size="md">
        <Modal.Header
          className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
        >
          <div className="text-lg text-blue font-bold"> className="text-lg text-blue font-bold">Manage Playtesters</div>
          <Button variant="outline-secondary" onClick={handleClose}>
            <X width="32" height="32" viewBox="0 0 16 16" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AccountPlaytestAdd
            playtesters={playtesters}
            newPlaytesters={newPlaytesters}
            setNewPlaytesters={setNewPlaytesters}
          />
          <div className="px-2 pt-2">
            {[...newPlaytesters.reverse(), ...playtesters.sort()]
              .filter((u) => u != username)
              .map((u) => (
                <AccountPlaytestPlayer
                  key={u}
                  changePlaytester={changePlaytester}
                  username={u}
                />
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {isNarrow && (
        <div
          onClick={handleClose}
          className="flex float-right-bottom float-clear items-center justify-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default AccountPlaytestManage;
