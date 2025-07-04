import { Select } from "@/components";
import { ANY, BLOOD, EQ, GE, LE } from "@/constants";

const LibrarySearchFormBloodCost = ({ value, onChange }) => {
  const name = BLOOD;
  const options = ["ANY", "0", "1", "2", "3", "4"].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: <div className="flex justify-center">{i}</div>,
  }));

  const morelessOptions = [
    [LE, "<="],
    [EQ, "=="],
    [GE, ">="],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: <div className="flex justify-center">{i[1]}</div>,
  }));

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Blood Cost:</div>
      </div>
      <div className="flex w-3/4 gap-1">
        <div className="w-1/2">
          <Select
            options={morelessOptions}
            name={`${name}-moreless`}
            value={morelessOptions.find((obj) => obj.value === value.moreless)}
            onChange={onChange}
          />
        </div>
        <div className="w-1/2">
          <Select
            options={options}
            isClearable={value[name] !== ANY}
            name={name}
            value={options.find((obj) => obj.value === value[name])}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
    </div>
  );
};

export default LibrarySearchFormBloodCost;
