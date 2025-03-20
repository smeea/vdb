import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button, ButtonCardChange } from '@/components';
import { EQ, GT, LT, LT0 } from '@/constants';
import { useApp } from '@/context';

const TwdSearchFormQuantityButtons = ({ value, form, id }) => {
  const { isMobile } = useApp();
  const [manual, setManual] = useState(false);
  const [state, setState] = useState(value[id].q);

  useEffect(() => {
    if (state !== value[id].q) setState(value[id].q);
  }, [value[id].q]);

  const handleManualChange = (event) => {
    setState(Number.parseInt(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleChangeQ(state);
    setManual(false);
  };

  const handleChangeQ = (q) => {
    if (q >= 0) {
      form[id].q = q;
    } else {
      delete form[id];
    }
  };

  const handleToggleMoreLess = () => {
    const toggle = () => {
      switch (value[id].m) {
        case GT:
          return LT;
        case LT:
          return LT0;
        case LT0:
          return EQ;
        default:
          return GT;
      }
    };

    form[id].m = toggle();
  };

  const getIconAndText = (s) => {
    switch (s) {
      case GT:
        return ['≥', 'More than or equal'];
      case LT0:
        return ['0≤', 'Less than or equal, and can be 0'];
      case LT:
        return ['1≤', 'Less than or equal, but not less than 1'];
      default:
        return ['==', 'Equal'];
    }
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <Button
        className="h-[27px] w-[35px] text-sm"
        onClick={handleToggleMoreLess}
        title={getIconAndText(value[id].m)[1]}
        noPadding
      >
        {getIconAndText(value[id].m)[0]}
      </Button>
      {(!manual || isMobile) && (
        <ButtonCardChange
          onClick={() => handleChangeQ(value[id].q - 1)}
          isLink={isMobile}
          isNegative
        />
      )}
      <div
        tabIndex={0}
        className={twMerge(!manual && 'flex w-[20px] justify-center')}
        onFocus={() => setManual(true)}
      >
        {manual ? (
          <form onSubmit={handleSubmit}>
            <input
              className="border-bgSecondary bg-bgPrimary text-fgPrimary outline-bgCheckboxSelected dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark w-[63px] rounded-sm border-2 text-center focus:outline"
              placeholder=""
              type="number"
              value={state}
              onBlur={handleSubmit}
              onChange={handleManualChange}
              autoFocus
            />
          </form>
        ) : (
          <>{value[id].q}</>
        )}
      </div>
      {(!manual || isMobile) && (
        <ButtonCardChange isLink={isMobile} onClick={() => handleChangeQ(value[id].q + 1)} />
      )}
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
