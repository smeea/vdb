import React from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCryptName,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultClanImage,
} from 'components';
import { useApp, inventoryStore } from 'context';

const SelectLabelCrypt = ({ cardid, inInventory }) => {
  const { cryptCardBase } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {inInventory && (
            <div
              className={`d-inline text-center w-7 text-lg me-2 ${
                inventoryCrypt[cardid] ? 'border-bl rounded' : ''
              }`}
            >
              {inventoryCrypt[cardid] && inventoryCrypt[cardid].q}
            </div>
          )}
          <ResultCryptCapacity value={cryptCardBase[cardid].Capacity} />
          <div className="px-2">
            <ResultCryptName card={cryptCardBase[cardid]} />
            {cryptCardBase[cardid]['New'] && (
              <div className="d-inlinetext-neutral-500 ps-2">
                [G{cryptCardBase[cardid].Group}]
              </div>
            )}
          </div>
          <div className="pe-3">
            <ResultClanImage value={cryptCardBase[cardid].Clan} />
          </div>
        </div>
        <div className="d-flex whitespace-nowrap">
          <ResultCryptDisciplines value={cryptCardBase[cardid].Disciplines} />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
