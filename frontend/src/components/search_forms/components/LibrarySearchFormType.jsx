import cardtypeSorted from '@/assets/data/cardtypeSorted.json';
import {
  ResultLibraryTypeImage,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  SearchFormButtonLogicToggle,
  Select,
} from '@/components';
import { ANY, LOGIC, TYPE } from '@/constants';

const LibrarySearchFormType = ({ value, onChange, searchForm }) => {
  const name = TYPE;
  const options = ['ANY', ...cardtypeSorted].map((i) => ({
    value: i.toLowerCase(),
    name: TYPE,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px] justify-center">
          {i.toLowerCase() !== ANY && <ResultLibraryTypeImage size="lg" value={i} />}
        </div>
        {i}
      </div>
    ),
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Type:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value[LOGIC]}
                searchForm={searchForm}
                withAnd
              />
              {value.value.length == 1 ? (
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
            isSearchable={false}
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

export default LibrarySearchFormType;
