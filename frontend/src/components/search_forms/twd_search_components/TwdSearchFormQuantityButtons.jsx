import React from 'react';
import { Button } from 'react-bootstrap';

const TwdSearchFormQuantityButtons = ({ state, setState, id, target }) => {
  const handleChangeQ = (q) => {
    setState((prevState) => {
      if (q >= 0) {
        prevState[target][id] = {
          ...prevState[target][id],
          q: q
        }
      } else {
        delete prevState[target][id];
      }
      return({...prevState})
    });
  };

  const handleToggleMoreLess = () => {
    const toggle = () => {
      switch (state[target][id].m) {
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

    setState((prevState) => ({
      ...prevState,
      [target]: {
        ...prevState[target],
        [id]: {
          ...prevState[target][id],
          m: toggle(),
        }
      },
    }));
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
          title={getIconAndText(state[target][id].m)[1]}
        >
          {getIconAndText(state[target][id].m)[0]}
        </Button>
      </div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(state[target][id].q - 1)}
      >
        -
      </Button>
      <div className="px-1">{state[target][id].q}</div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(state[target][id].q + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
