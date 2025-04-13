import { ButtonIconed } from "@/components";
import Dice3 from "@icons/dice-3-fill.svg?react";

const TwdRandomButton = ({ getRandom, noText }) => {
  return (
    <ButtonIconed
      onClick={() => getRandom(10)}
      title="Get 10 random TWD"
      icon={<Dice3 />}
      text={noText ? null : "Random"}
    />
  );
};

export default TwdRandomButton;
