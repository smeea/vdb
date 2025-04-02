import { NewCardSelect } from "@/components";
import { CRYPT, ID } from "@/constants";
import { deckCardChange, useApp } from "@/context";

const DeckNewCard = ({ target, cards, deckid, handleClose, cardChange, menuPlacement }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const changeAction = cardChange ?? deckCardChange;

  const handleChange = (event) => {
    const cardid = event.value;
    let currentQ = 0;
    cards.forEach((card) => {
      if (card.c[ID] === cardid) currentQ = card.q;
    });

    const card = target === CRYPT ? cryptCardBase[cardid] : libraryCardBase[cardid];
    changeAction(deckid, card, currentQ + 1);
    handleClose();
  };

  return (
    <NewCardSelect
      onChange={handleChange}
      autoFocus
      target={target}
      menuPlacement={menuPlacement}
    />
  );
};

export default DeckNewCard;
