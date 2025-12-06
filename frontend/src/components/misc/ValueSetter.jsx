import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonCardChange, ConditionalTooltip } from "@/components";
import { ERROR, WARNING } from "@/constants";
import { useApp } from "@/context";

const ValueSetter = ({
  value,
  isEditable = true,
  color,
  handleChange,
  isManual,
  newFocus,
  overlay,
  inDeck,
  withNote,
}) => {
  const { isMobile } = useApp();
  const [manual, setManual] = useState(isManual);
  const [state, setState] = useState(value ?? "");
  const [oldManualState, setOldManualState] = useState(null);

  useEffect(() => {
    if (state !== value) setState(value ?? "");
  }, [value]);

  const handleManualChange = (event) => {
    setState(event.target.value ?? "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newFocus) newFocus();
    const prevState = oldManualState !== null ? oldManualState : state;
    handleChange(state ? Number.parseInt(state) : 0, prevState);
    setOldManualState(null);
    setManual(false);
  };

  const handleQuantityChange = (diff) => {
    if (diff + state >= 0) setState(diff + state);
    handleChange(Number.parseInt(diff + state), state);
  };

  const handleQuantityMinus = () => handleQuantityChange(-1);
  const handleQuantityPlus = () => handleQuantityChange(1);

  const colorStyle =
    color === ERROR
      ? "bg-bgError dark:bg-bgErrorDark text-white dark:text-whiteDark"
      : color === WARNING
        ? "bg-bgWarning dark:bg-bgWarningDark"
        : "";

  const handleManualClick = () => {
    setManual(true);
    setOldManualState(state);
  };

  return (
    <>
      {isEditable ? (
        <div className="flex w-full items-center justify-between text-lg">
          {isMobile ? (
            <>
              <ButtonCardChange onClick={handleQuantityMinus} isLink isNegative />
              <div className={twMerge("mx-1 flex w-full justify-center", colorStyle)}>
                {withNote && <div className="min-w-[4px]" />}
                {state || <>&nbsp;&nbsp;</>}
                {withNote && <div className="max-w-[4px] text-xs">*</div>}
              </div>
              <ButtonCardChange onClick={handleQuantityPlus} isLink />
            </>
          ) : (
            <>
              {!manual && <ButtonCardChange onClick={handleQuantityMinus} isNegative />}
              <div
                tabIndex={0}
                className={twMerge(
                  !manual && "mx-1 flex w-full justify-center",
                  !manual && colorStyle,
                )}
                onFocus={handleManualClick}
              >
                <ConditionalTooltip
                  className="flex w-full items-center justify-center"
                  placement="bottom"
                  overlay={overlay}
                  disabled={!overlay}
                >
                  {manual ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        className="w-[63px] rounded-sm border-2 border-bgSecondary bg-bgPrimary text-center text-fgPrimary outline-bgCheckboxSelected focus:outline dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                        placeholder=""
                        type="number"
                        autoFocus={true}
                        value={state}
                        onClick={handleManualClick}
                        onBlur={handleSubmit}
                        onChange={handleManualChange}
                      />
                    </form>
                  ) : (
                    <>
                      {withNote && <div className="min-w-[4px]" />}
                      {inDeck && state === 0 ? <>&nbsp;&nbsp;</> : state}
                      {withNote && <div className="max-w-[4px] text-xs">*</div>}
                    </>
                  )}
                </ConditionalTooltip>
              </div>
              {!manual && <ButtonCardChange onClick={handleQuantityPlus} />}
            </>
          )}
        </div>
      ) : (
        <ConditionalTooltip placement="bottom" overlay={overlay} disabled={!overlay}>
          <div className={twMerge("m-1 flex items-center justify-center text-lg", colorStyle)}>
            {state || <>&nbsp;&nbsp;</>}
          </div>
        </ConditionalTooltip>
      )}
    </>
  );
};

export default ValueSetter;
