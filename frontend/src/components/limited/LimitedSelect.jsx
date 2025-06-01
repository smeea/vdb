import { ButtonIconed, LimitedModal } from "@/components";
import {
  CUSTOM,
  TWO_P,
  V5,
} from "@/constants";
import { Select } from "@/components";
import { useApp } from "@/context";
import UiChecksGrid from "@icons/ui-checks-grid.svg?react";
import { setMany } from "idb-keyval";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const LimitedSelect = ({ value, setValue }) => {
  const [state, setState] = useState();

  const options = [
    { value: null, label: "Disabled (default)" },
    { value: TWO_P, label: "Two Players" },
    { value: V5, label: "V5" },
    { value: CUSTOM, label: "Custom" },
  ];
  const handleSelect = (e) => setValue(e.value);

  return (
    <Select
      options={options}
      placeholder="Select Limited"
      value={options.find((obj) => obj.value === value)}
      onChange={handleSelect}
    />
  );
};

export default LimitedSelect;
