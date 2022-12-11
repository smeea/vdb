import React from 'react';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <div className="flex flex-row ">
          <div className="flex justify-center" />
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
          <div className="flex justify-center" />
        </div>
        <div className="flex flex-row">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <div className="flex flex-row ">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <div className="flex flex-row ">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  }
};

export default SeatingTableLayout;
