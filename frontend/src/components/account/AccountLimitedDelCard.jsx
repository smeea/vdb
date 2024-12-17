import React from 'react';
import { Button } from '@/components';
import { limitedCardChange } from '@/context';
import { ALLOWED, ID } from '@/constants';

const AccountLimitedDelCard = ({ cardid, target }) => {
  const card = { [ID]: cardid };
  const allowedDel = () => limitedCardChange(card, true, false);
  const bannedDel = () => limitedCardChange(card, false, false);

  return (
    <Button
      className="h-[33px] w-[24px]"
      onClick={() => (target === ALLOWED ? allowedDel() : bannedDel())}
      title="Remove card"
      noPadding
    >
      -
    </Button>
  );
};

export default AccountLimitedDelCard;
