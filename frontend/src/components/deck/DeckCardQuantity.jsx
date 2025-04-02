import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonCardChange, ConditionalTooltip, UsedPopover } from "@/components";
import { ID } from "@/constants";
import { useApp } from "@/context";

const DeckCardQuantity = ({
  deckid,
  card,
  q,
  inventoryType,
  inInventory,
  softUsedMax,
  hardUsedTotal,
  isSelected,
  cardChange,
  inProxy,
  isEditable,
  inMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(q ? q : "");

  useEffect(() => {
    if (state !== q) setState(q ? q : "");
  }, [q]);

  const handleManualChange = (event) => {
    setState(event.target.value ? Number.parseInt(event.target.value) : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cardChange(deckid, card, state ? state : 0);
    setManual(false);
  };

  const handleClickPlus = useCallback(() => {
    cardChange(deckid, card, q + 1);
  }, [deckid, card, q]);

  const handleClickMinus = useCallback(() => {
    cardChange(deckid, card, q - 1);
  }, [deckid, card, q]);

  const handleClickManual = useCallback(() => {
    setManual(true);
  }, []);

  const getInventoryColor = () => {
    if (inventoryMode && !inMissing) {
      if (inventoryType) {
        if (inProxy) {
          return inInventory + (isSelected ? q : 0) < softUsedMax + hardUsedTotal
            ? "bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark"
            : "";
        }
        return inInventory >= softUsedMax + hardUsedTotal
          ? ""
          : inInventory < q
            ? "bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark"
            : "bg-bgWarning dark:bg-bgWarningDark";
      }
      return inInventory - softUsedMax - hardUsedTotal >= q
        ? ""
        : inInventory < q
          ? "bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark"
          : "bg-bgWarning dark:bg-bgWarningDark";
    }
    return "";
  };

  const inventoryColor = getInventoryColor();

  return (
    <>
      {isEditable ? (
        <div className="flex items-center justify-between text-lg">
          {isMobile ? (
            <>
              <ButtonCardChange onClick={handleClickMinus} isLink isNegative />
              <div className={twMerge("mx-1 flex w-full justify-center", inventoryColor)}>
                {q === 0 ? "" : q}
              </div>
              <ButtonCardChange onClick={handleClickPlus} isLink />
            </>
          ) : (
            <>
              {!manual && <ButtonCardChange onClick={handleClickMinus} isNegative />}
              <div
                tabIndex={0}
                className={twMerge(
                  !manual && "mx-1 flex w-full justify-center",
                  !manual && inventoryColor,
                )}
                onFocus={handleClickManual}
              >
                <ConditionalTooltip
                  placement="bottom"
                  overlay={<UsedPopover cardid={card[ID]} />}
                  disabled={!inventoryMode || isMobile}
                >
                  {manual ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        className="otline-1 w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                        placeholder=""
                        type="number"
                        value={state}
                        onBlur={handleSubmit}
                        onChange={handleManualChange}
                        autoFocus
                      />
                    </form>
                  ) : (
                    <>{q === 0 ? <>&nbsp;&nbsp;</> : q}</>
                  )}
                </ConditionalTooltip>
              </div>
              {!manual && <ButtonCardChange onClick={handleClickPlus} />}
            </>
          )}
        </div>
      ) : (
        <ConditionalTooltip
          placement="bottom"
          overlay={<UsedPopover cardid={card[ID]} />}
          disabled={!inventoryMode || isMobile}
        >
          <div className={twMerge("mx-1 flex items-center justify-center text-lg", inventoryColor)}>
            {q || null}
          </div>
        </ConditionalTooltip>
      )}
    </>
  );
};

export default DeckCardQuantity;
