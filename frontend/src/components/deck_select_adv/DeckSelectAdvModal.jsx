import { Menu } from '@headlessui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import Download from '@icons/download.svg?react';
import TrashFill from '@icons/trash-fill.svg?react';
import {
  ButtonIconed,
  DeckSelectAdvTable,
  DeckSelectAdvTotal,
  FlexGapped,
  MenuButton,
  MenuItem,
  MenuItems,
  Modal,
  ModalConfirmation,
} from '@/components';
import { DECKID, DECKS, JOL, LACKEY, NAME, TEXT, XLSX } from '@/constants';
import { deckStore, useApp } from '@/context';
import { useDecksTagsAll } from '@/hooks';
import { deckServices } from '@/services';

const DeckSelectAdvModal = ({ onClick, setShow, short }) => {
  const { isMobile, setShowMenuButtons, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [sortMethod, setSortMethod] = useState(NAME);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState({});
  const [tagsFilter, setTagsFilter] = useState([]);
  const { [DECKID]: activeDeckid } = useParams();
  const navigate = useNavigate();
  const allTagsOptions = useDecksTagsAll(decks);

  const handleClose = () => {
    setShow(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const exportSelected = (format) => {
    const target = {};
    Object.keys(selectedDecks)
      .filter((deckid) => !!selectedDecks[deckid])
      .forEach((deckid) => {
        target[deckid] = decks[deckid];
      });

    deckServices.exportDecks(target, format);
  };

  const deleteSelected = () => {
    Object.keys(selectedDecks)
      .filter((deckid) => !!selectedDecks[deckid])
      .forEach((deckid) => {
        const deck = decks[deckid];
        deckServices.deckDelete(deck).then(() => {
          if (deckid == activeDeckid) navigate('/decks');
        });
      });

    setShowDeleteConfirmation(false);
  };

  return (
    <Modal
      noPadding={isMobile}
      handleClose={handleClose}
      size={short ? 'sm' : 'xl'}
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
          <div className="flex justify-end gap-2">
            <ButtonIconed
              variant="danger"
              text="Delete Selected"
              title="Delete Deck"
              onClick={() =>
                Object.keys(selectedDecks).filter((deckid) => !!selectedDecks[deckid]).length > 0 &&
                setShowDeleteConfirmation(true)
              }
              icon={<TrashFill width="18" height="18" viewBox="0 0 18 16" />}
            />
            <Menu>
              <MenuButton title="Export Selected" icon={<Download />} text="Export Selected" />
              <MenuItems>
                <MenuItem onClick={() => exportSelected(TEXT)}>Text</MenuItem>
                <MenuItem onClick={() => exportSelected(LACKEY)}>Lackey</MenuItem>
                <MenuItem onClick={() => exportSelected(JOL)}>JOL</MenuItem>
                <MenuItem onClick={() => exportSelected(XLSX)}>Excel</MenuItem>
              </MenuItems>
            </Menu>
          </div>
        )}
      </FlexGapped>
      {showDeleteConfirmation && (
        <ModalConfirmation
          handleConfirm={deleteSelected}
          handleCancel={() => setShowDeleteConfirmation(false)}
          title="Delete selected decks and their revisions?"
          buttonText="Delete"
          buttonVariant="danger"
          withWrittenConfirmation
        >
          <div className="flex flex-col gap-1.5">
            {Object.keys(selectedDecks)
              .filter((deckid) => !!selectedDecks[deckid])
              .map((deckid) => {
                return (
                  <div key={deckid} className="text-fgName dark:text-fgNameDark">
                    {decks[deckid][NAME]}
                  </div>
                );
              })}
          </div>
        </ModalConfirmation>
      )}
    </Modal>
  );
};

export default DeckSelectAdvModal;
