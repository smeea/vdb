import React from 'react';
import {
  Checkbox,
  SearchFormButtonAddText,
  SearchFormButtonDel,
  SearchFormButtonLogicToggle,
  SearchAdditionalFormsTextForm,
} from '@/components';
import { NAME, TEXT, VALUE, LABEL, LOGIC, IN, REGEX } from '@/constants';

const SearchAdditionalFormsText = ({ value, onChange, onChangeOptions, searchForm }) => {
  const options = [
    {
      [VALUE]: NAME,
      [LABEL]: 'Only in Name',
    },
    {
      [VALUE]: TEXT,
      [LABEL]: 'Only in Text',
    },
    {
      [VALUE]: REGEX,
      [LABEL]: 'Regex',
    },
  ];

  const [, ...values] = value;

  return (
    <>
      {values.map((v, idx) => {
        const i = idx + 1;
        return (
          <div className="flex flex-col gap-1" key={i}>
            <SearchAdditionalFormsTextForm id={i} value={value[i]} onChange={onChange} />
            <div className="flex">
              <div className="flex w-1/5 gap-1">
                <SearchFormButtonLogicToggle
                  name={LOGIC}
                  value={v[LOGIC]}
                  i={i}
                  searchForm={searchForm}
                />
                <SearchFormButtonAddText searchForm={searchForm} />
                <SearchFormButtonDel searchForm={searchForm} i={i} />
              </div>
              <div className="flex items-center justify-end gap-4">
                {options.map((opt) => {
                  return (
                    <Checkbox
                      size="sm"
                      key={opt[VALUE]}
                      name={i}
                      value={opt[VALUE]}
                      onChange={onChangeOptions}
                      label={opt[LABEL]}
                      checked={
                        opt[VALUE] === REGEX
                          ? value[i][REGEX] || false
                          : value[i][IN] === opt[VALUE]
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SearchAdditionalFormsText;
