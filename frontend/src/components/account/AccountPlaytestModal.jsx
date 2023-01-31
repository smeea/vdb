import React, { useState, useEffect } from 'react';
import X from '@/assets/images/icons/x.svg';
import {
  AccountPlaytestPlayer,
  AccountPlaytestAdd,
  ButtonFloat,
  Button,
  Modal,
} from '@/components';
import { useApp } from '@/context';

const AccountPlaytestModal = ({ setShow }) => {
  const { isNarrow, username } = useApp();
  const [playtesters, setPlaytesters] = useState([]);
  const [newPlaytesters, setNewPlaytesters] = useState([]);

  const changePlaytester = (u, isAdd) => {
    const url = `${import.meta.env.VITE_API_URL}/playtest`;
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
    const url = `${import.meta.env.VITE_API_URL}/playtest`;
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
    <Modal handleClose={handleClose} title="Manage Playtesters">
      <div className="space-y-3">
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
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
        {isNarrow && (
          <ButtonFloat onClick={handleClose} variant="danger">
            <X width="40" height="40" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
      </div>
    </Modal>
  );
};

export default AccountPlaytestModal;
