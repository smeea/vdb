import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import {
  AccountPlaytestPlayer,
  AccountPlaytestAdd,
  Button,
  QuickSelect,
  Modal,
} from '@/components';
import { limitedCardAdd, limitedStore, useApp } from '@/context';

const AccountLimitedModal = ({ setShow }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const limitedCrypt = useSnapshot(limitedStore).crypt;
  const limitedLibrary = useSnapshot(limitedStore).library;

  const handleClose = () => setShow(false);

  const handleSetCard = (card) => {
    limitedCardAdd(card);
  };

  return (
    <Modal handleClose={handleClose} title="Manage Limited Format">
      <div className="flex flex-col gap-3">
        <QuickSelect setCard={handleSetCard} />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Crypt:
          </div>
          {Object.keys(limitedCrypt).map((c) => (
            <div key={c}>{cryptCardBase[c].Name}</div>
          ))}
        </div>
        <div>
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Library:
          </div>
          {Object.keys(limitedLibrary).map((card) => (
            <div key={card.Id}>{card.Name}</div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AccountLimitedModal;
