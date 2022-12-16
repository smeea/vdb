import React from 'react';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <div className="flex">
          <div className="flex w-1/4" />
          <div className="flex w-1/4 justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
          <div className="flex w-1/4 justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
          <div className="flex w-1/4" />
        </div>
        <div className="flex">
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/3" />
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <div className="flex">
          <div className="flex w-full justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex">
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <div className="flex">
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  }
};

export default SeatingTableLayout;
