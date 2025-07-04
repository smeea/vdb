import { Select } from "@/components";
import { CUSTOM, TWO_P, V5 } from "@/constants";
import { useApp } from "@/context";

const LimitedSelect = ({ withoutDisabled }) => {
  const { limitedMode, limitedPreset, changeLimitedPreset } = useApp();

  const handleSelect = (e) => changeLimitedPreset(e.value);
  const options = [
    { value: TWO_P, label: withoutDisabled ? "2P" : "Two Players" },
    { value: V5, label: "V5" },
    { value: CUSTOM, label: withoutDisabled ? "C" : "Custom" },
  ];

  if (!withoutDisabled) options.unshift({ value: false, label: "Disabled (regular VTES)" });

  return (
    <Select
      className="min-w-[37px]"
      textStyle={!limitedMode && withoutDisabled && "text-lightGray dark:text-lightGrayDark"}
      noMinHeight={withoutDisabled}
      isSearchable={false}
      options={options}
      noBackground
      placeholder="Select Limited"
      value={options.find((obj) => obj.value === limitedPreset)}
      onChange={handleSelect}
      noDropdown={withoutDisabled}
    />
  );
};

export default LimitedSelect;
