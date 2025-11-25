import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { ButtonCardChange } from "@/components";
import { LOGIC, IS_FROZEN, VALUE, WISHLIST, SURPLUS_FIXED } from "@/constants";
import { inventoryStore, useApp, wishlistUpdate } from "@/context";

const WishlistSetValue = ({ cardid }) => {
  const { isMobile } = useApp();
  const wishlist = useSnapshot(inventoryStore)[WISHLIST];
  const value = wishlist?.[cardid]?.[VALUE] ?? 0;
  const logic = wishlist?.[cardid]?.[LOGIC] || null;
  const [manual, setManual] = useState();
  const [state, setState] = useState(value ?? "");
  const isEditable = !useSnapshot(inventoryStore)[IS_FROZEN];

  useEffect(() => {
    if (state !== value) setState(value ?? "");
  }, [value]);

  const handleManualChange = (event) => {
    if (state === 0 && !logic) wishlistUpdate(cardid, LOGIC, SURPLUS_FIXED)
    if (event.target.value >= 0) {
      setState(event.target.value ?? "");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    wishlistUpdate(cardid, VALUE, state ? Number.parseInt(state) : 0);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) {
      if (state === 0 && !logic) wishlistUpdate(cardid, LOGIC, SURPLUS_FIXED)
      setState(diff + state);
      wishlistUpdate(cardid, VALUE, Number.parseInt(diff + state));
    }
  };

  return (
    <>
      {isEditable ? (
        <div className="flex w-full items-center justify-between text-lg">
          {isMobile ? (
            <>
              <ButtonCardChange
                onClick={() => handleQuantityChange(-1)}
                isLink
                isNegative
                isDisabled
              />
              <div className="mx-1 flex w-full justify-center">{state}</div>
              <ButtonCardChange onClick={() => handleQuantityChange(1)} isLink />
            </>
          ) : (
            <>
              {!manual && <ButtonCardChange onClick={() => handleQuantityChange(-1)} isNegative />}
              <div
                tabIndex={0}
                className={manual ? "" : "mx-1 flex w-full justify-center"}
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
                  state
                )}
              </div>
              {!manual && <ButtonCardChange onClick={() => handleQuantityChange(1)} />}
            </>
          )}
        </div>
      ) : (
        <div className="mx-1 flex w-full items-center justify-center py-1 text-lg">{state}</div>
      )}
    </>
  );
};

export default WishlistSetValue;
