import Plus from "@icons/plus.svg?react";
import { useState } from "react";
import { ButtonFloat, DeckNewCard } from "@/components";
import { CRYPT } from "@/constants";

const DeckNewCardFloating = ({ deckid, cards, cardChange, className }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleClick = () => {
    setShowAdd(true);
  };

  const handleClose = () => {
    setShowAdd(false);
  };

  return (
    <>
      <ButtonFloat
        className={className}
        onClick={handleClick}
        position="middle"
      >
        <Plus width="47" height="47" viewBox="0 0 16 16" />
      </ButtonFloat>
      {showAdd && (
        <div className="fixed bottom-[40px] z-20 flex w-full bg-bgPrimary p-2 dark:bg-bgPrimaryDark">
          <div className="w-full" onBlur={handleClose}>
            <DeckNewCard
              handleClose={handleClose}
              cards={cards}
              deckid={deckid}
              cardChange={cardChange}
              menuPlacement="top"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DeckNewCardFloating;
