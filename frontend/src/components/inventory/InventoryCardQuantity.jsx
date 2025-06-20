import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import { ButtonCardChange } from "@/components";
import { IS_FROZEN } from "@/constants";
import { inventoryCardChange, inventoryStore, useApp } from "@/context";

const InventoryCardQuantity = ({ card, softUsedMax, hardUsedTotal, compact, newFocus }) => {
  const { isMobile } = useApp();
  const [manual, setManual] = useState(compact);
  const [state, setState] = useState(card.q ?? "");
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN];

  useEffect(() => {
    if (state !== card.q) setState(card.q ?? "");
  }, [card.q]);

  const handleManualChange = (event) => {
    setState(event.target.value ?? "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (compact) newFocus();
    inventoryCardChange(card.c, state ? Number.parseInt(state) : 0);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) setState(diff + state);
    inventoryCardChange(card.c, Number.parseInt(diff + state));
  };

  return (
    <>
      {isEditable ? (
        <div className="flex w-full items-center justify-between text-lg">
          {isMobile ? (
            <>
              <ButtonCardChange onClick={() => handleQuantityChange(-1)} isLink isNegative />
              <div
                className={twMerge(
                  "mx-1 flex w-full justify-center",
                  state < softUsedMax + hardUsedTotal &&
                    "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark",
                )}
              >
                {card.t && <div className="min-w-[4px]" />}
                {state === 0 ? <>&nbsp;</> : state}
                {card.t && <div className="max-w-[4px] text-xs">*</div>}
              </div>
              <ButtonCardChange onClick={() => handleQuantityChange(1)} isLink />
            </>
          ) : (
            <>
              {!manual && <ButtonCardChange onClick={() => handleQuantityChange(-1)} isNegative />}
              <div
                tabIndex={0}
                className={
                  manual
                    ? ""
                    : `mx-1 flex w-full justify-center ${
                        state < softUsedMax + hardUsedTotal
                          ? "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark"
                          : ""
                      }`
                }
                onFocus={() => setManual(true)}
              >
                {manual ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                      placeholder=""
                      type="number"
                      autoFocus={true}
                      value={state}
                      onBlur={handleSubmit}
                      onChange={handleManualChange}
                    />
                  </form>
                ) : (
                  <>
                    {card.t && <div className="min-w-[4px]" />}
                    {state === 0 ? <>&nbsp;</> : state}
                    {card.t && <div className="max-w-[4px] text-xs">*</div>}
                  </>
                )}
              </div>
              {!manual && <ButtonCardChange onClick={() => handleQuantityChange(1)} />}
            </>
          )}
        </div>
      ) : (
        <div
          className={twMerge(
            "mx-1 flex w-full items-center justify-center py-1 text-lg",
            state < softUsedMax + hardUsedTotal &&
              "bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark",
          )}
        >
          {card.t && <div className="min-w-[4px]" />}
          {state === 0 ? <>&nbsp;</> : state}
          {card.t && <div className="max-w-[4px] text-xs">*</div>}
        </div>
      )}
    </>
  );
};

export default InventoryCardQuantity;
