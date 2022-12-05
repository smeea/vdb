import React from 'react';

const InventoryShowSelect = ({category, setCategory}) => {
  return (
    <form className="my-0">
      <input
        className="px-2"
        type="radio"
        id="all"
        label={
          <div className="blue">
            <b>Show All</b>
          </div>
        }
        checked={category == 'all'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <input
        className="px-2"
        type="radio"
        id="ok"
        label={
          <div className="blue">
            <b>Only Owned</b>
          </div>
        }
        checked={category == 'ok'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <input
        className="px-2"
        type="radio"
        id="nok"
        label={
          <div className="blue">
            <b>Only Problems</b>
          </div>
        }
        checked={category == 'nok'}
        onChange={(e) => setCategory(e.target.id)}
      />
    </form>
  );
}

export default InventoryShowSelect;
