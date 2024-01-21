import React from 'react';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg?react';

const Warning = ({ value, icon }) => {
  return (
    <div className="flex items-center gap-0.5 dark:text-fgedDark whitespace-nowrap text-fgRed">
      {icon ? (
        icon
      ) : (
        <Exclamation
          width="14"
          heigth="14"
          viewBox="0 0 16 16"
          className="inline"
        />
      )}
      <div className="flex items-center">{value}</div>
    </div>
  );
};

export default Warning;
