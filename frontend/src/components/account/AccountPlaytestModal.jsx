import React, { useState } from 'react';
import {
  AccountPlaytestPlayer,
  AccountPlaytestAdd,
  Button,
  Modal,
} from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const AccountPlaytestModal = ({ setShow }) => {
  const { username } = useApp();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest`;
  const { value } = useFetch(url, {}, []);

  const handleClose = () => setShow(false);

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

  return (
    <Modal handleClose={handleClose} title="Manage Playtesters">
      <div className="space-y-3">
        <AccountPlaytestAdd
          playtesters={value}
          newPlaytesters={newPlaytesters}
          setNewPlaytesters={setNewPlaytesters}
        />
        <div>
          {value &&
            [...newPlaytesters.reverse(), ...value.sort()]
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
