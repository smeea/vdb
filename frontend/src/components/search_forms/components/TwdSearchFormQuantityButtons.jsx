import React from 'react';
import { Button, ButtonCardChange } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormQuantityButtons = ({ value, form, id }) => {
  const { isMobile } = useApp();

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
        case 'gt':
          return 'lt';
        case 'lt':
          return 'lt0';
        case 'lt0':
          return 'eq';
        default:
          return 'gt';
      }
    };

    form[id].m = toggle();
  };

  const getIconAndText = (s) => {
    switch (s) {
      case 'gt':
        return ['≥', 'More than or equal'];
      case 'lt0':
        return ['0≤', 'Less than or equal, and can be 0'];
      case 'lt':
        return ['1≤', 'Less than or equal, but not less than 1'];
      default:
        return ['==', 'Equal'];
    }
  };

  return (
    <div className="flex items-center justify-between space-x-1">
      <Button
        className="h-[27px] w-[35px] text-sm"
        variant="primary"
        onClick={handleToggleMoreLess}
        title={getIconAndText(value[id].m)[1]}
        noPadding
      >
        {getIconAndText(value[id].m)[0]}
      </Button>
      <ButtonCardChange
        onClick={() => handleChangeQ(value[id].q - 1)}
        isLink={isMobile}
        isNegative
      />
      <div>{value[id].q}</div>
      <ButtonCardChange onClick={() => handleChangeQ(value[id].q + 1)} isLink={isMobile} />
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
