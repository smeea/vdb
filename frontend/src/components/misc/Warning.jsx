import React from 'react';
import Exclamation from '@/assets/images/icons/exclamation-triangle.svg';

const Warning = ({ value }) => {
  return (
    <div className="dark:text-fgRedDarkark:text-fgRedDark whitespace-nowrap inline items-center text-fgRed">
      <Exclamation
        width="17"
        heigth="17"
        viewBox="0 2 16 16"
        className="inline pr-1"
      />
      {value}
    </div>
  );
};

export default Warning;
