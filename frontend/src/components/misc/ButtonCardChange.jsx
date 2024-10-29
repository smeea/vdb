import React from 'react';
import Dash from '@/assets/images/icons/dash.svg?react';
import PlusLg from '@/assets/images/icons/plus-lg.svg?react';
import { Button } from '@/components';

const ButtonCardChange = ({ onClick, isLink, isNegative }) => {
  return (
    <>
      {isLink ? (
        <a
          className="relative before:absolute before:inset-[-12px] before:content-[''] hover:no-underline"
          onClick={onClick}
        >
          <Button className="h-[27px] w-[18px]" noPadding>
            {isNegative ? (
              <Dash width="15" height="15" viewBox="0 0 16 16" />
            ) : (
              <PlusLg width="13" height="13" viewBox="0 0 16 16" />
            )}
          </Button>
        </a>
      ) : (
        <Button className="h-[27px] min-w-[18px]" onClick={onClick} tabIndex={-1} noPadding>
          {isNegative ? (
            <Dash width="15" height="15" viewBox="0 0 16 16" />
          ) : (
            <PlusLg width="13" height="13" viewBox="0 0 16 16" />
          )}
        </Button>
      )}
    </>
  );
};

export default ButtonCardChange;
