import React from 'react';
import { SeatingTableLayout } from '@/components';

const SeatingTables = ({ seating }) => {
  return (
    <div className="flex flex-col gap-12 p-4">
      {seating.map((players, idx) => {
        return <SeatingTableLayout key={idx} players={players} />;
      })}
    </div>
  );
};

export default SeatingTables;
