import imbuedClansList from "@/assets/data/imbuedClansList.json";
import paths from "@/assets/data/paths.json";
import vampireClansList from "@/assets/data/vampireClansList.json";
import {
  ResultClanImage,
  ResultPathImage,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  SearchFormButtonLogicToggle,
  Select,
} from "@/components";
import { ANY, NO_PATH, CLAN, LOGIC } from "@/constants";
import { useApp } from "@/context";

const CryptSearchFormClan = ({ value, searchForm, onChange }) => {
  const { isMobile } = useApp();
  const name = CLAN;
  const options = [
    ["ANY", ANY],
    ["No Path", NO_PATH],
    ...paths.map((i) => [i, i.toLowerCase()]),
    ...vampireClansList.map((i) => [i, i.toLowerCase()]),
    ...imbuedClansList.map((i) => [i, i.toLowerCase()]),
  ].map((i) => ({
    value: i[1],
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex min-w-[40px] justify-center">
          {![ANY, NO_PATH].includes(i[1]) &&
            (paths.includes(i[0]) ? <ResultPathImage value={i[0]} /> : <ResultClanImage value={i[0]} />)}
        </div>
        {paths.includes(i[0]) ? `Path of ${i[0].split(" ")[0]}` : i[0]}
      </div>
    ),
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Clan / Path:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value[LOGIC]}
                searchForm={searchForm}
                withAnd
              />
              {value.value.length === 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel searchForm={searchForm} i={0} name={name} />
              )}
            </div>
          )}
        </div>
        <div className="w-3/4">
          <Select
            options={options}
            isSearchable={!isMobile}
            isClearable={value.value[0] !== ANY}
            name={0}
            value={options.find((obj) => obj.value === value.value[0].toLowerCase())}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
      {value.value.length > 1 && (
        <SearchAdditionalForms
          isClearable
          value={value}
          name={name}
          searchForm={searchForm}
          options={options}
          onChange={onChange}
        />
      )}
    </>
  );
};

export default CryptSearchFormClan;
