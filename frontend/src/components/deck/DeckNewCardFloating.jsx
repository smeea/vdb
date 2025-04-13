import { ButtonFloat, DeckNewCard } from "@/components";
import { CRYPT } from "@/constants";
import { useState } from "react";

const DeckNewCardFloating = ({ deckid, cards, cardChange, target, className }) => {
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
        position={target === CRYPT ? "top" : "middle"}
      >
        <div className="flex items-center text-2xl">
          <div>+</div>
          <div>{target === CRYPT ? "C" : "L"}</div>
        </div>
      </ButtonFloat>
      {showAdd && (
        <div className="fixed bottom-[40px] z-20 flex w-full bg-bgPrimary p-2 dark:bg-bgPrimaryDark">
          <div className="w-full" onBlur={handleClose}>
            <DeckNewCard
              handleClose={handleClose}
              cards={cards}
              deckid={deckid}
              target={target}
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
