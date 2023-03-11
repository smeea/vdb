import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { SelectCreatable } from '@/components';
import {
  DeckSortButton,
  InventoryAddDeckRow,
  Modal,
  Checkbox,
  Input,
} from '@/components';
import { decksSort } from '@/utils';
import { useApp, deckStore } from '@/context';

const InventoryAddDeckModal = ({ handleClose }) => {
  const { isDesktop, isMobile } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [sortMethod, setSortMethod] = useState('byName');
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([]);

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const allTags = new Set();
  Object.keys(decks).map((deckid) => {
    if (decks[deckid].tags) {
      decks[deckid].tags.map((tag) => {
        allTags.add(tag);
      });
    }
  });

  const defaultTagsOptions = [...allTags].map((tag) => ({
    label: tag,
    value: tag,
  }));

  const sortedDecks = useMemo(() => {
    if (Object.values(decks).length > 0) {
      let filtered = Object.values(decks);

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (tagsFilter) {
        filtered = filtered.filter((deck) => {
          let counter = 0;
          tagsFilter.map((tag) => {
            if (deck.tags && deck.tags.includes(tag)) counter += 1;
          });
          if (counter >= tagsFilter.length) return true;
        });
      }

      if (!revFilter) {
        filtered = filtered.filter((deck) => {
          if (!deck.master) return true;
        });
      }

      return decksSort(filtered, sortMethod);
    } else {
      return [];
    }
  }, [decks, nameFilter, tagsFilter, revFilter, sortMethod]);

  return (
    <Modal handleClose={handleClose} size="xl" title="Import Deck to Inventory">
      <table className="border-y border-bgSecondary dark:border-bgSecondaryDark sm:border-x">
        <thead>
          <tr>
            {!isMobile && <th className="min-w-[45px]"></th>}
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
            {!isMobile && <th className="min-w-[100px]"></th>}
            {!isMobile && (
              <th className="w-full">
                <SelectCreatable
                  isMulti
                  options={defaultTagsOptions}
                  onChange={handleChangeTagsFilter}
                  defaultValue={tagsFilter}
                  placeholder="Filter by Tags"
                />
              </th>
            )}
            <th className="min-w-[105px]">
              <div className="flex justify-end space-x-1">
                <Checkbox
                  id="revFilter"
                  label={isMobile ? 'Rev' : 'Show Revisions'}
                  checked={revFilter}
                  onChange={() => setRevFilter(!revFilter)}
                />
                <DeckSortButton onChange={setSortMethod} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedDecks.map((deck, idx) => {
            return (
              <InventoryAddDeckRow
                key={deck.deckid}
                deck={deck}
                defaultTagsOptions={defaultTagsOptions}
                idx={idx}
              />
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
};

export default InventoryAddDeckModal;
