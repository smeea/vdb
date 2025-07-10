import { Flag, Select } from "@/components";
import { ANY, EN, ES, FR, PT } from "@/constants";

const PlaytestLanguageSelectShort = ({ value, onChange, withAny }) => {
  const languages = [EN, ES, FR, PT];
  const options = languages.map((i) => {
    return {
      value: i,
      label: (
        <div className="flex w-[25px] justify-end">
          <Flag value={i} />
        </div>
      ),
    };
  });

  if (withAny) {
    options.unshift({
      value: ANY,
      label: <div className="flex">ANY</div>,
    });
  }

  return (
    <Select
      options={options}
      placeholder={null}
      value={options.find((obj) => obj.value === value)}
      onChange={onChange}
    />
  );
};

export default PlaytestLanguageSelectShort;
