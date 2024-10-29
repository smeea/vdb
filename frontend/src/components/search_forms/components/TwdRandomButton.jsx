import React from 'react';
import Dice3 from '@/assets/images/icons/dice-3-fill.svg?react';
import { ButtonIconed } from '@/components';

const TwdRandomButton = ({ getRandom, noText }) => {
  return (
    <ButtonIconed
      onClick={() => getRandom(10)}
      title="Get 10 random TWD"
      icon={<Dice3 />}
      text={noText ? null : 'Random'}
    />
  );
};

export default TwdRandomButton;
