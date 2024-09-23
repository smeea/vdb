import React from 'react';

const ListEntry = ({ icon, title, children }) => {
  return (
    <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center space-x-2 text-lg text-fgSecondary dark:text-fgSecondaryDark sm:basis-1/4">
        {icon && <div className="flex min-w-[23px] justify-center">{icon}</div>}
        <div className="flex whitespace-nowrap font-bold">{title}</div>
      </div>
      <div className="sm:basis-3/4">{children}</div>
    </div>
  );
};

export default ListEntry;
