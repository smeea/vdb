import React from 'react';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <div className="flex flex-row pb-2 pb-md-4 m-0">
          <div className="flex justify-center" />
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
          <div className="flex justify-center" />
        </div>
        <div className="flex flex-row py-2 pt-md-4 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </div>
        </div>
        <div className="flex flex-row pt-2 pt-md-4 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <div className="flex flex-row pb-1 pb-md-3 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex flex-row py-1 py-md-3 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </div>
        <div className="flex flex-row pt-1 pt-md-3 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <div className="flex flex-row pb-2 pb-md-4 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="flex flex-row pt-2 pt-md-4 m-0">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  }
};

export default SeatingTableLayout;
