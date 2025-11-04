import { useState } from "react";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { InventoryAddPreconHeader, InventoryAddPreconRow, Modal } from "@/components";
import { DATE, DECKID, NAME, PLAYTEST, TWO_P } from "@/constants";
import { useApp } from "@/context";
import { decksSort } from "@/utils";

const InventoryAddPreconModal = ({ handleClose }) => {
  const { preconDecks, isMobile } = useApp();
  const [sortMethod, setSortMethod] = useState(DATE);
  const [nameFilter, setNameFilter] = useState("");
  const [setFilter, setSetFilter] = useState("");

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

    let filtered = Object.values(preconDecks).filter((i) => {
      return !(i[DECKID].includes(PLAYTEST) || i[DECKID].includes(TWO_P));
    });

    if (nameFilter) {
      filtered = filtered.filter((deck) => {
        return deck[NAME].toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0;
      });
    }

    if (setFilter) {
      filtered = filtered.filter((deck) => {
        const set = deck[DECKID].split(":")[0];
        return setsAndPrecons[set][NAME].toLowerCase().indexOf(setFilter.toLowerCase()) >= 0;
      });
    }

  const sortedDecks = decksSort(filtered, sortMethod);

  return (
    <Modal noPadding={isMobile} handleClose={handleClose} title="Import Precon to Inventory">
      <table>
        <InventoryAddPreconHeader
          handleChangeNameFilter={handleChangeNameFilter}
          setSortMethod={setSortMethod}
          nameFilter={nameFilter}
          sortMethod={sortMethod}
          setFilter={setFilter}
          handleChangeSetFilter={handleChangeSetFilter}
        />
        <tbody className="border-bgSecondary sm:border-x dark:border-bgSecondaryDark">
          {sortedDecks.map((deck) => {
            return <InventoryAddPreconRow key={deck[DECKID]} deck={deck} />;
          })}
        </tbody>
      </table>
    </Modal>
  );
};

export default InventoryAddPreconModal;
