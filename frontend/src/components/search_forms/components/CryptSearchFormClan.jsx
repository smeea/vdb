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
import { ANY, CLAN, LOGIC } from "@/constants";
import { useApp } from "@/context";

const CryptSearchFormClan = ({ value, searchForm, onChange }) => {
  const { isMobile } = useApp();
  const name = CLAN;
  const options = ["ANY", ...paths, ...vampireClansList, ...imbuedClansList].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex min-w-[40px] justify-center">
          {i.toLowerCase() !== ANY &&
           (paths.includes(i) ? (
             <ResultPathImage value={i} />
           ) : (
             <ResultClanImage value={i} />
           ))}
        </div>
        {paths.includes(i) ? `Path of ${i.split(" ")[0]}` : i}
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
