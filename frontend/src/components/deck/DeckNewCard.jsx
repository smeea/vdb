import { CardSelect } from "@/components";
import { CRYPT, ID } from "@/constants";
import { deckCardChange, useApp } from "@/context";

const DeckNewCard = ({ target, cards, deckid, handleClose, cardChange, menuPlacement }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const changeAction = cardChange ?? deckCardChange;

  const handleChange = (event) => {
    const cardid = event.value;
    const currentQ = cards.find((c) => c.c[ID] === cardid)?.q ?? 0;

    const card = cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];
    changeAction(deckid, card, currentQ + 1);
    handleClose();
  };

  return (
    <CardSelect
      autoFocus
      onChange={handleChange}
      placeholder={target ? `Add ${target === CRYPT ? "Crypt" : "Library"} Card` : "Add Card"}
      target={target}
      menuPlacement={menuPlacement}
      value={null}
    />
  );
};

export default DeckNewCard;
