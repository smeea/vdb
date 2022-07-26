import React from 'react';
import Dice3 from 'assets/images/icons/dice-3-fill.svg';
import { ButtonIconed } from 'components';

const TwdRandomButton = ({ getRandom }) => {
  return (
    <ButtonIconed
      variant="primary"
      onClick={() => getRandom(20)}
      title="Get 20 random TWD"
      icon={<Dice3 />}
      text="Random"
    />
  );
};

export default TwdRandomButton;
