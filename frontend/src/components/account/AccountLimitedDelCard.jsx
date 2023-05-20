import React from 'react';
import { Button } from '@/components';
import { limitedSetChange, limitedCardChange } from '@/context';

const AccountLimitedDelCard = ({ cardid, target }) => {
  const card = { Id: cardid };

  const allowedDel = () => {
    limitedCardChange(card, true, false);
  };

  const bannedDel = () => {
    limitedCardChange(card, false, false);
  };

  return (
    <Button
      className="h-[33px] w-[24px]"
      variant="third"
      onClick={() => (target === 'allowed' ? allowedDel() : bannedDel())}
      title="Remove card"
      noPadding
    >
      -
    </Button>
  );
};

export default AccountLimitedDelCard;
