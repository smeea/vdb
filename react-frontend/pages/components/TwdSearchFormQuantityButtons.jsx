import React from 'react';
import { Button } from 'react-bootstrap';

function TwdSearchFormQuantityButtons({ state, setState, id, q, target }) {
  const handleChangeQ = (id, q) => {
    const newState = state;
    newState[id] = {
      ...state[id],
      q: q,
    };
    setState((prevState) => ({
      ...prevState,
      [target]: newState,
    }));
  };

  const handleToggleMoreLess = () => {
    const toggle = () => {
      switch (state[id].m) {
        case 'gt':
          return 'lt';
        case 'lt':
          return 'eq';
        default:
          return 'gt';
      }
    };

    const newState = state;
    newState[id] = {
      ...state[id],
      m: toggle(),
    };
    setState((prevState) => ({
      ...prevState,
      [target]: newState,
    }));
  };

  const getIcon = (s) => {
    switch (s) {
      case 'gt':
        return '≥';
      case 'lt':
        return '≤';
      default:
        return '=';
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between pe-2">
      <div className="pe-1">
        <Button
          className="quantity"
          variant="primary"
          onClick={handleToggleMoreLess}
        >
          {getIcon(state[id].m)}
        </Button>
      </div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(id, q - 1)}
      >
        -
      </Button>
      <div className="px-1">{q}</div>
      <Button
        className="quantity"
        variant="primary"
        onClick={() => handleChangeQ(id, q + 1)}
      >
        +
      </Button>
    </div>
  );
}

export default TwdSearchFormQuantityButtons;
