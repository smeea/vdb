import React from 'react';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import { ButtonIconed } from 'components';

const TwdNewDecks = ({ getNew, noText }) => {
  return (
    <ButtonIconed
      variant="primary"
      onClick={() => getNew(50)}
      title="Get 50 newest TWD"
      icon={<LightningFill />}
      text={noText ? null : 'New'}
    />
  );
};

export default TwdNewDecks;
