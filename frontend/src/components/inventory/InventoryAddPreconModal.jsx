import React, { useState, useMemo } from 'react';
import {
  DeckSortButton,
  InventoryAddPreconRow,
  Modal,
  Input,
} from '@/components';
import { decksSort } from '@/utils';
import { useApp } from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const InventoryAddPreconModal = ({ handleClose }) => {
  const { preconDecks, playtest, isDesktop, isMobile } = useApp();
  const [sortMethod, setSortMethod] = useState('byDate');
  const [nameFilter, setNameFilter] = useState('');
  const [setFilter, setSetFilter] = useState('');

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

  const sortedDecks = useMemo(() => {
    if (Object.values(preconDecks).length > 0) {
      let filtered = Object.values(preconDecks).filter((i) => {
        const set = i.deckid.split(':')[0];
        return playtest || set !== 'PLAYTEST';
      });

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (setFilter) {
        filtered = filtered.filter((deck) => {
          const set = deck.deckid.split(':')[0];
          if (
            setsAndPrecons[set].name
              .toLowerCase()
              .indexOf(setFilter.toLowerCase()) >= 0
          )
            return true;
        });
      }

      return decksSort(filtered, sortMethod);
    } else {
      return [];
    }
  }, [preconDecks, nameFilter, setFilter, sortMethod]);

  return (
    <Modal
      handleClose={handleClose}
      size="xl"
      title="Import Precon to Inventory"
    >
      <div>
        <table className="inv-import-precons-table border-bgSecondary dark:border-bgSecondaryDark sm:border">
          <thead>
            <tr>
              {!isMobile && <th className="min-w-[50px]"></th>}
              <th className="min-w-[230px] sm:min-w-[250px]">
                <Input
                  placeholder="Filter by Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              {isDesktop && <th className="min-w-[40px]"></th>}
              <th className="w-full">
                <Input
                  placeholder="Filter by Set"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={setFilter}
                  onChange={handleChangeSetFilter}
                />
              </th>
              <th className="min-w-[110px]">
                <div className="flex items-center justify-end">
                  <DeckSortButton onChange={setSortMethod} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDecks.map((deck, idx) => {
              return (
                <InventoryAddPreconRow
                  key={deck.deckid}
                  deck={deck}
                  idx={idx}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default InventoryAddPreconModal;
