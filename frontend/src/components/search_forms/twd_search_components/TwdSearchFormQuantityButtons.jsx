import React from 'react';
import { Button } from 'components';

const TwdSearchFormQuantityButtons = ({ value, form, id }) => {
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
        className="quantity min-w-[40px]"
        variant="primary"
        onClick={handleToggleMoreLess}
        title={getIconAndText(value[id].m)[1]}
      >
        {getIconAndText(value[id].m)[0]}
      </Button>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(value[id].q - 1)}
      >
        -
      </Button>
      <div>{value[id].q}</div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(value[id].q + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
