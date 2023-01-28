import React from 'react';
import { SeatingTablePlayer } from '@/components';

const Row = ({ children }) => {
  return (
    <div className="flex shrink-0 w-full justify-center items-center py-6">
      {children}
    </div>
  )
}

const SeatingTableLayout = ({ players }) => {
  if (players.length === 5) {
    return (
      <div className="flex flex-wrap w-full">
        <Row>
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </Row>
        <Row>
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/3" />
          <div className="flex w-1/3 justify-center">
            <SeatingTablePlayer deck={players[4]} />
          </div>
        </Row>
        <Row>
            <SeatingTablePlayer deck={players[0]} />
        </Row>
      </div>
    );
  } else if (players.length === 4) {
    return (
      <div className="flex flex-wrap w-full">
        <Row>
            <SeatingTablePlayer deck={players[2]} />
        </Row>
        <Row>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[3]} />
          </div>
        </Row>
        <Row>
            <SeatingTablePlayer deck={players[0]} />
        </Row>
      </div>
    );
  } else if (players.length === 3) {
    return (
      <div className="flex flex-wrap w-full">
        <Row>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[1]} />
          </div>
          <div className="flex w-1/2 justify-center">
            <SeatingTablePlayer deck={players[2]} />
          </div>
        </Row>
        <Row>
            <SeatingTablePlayer deck={players[0]} />
        </Row>
      </div>
    );
  }
};

export default SeatingTableLayout;
