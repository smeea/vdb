import React from 'react';
import { SeatingTableLayout } from '@/components';

const SeatingTables = ({ seating }) => {
  return (
    <div className="space-y-12 px-4 pb-4">
      {seating.map(players => {
        return <SeatingTableLayout players={players} />
      })}
    </div>
  )
};

export default SeatingTables;
