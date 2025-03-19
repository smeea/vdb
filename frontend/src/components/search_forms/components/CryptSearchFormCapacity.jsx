import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  SearchFormButtonLogicToggle,
  Select,
} from '@/components';
import { ANY, CAPACITY, EQ, GE, LE, LOGIC } from '@/constants';

const CryptSearchFormCapacity = ({ value, searchForm, onChange }) => {
  const name = CAPACITY;

  const options = ['ANY', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: <div className="flex justify-center">{i}</div>,
  }));

  const morelessOptions = [
    [LE, '<='],
    [EQ, '=='],
    [GE, '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: <div className="flex justify-center">{i[1]}</div>,
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/4">
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Capacity:</div>
          {value.value[0][name] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value[LOGIC]}
                searchForm={searchForm}
              />
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} withMoreless />
              ) : (
                <SearchFormButtonDel searchForm={searchForm} i={0} name={name} />
              )}
            </div>
          )}
        </div>
        <div className="flex w-3/4 gap-1">
          <div className="w-1/2">
            <Select
              options={morelessOptions}
              isSearchable={false}
              name={0}
              value={morelessOptions.find((obj) => obj.value === value.value[0].moreless)}
              onChange={onChange}
            />
          </div>
          <div className="w-1/2">
            <Select
              options={options}
              isSearchable={false}
              isClearable={value.value[0][name] !== ANY}
              name={0}
              value={options.find((obj) => obj.value === value.value[0][name])}
              onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
            />
          </div>
        </div>
      </div>
      {value.value.length > 1 && (
        <SearchAdditionalForms
          isClearable
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          searchForm={searchForm}
          withMoreless={true}
          morelessOptions={morelessOptions}
        />
      )}
    </>
  );
};

export default CryptSearchFormCapacity;
