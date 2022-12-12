import React from 'react';

const InventoryShowSelect = ({ category, setCategory }) => {
  return (
    <form>
      <input
        type="radio"
        id="all"
        label={
          <div className="text-blue">
            <b>Show All</b>
          </div>
        }
        checked={category == 'all'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <input
        type="radio"
        id="ok"
        label={
          <div className="text-blue">
            <b>Only Owned</b>
          </div>
        }
        checked={category == 'ok'}
        onChange={(e) => setCategory(e.target.id)}
      />
      <input
        type="radio"
        id="nok"
        label={
          <div className="text-blue">
            <b>Only Problems</b>
          </div>
        }
        checked={category == 'nok'}
        onChange={(e) => setCategory(e.target.id)}
      />
    </form>
  );
};

export default InventoryShowSelect;
