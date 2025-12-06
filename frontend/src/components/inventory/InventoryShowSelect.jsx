import { RadioGroup } from "@headlessui/react";
import { Radio } from "@/components";
import { ALL, NOK, OK, SURPLUS } from "@/constants";

const InventoryShowSelect = ({ category, setCategory }) => {
  return (
    <RadioGroup
      value={category}
      onChange={setCategory}
      aria-label="Server size"
      className="flex flex-col gap-0.5"
    >
      {[
        [ALL, "Owned & Problems"],
        [OK, "Only Owned"],
        [NOK, "Only Problems"],
        [SURPLUS, "Only Surplus"],
      ].map((i) => (
        <Radio key={i[0]} value={i[0]} label={i[1]} />
      ))}
    </RadioGroup>
  );
};

export default InventoryShowSelect;
