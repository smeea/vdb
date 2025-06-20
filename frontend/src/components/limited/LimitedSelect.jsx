import UiChecksGrid from "@icons/ui-checks-grid.svg?react";
import { setMany } from "idb-keyval";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ButtonIconed, LimitedModal, Select } from "@/components";
import { CUSTOM, TWO_P, V5 } from "@/constants";
import { useApp } from "@/context";

const LimitedSelect = ({ value, setValue }) => {
  const { limitedMode, toggleLimitedMode } = useApp();

  const handleSelect = (e) => setValue(e.value);
  const options = [
    { value: false, label: "Unlimited (default VTES)" },
    { value: TWO_P, label: "Two Players" },
    { value: V5, label: "V5" },
    { value: CUSTOM, label: "Custom" },
  ];

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
