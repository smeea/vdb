import { ButtonIconed } from "@/components";
import LightningFill from "@icons/lightning-fill.svg?react";

const TwdNewDecks = ({ getNew, noText }) => {
  return (
    <ButtonIconed
      onClick={() => getNew(50)}
      title="Get 50 newest TWD"
      icon={<LightningFill />}
      text={noText ? null : "New"}
    />
  );
};

export default TwdNewDecks;
