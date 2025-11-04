import { useState } from "react";
import { useSnapshot } from "valtio";
import { InventoryAddDeckHeader, InventoryAddDeckRow, Modal } from "@/components";
import { DECKID, DECKS, MASTER, NAME, TAGS } from "@/constants";
import { deckStore, useApp } from "@/context";
import { decksSort } from "@/utils";

const InventoryAddDeckModal = ({ handleClose }) => {
  const { isMobile } = useApp();
  const decks = useSnapshot(deckStore)[DECKS];
  const [sortMethod, setSortMethod] = useState(NAME);
  const [revFilter, setRevFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeTagsFilter = (event) => {
    const tags = event.map((t) => t.value);
    setTagsFilter(tags);
  };

  const allTags = new Set();
  Object.keys(decks ?? {}).forEach((deckid) => {
    if (decks[deckid][TAGS]) {
      decks[deckid][TAGS].forEach((tag) => {
        allTags.add(tag);
      });
    }
  });

  const defaultTagsOptions = [...allTags].map((tag) => ({
    label: tag,
    value: tag,
  }));

  let filtered = Object.values(decks);

  if (nameFilter) {
    filtered = filtered.filter((deck) => {
      return deck[NAME].toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0;
    });
  }

  if (tagsFilter) {
    filtered = filtered.filter((deck) => {
      let counter = 0;
      tagsFilter.forEach((tag) => {
        if (deck[TAGS].includes(tag)) counter += 1;
      });
      return counter >= tagsFilter.length;
    });
  }

  if (!revFilter) {
    filtered = filtered.filter((deck) => {
      return !deck[MASTER];
    });
  }

  const sortedDecks = decksSort(filtered, sortMethod);

  return (
    <Modal
      noPadding={isMobile}
      handleClose={handleClose}
      size="lg"
      title="Import Deck to Inventory"
    >
      <table>
        <InventoryAddDeckHeader
          handleChangeNameFilter={handleChangeNameFilter}
          handleChangeTagsFilter={handleChangeTagsFilter}
          setRevFilter={setRevFilter}
          setSortMethod={setSortMethod}
          nameFilter={nameFilter}
          revFilter={revFilter}
          tagsFilter={tagsFilter}
          defaultTagsOptions={defaultTagsOptions}
          sortMethod={sortMethod}
        />
        <tbody className="border-bgSecondary sm:border-x dark:border-bgSecondaryDark">
          {sortedDecks.map((deck) => {
            return (
              <InventoryAddDeckRow
                key={deck[DECKID]}
                deck={deck}
                allTagsOptions={defaultTagsOptions}
              />
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
};

export default InventoryAddDeckModal;
