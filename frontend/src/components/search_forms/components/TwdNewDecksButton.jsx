import React from 'react';
import LightningFill from '@/assets/images/icons/lightning-fill.svg?react';
import { ButtonIconed } from '@/components';

const TwdNewDecks = ({ getNew, noText }) => {
  return (
    <ButtonIconed
      onClick={() => getNew(50)}
      title="Get 50 newest TWD"
      icon={<LightningFill />}
      text={noText ? null : 'New'}
    />
  );
};

export default TwdNewDecks;
