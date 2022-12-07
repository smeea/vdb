import React from 'react';
import { SeatingTablePlayer } from 'components';

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <>
        <div className="pb-md-4 m-0 flex flex-row pb-2">
          <div className="flex justify-center" />
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
          <div className="flex justify-center" />
        </div>
        <div className="pt-md-4 m-0 flex flex-row py-2">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </div>
        </div>
        <div className="pt-md-4 m-0 flex flex-row pt-2">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 4) {
    return (
      <>
        <div className="pb-md-3 m-0 flex flex-row pb-1">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="py-md-3 m-0 flex flex-row py-1">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </div>
        <div className="pt-md-3 m-0 flex flex-row pt-1">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  } else if (players.length === 3) {
    return (
      <>
        <div className="pb-md-4 m-0 flex flex-row pb-2">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </div>
        <div className="pt-md-4 m-0 flex flex-row pt-2">
          <div className="flex justify-center">
            <SeatingTablePlayer deck={players[0]} />
          </div>
        </div>
      </>
    );
  }
};

export default SeatingTableLayout;
