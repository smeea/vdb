import React from 'react';
import {
  Select,
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '@/components';
import {
  ANY,
  TITLED,
  NON_TITLED,
  PRIMOGEN,
  PRINCE,
  JUSTICAR,
  INNER_CIRCLE,
  BARON,
  BISHOP,
  ARCHBISHOP,
  PRISCUS,
  CARDINAL,
  REGENT,
  MAGAJI,
  TITLE,
  LOGIC,
} from '@/constants';

const LibrarySearchFormTitle = ({ value, onChange, searchForm }) => {
  const name = TITLE;

  const options = [
    ['ANY', ANY],
    ['Non-titled', NON_TITLED],
    ['Titled', TITLED],
    ['Primogen', PRIMOGEN],
    ['Prince', PRINCE],
    ['Justicar', JUSTICAR],
    ['Inner Circle', INNER_CIRCLE],
    ['Baron', BARON],
    ['Bishop', BISHOP],
    ['Archbishop', ARCHBISHOP],
    ['Priscus', PRISCUS],
    ['Cardinal', CARDINAL],
    ['Regent', REGENT],
    ['Magaji', MAGAJI],
  ].map((i) => ({
    value: i[1],
    name: name,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        {i[0]}
      </div>
    ),
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Title:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              <SearchFormButtonLogicToggle
                name={name}
                value={value[LOGIC]}
                searchForm={searchForm}
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
            value={options.find((obj) => obj.value === value.value[0])}
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

export default LibrarySearchFormTitle;
