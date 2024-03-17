import React, { useState } from 'react';
import { AccountPlaytestPlayer, AccountPlaytestAdd, Modal } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const AccountPlaytestModal = ({ setShow }) => {
  const { username } = useApp();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value } = useFetch(url, {}, []);

  return (
    <Modal
      handleClose={() => setShow(false)}
      title="Manage Playtesters"
      size="sm"
    >
      <div className="flex flex-col gap-3">
        <AccountPlaytestAdd
          playtesters={value}
          newPlaytesters={newPlaytesters}
          setNewPlaytesters={setNewPlaytesters}
        />
        <div>
          {value &&
            [...newPlaytesters.toReversed(), ...Object.keys(value).toSorted()]
              /* .filter((u) => u != username) */
              .map((u) => (
                <AccountPlaytestPlayer key={u} username={u} lang={value[u]} />
              ))}
        </div>
      </div>
    </Modal>
  );
};

export default AccountPlaytestModal;
