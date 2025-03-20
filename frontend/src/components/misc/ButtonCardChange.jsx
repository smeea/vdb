import { twMerge } from 'tailwind-merge';
import Dash from '@icons/dash.svg?react';
import PlusLg from '@icons/plus-lg.svg?react';
import { Button } from '@/components';

const ButtonCardChange = ({ onClick, isLink, isNegative }) => {
  return (
    <Button
      className={twMerge('h-[27px] min-w-[18px]', isLink && 'outline-none')}
      onClick={onClick}
      tabIndex={isLink ? 0 : -1}
      noPadding
    >
      {isNegative ? (
        <Dash width="15" height="15" viewBox="0 0 16 16" />
      ) : (
        <PlusLg width="13" height="13" viewBox="0 0 16 16" />
      )}
    </Button>
  );
};

export default ButtonCardChange;
