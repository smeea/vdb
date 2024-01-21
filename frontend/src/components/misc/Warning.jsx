import React from 'react';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg?react';

const Warning = ({ value, title = '', icon }) => {
  return (
    <div
      className="flex items-center gap-0.5 dark:text-fgedDark whitespace-nowrap text-fgRed"
      title={value ?? title}
    >
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
      {value && <div className="flex items-center">{value}</div>}
    </div>
  );
};

export default Warning;
