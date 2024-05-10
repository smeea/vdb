import React, { useState } from 'react';
import { PlaytestManagePlayer, PlaytestManageAdd, Modal } from '@/components';
import { useFetch } from '@/hooks';

const PlaytestManageModal = ({ setShow }) => {
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value } = useFetch(url, {}, []);

  return (
    <Modal handleClose={() => setShow(false)} title="Manage Playtesters" size="sm">
      <div className="flex flex-col gap-3">
        <PlaytestManageAdd
          playtesters={value}
          newPlaytesters={newPlaytesters}
          setNewPlaytesters={setNewPlaytesters}
        />
        <div>
          {value &&
            [...newPlaytesters.toReversed(), ...Object.keys(value).toSorted()].map((u) => (
              <PlaytestManagePlayer key={u} username={u} lang={value[u]} />
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default PlaytestManageModal;
