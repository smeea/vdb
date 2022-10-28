import React from 'react';
import { Button } from 'react-bootstrap';

const TwdSearchFormQuantityButtons = ({ state, form, id }) => {
  const handleChangeQ = (q) => {
    if (q >= 0) {
      form[id].q = q;
    } else {
      delete form[id];
    }
  };

  const handleToggleMoreLess = () => {
    const toggle = () => {
      switch (state[id].m) {
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
    <div className="d-flex align-items-center justify-content-between pe-2">
      <div className="pe-1">
        <Button
          className="quantity-wide"
          variant="primary"
          onClick={handleToggleMoreLess}
          title={getIconAndText(state[id].m)[1]}
        >
          {getIconAndText(state[id].m)[0]}
        </Button>
      </div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(state[id].q - 1)}
      >
        -
      </Button>
      <div className="px-1">{state[id].q}</div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(state[id].q + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
