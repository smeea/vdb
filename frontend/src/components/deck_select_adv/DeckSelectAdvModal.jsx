import { Menu } from "@headlessui/react";
import Download from "@icons/download.svg?react";
import LockFill from "@icons/lock-fill.svg?react";
import TrashFill from "@icons/trash-fill.svg?react";
import UnlockFill from "@icons/unlock-fill.svg?react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import paths from "@/assets/data/paths.json";
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
  ResultClanImage,
  ResultPathImage,
} from "@/components";
import { CRYPT, DECKID, IS_FROZEN, JOL, LACKEY, NAME, TEXT, XLSX } from "@/constants";
import { deckUpdate, useApp } from "@/context";
import { useDecksTagsAll } from "@/hooks";
import { deckServices } from "@/services";
import { getClan } from "@/utils";

const DeckSelectAdvModal = ({ decks, onClick, setShow, short }) => {
  const { isMobile, decksAdvSort, changeDecksAdvSort, setShowMenuButtons, setShowFloatingButtons } =
    useApp();
  const [isLocked, setIsLocked] = useState();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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
          setSelectedDecks({});
          if (deckid === activeDeckid) navigate("/decks");
        });
      });

    setShowDeleteConfirmation(false);
  };

  const lockSelected = () => {
    Object.keys(selectedDecks)
      .filter((deckid) => !!selectedDecks[deckid])
      .forEach((deckid) => {
        const deck = decks[deckid];
        deckUpdate(deck[DECKID], IS_FROZEN, !isLocked);
      });
    setIsLocked(!isLocked);
  };

  return (
    <Modal
      noPadding={isMobile}
      handleClose={handleClose}
      size={short ? "sm" : "xl"}
      title="Select Deck"
    >
      <FlexGapped className="flex-col">
        <div>
          {!short && (
            <DeckSelectAdvTotal
              decks={decks}
              tagsFilter={tagsFilter}
              setTagsFilter={setTagsFilter}
              sortMethod={decksAdvSort}
              setSortMethod={changeDecksAdvSort}
            />
          )}
          <DeckSelectAdvTable
            allTagsOptions={allTagsOptions}
            short={short}
            decks={decks}
            sortMethod={decksAdvSort}
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
        {!short && (
          <div className="flex justify-end gap-2 max-sm:hidden">
            <ButtonIconed
              text="Lock Selected"
              title="Lock Selected Decks"
              onClick={lockSelected}
              icon={
                isLocked ? (
                  <UnlockFill width="19" height="23" viewBox="0 0 16 16" />
                ) : (
                  <LockFill width="19" height="23" viewBox="0 0 16 16" />
                )
              }
            />
            <ButtonIconed
              variant="danger"
              text="Delete Selected"
              title="Delete Selected Decks"
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
          <div className="flex flex-col gap-3">
            {Object.keys(selectedDecks)
              .filter((deckid) => !!selectedDecks[deckid])
              .map((deckid) => {
                const deck = decks[deckid];
                const clan = getClan(deck[CRYPT]);

                return (
                  <div key={deckid} className="flex gap-1.5">
                    {clan ? (
                      <div className="flex w-[30px] items-center justify-center">
                        {paths.includes(clan) ? (
                          <ResultPathImage value={clan} />
                        ) : (
                          <ResultClanImage value={clan} />
                        )}
                      </div>
                    ) : (
                      <div className="w-[30px]" />
                    )}
                    {deck[NAME]}
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
