import React, { useState, useEffect } from 'react';
import X from 'assets/images/icons/x.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import { ButtonFloat, AccountPlaytestAdd, Button, Modal } from 'components';
import { useApp } from 'context';

const AccountPlaytestPlayer = ({ changePlaytester, username }) => {
  const [state, setState] = useState(true);

  const handleClick = () => {
    changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <div
      className={`flex items-center ${state ? '' : 'text-midGray dark:text-midGrayDark'}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
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
  const { isNarrow, username } = useApp();

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
      <Modal handleClose={handleClose} title="Manage Playtesters">
        <AccountPlaytestAdd
          playtesters={playtesters}
          newPlaytesters={newPlaytesters}
          setNewPlaytesters={setNewPlaytesters}
        />
        <div>
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

        <div>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="bg-[#a06060] opacity-80">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default AccountPlaytestManage;
