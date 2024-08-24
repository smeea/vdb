import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useSnapshot } from 'valtio';
import Download from '@/assets/images/icons/download.svg?react';
import {
  FlexGapped,
  DeckSelectAdvTotal,
  DeckSelectAdvTable,
  Modal,
  MenuItems,
  MenuItem,
  MenuButton,
} from '@/components';
import { useApp, deckStore } from '@/context';
import { deckServices } from '@/services';
import { NAME } from '@/utils/constants';

const DeckSelectAdvModal = ({ onClick, setShow, allTagsOptions, short }) => {
  const { isMobile, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [sortMethod, setSortMethod] = useState(NAME);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState({});
  const [tagsFilter, setTagsFilter] = useState([]);

  const handleClose = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  const exportSelected = (format) => {
    const target = {};
    Object.keys(selectedDecks)
      .filter((deckid) => selectedDecks[deckid])
      .map((deckid) => {
        target[deckid] = decks[deckid];
      });

    deckServices.exportDecks(target, format);
  };

  return (
    <Modal
      noPadding={isMobile}
      handleClose={handleClose}
      size={short ? 'md' : 'xl'}
      title="Select Deck"
    >
      <FlexGapped className="flex-col">
        <div>
          {!short && (
            <DeckSelectAdvTotal
              tagsFilter={tagsFilter}
              setTagsFilter={setTagsFilter}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          )}
          <DeckSelectAdvTable
            allTagsOptions={allTagsOptions}
            short={short}
            decks={decks}
            sortMethod={sortMethod}
            tagsFilter={tagsFilter}
            setTagsFilter={setTagsFilter}
            selectedDecks={selectedDecks}
            setSelectedDecks={setSelectedDecks}
            isSelectedAll={isSelectedAll}
            setIsSelectedAll={setIsSelectedAll}
            onClick={onClick}
            handleClose={handleClose}
          />
        </div>
        {!(short || isMobile) && (
          <div className="flex justify-end max-sm:flex-col max-sm:p-2 max-sm:pt-0">
            <Menu as="div" className="relative">
              <MenuButton title="Export Selected" icon={<Download />} text="Export Selected" />
              <MenuItems>
                <MenuItem onClick={() => exportSelected('text')}>Text</MenuItem>
                <MenuItem onClick={() => exportSelected('lackey')}>Lackey</MenuItem>
                <MenuItem onClick={() => exportSelected('jol')}>JOL</MenuItem>
                <MenuItem onClick={() => exportSelected('xlsx')}>Excel</MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}
      </FlexGapped>
    </Modal>
  );
};

export default DeckSelectAdvModal;
