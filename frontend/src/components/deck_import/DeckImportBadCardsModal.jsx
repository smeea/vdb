import { CardSelect, DeckCardQuantity, Modal } from "@/components";
import { ID } from "@/constants";
import { deckCardChange, inventoryCardChange, useApp } from "@/context";
import { useCallback } from "react";
import { useImmer } from "use-immer";

const DeckImportBadCardsModal = ({ deckid, badCards, setBadCards, inInventory }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();

  const [cards, setCards] = useImmer(
    badCards.map(() => ({
      c: null,
      q: null,
    })),
  );

  const handleCardChange = (deckid, card, q) => {
    if (card && q >= 0) {
      if (inInventory) {
        inventoryCardChange(card, q);
      } else {
        deckCardChange(deckid, card, q);
      }
      const idx = cards.findIndex((c) => c.c === card);
      setCards((draft) => {
        draft[idx].q = q;
      });
    }
  };

  const handleSetCard = (v, idx) => {
    const card = v.value > 200000 ? cryptCardBase[v.value] : libraryCardBase[v.value];

    setCards((draft) => {
      draft[idx] = { c: card, q: 0 };
    });
  };

  return (
    <Modal handleClose={() => setBadCards([])} title="Fix Bad Import" noPadding={isMobile}>
      {badCards.map((c, idx) => {
        return (
          <div key={idx} className="flex items-center gap-1 sm:gap-3">
            <div className="basis-1/3 sm:basis-2/5">{c}</div>
            <div className="min-w-[75px]">
              <DeckCardQuantity
                deckid={deckid}
                cardChange={handleCardChange}
                card={cards[idx]?.c}
                q={cards[idx]?.q}
                isEditable
              />
            </div>
            <div className="basis-2/3 sm:basis-3/5">
              <CardSelect
                autoFocus={!isMobile || !cards[idx]?.c?.[ID]}
                onChange={(card) => handleSetCard(card, idx)}
                value={cards[idx].c ? { value: cards[idx].c[ID] } : null}
              />
            </div>
          </div>
        );
      })}
    </Modal>
  );
};

export default DeckImportBadCardsModal;
