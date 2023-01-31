import React from 'react';
import { SeatingTablePlayer } from '@/components';

const Row = ({ children }) => {
  return (
    <div className="flex w-full shrink-0 items-center justify-center py-4">
      {children}
    </div>
  );
};

const Table = ({ children }) => {
  return (
    <div className="flex w-full flex-wrap rounded-full border-4 border-borderSecondary dark:border-borderSecondaryDark">
      {children}
    </div>
  );
};

const SeatingTableLayout = ({ players }) => {
  switch (players.length) {
    case 6:
      return (
        <Table>
          <Row>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[0]} />
            </div>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[1]} />
            </div>
          </Row>
          <Row>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[2]} />
            </div>
            <div className="flex w-1/3" />
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[3]} />
            </div>
          </Row>
          <Row>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[4]} isFirst />
            </div>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[5]} />
            </div>
          </Row>
        </Table>
      );
    case 5:
      return (
        <Table>
          <Row>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[0]} />
            </div>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[1]} />
            </div>
          </Row>
          <Row>
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[2]} />
            </div>
            <div className="flex w-1/3" />
            <div className="flex w-1/3 justify-center">
              <SeatingTablePlayer deck={players[3]} isFirst />
            </div>
          </Row>
          <Row>
            <SeatingTablePlayer deck={players[4]} />
          </Row>
        </Table>
      );
    case 4:
      return (
        <Table>
          <Row>
            <SeatingTablePlayer deck={players[0]} />
          </Row>
          <Row>
            <div className="flex w-1/2 justify-center">
              <SeatingTablePlayer deck={players[1]} />
            </div>
            <div className="flex w-1/2 justify-center">
              <SeatingTablePlayer deck={players[2]} />
            </div>
          </Row>
          <Row>
            <SeatingTablePlayer deck={players[3]} isFirst />
          </Row>
        </Table>
      );
    case 3:
      return (
        <Table>
          <Row>
            <div className="flex w-1/2 justify-center">
              <SeatingTablePlayer deck={players[0]} />
            </div>
            <div className="flex w-1/2 justify-center">
              <SeatingTablePlayer deck={players[1]} />
            </div>
          </Row>
          <Row>
            <SeatingTablePlayer deck={players[2]} isFirst />
          </Row>
        </Table>
      );
  }
};

export default SeatingTableLayout;
