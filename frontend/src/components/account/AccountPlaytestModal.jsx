import React, { useState, useEffect } from 'react';
import {
  AccountPlaytestPlayer,
  AccountPlaytestAdd,
  Button,
  Modal,
} from '@/components';
import { useApp } from '@/context';

const AccountPlaytestModal = ({ setShow }) => {
  const { username } = useApp();
  const [playtesters, setPlaytesters] = useState([]);
  const [newPlaytesters, setNewPlaytesters] = useState([]);

  const changePlaytester = (user, isAdd) => {
    const url = `${import.meta.env.VITE_API_URL}/playtest`;
    const options = {
      method: isAdd ? 'PUT' : 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user }),
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
      </div>
    </Modal>
  );
};

export default AccountPlaytestModal;
