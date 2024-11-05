import React from 'react';
import {
  Select,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Checkbox,
} from '@/components';
import { useApp } from '@/context';
import {
  OR_NEWER,
  OR_OLDER,
  NOT_NEWER,
  NOT_OLDER,
  FIRST,
  REPRINT,
  PRINT,
  ONLY,
  ANY,
  PLAYTEST,
  POD,
  BCP,
  PROMO,
} from '@/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const SearchFormSet = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtestMode, isMobile, isXWide } = useApp();
  const menuHeight = isXWide ? 500 : 350;
  const name = 'set';

  const options = [
    {
      value: ANY,
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          ANY
        </div>
      ),
    },
    {
      value: BCP,
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          ANY BCP (incl. Promo)
        </div>
      ),
    },
  ];

  Object.keys(setsAndPrecons)
    .filter((set) => playtestMode || set !== PLAYTEST)
    .map((set) => {
      const year = set === PLAYTEST ? null : setsAndPrecons[set].date.slice(2, 4);
      const fullName = setsAndPrecons[set].name;

      options.push({
        value: set,
        name: name,
        label: (
          <div className="flex items-center justify-between">
            <div>{fullName}</div>
            {year && <div className="text-sm">{`'${year}`}</div>}
          </div>
        ),
      });
    });

  const filterOption = ({ label, value }, string) => {
    let name;
    let year;
    if ([ANY, BCP, PROMO, POD, PLAYTEST].includes(value)) {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
      year = label.props.children[1].props?.children;
    }

    if (name) return `${name} ${year}`.toLowerCase().includes(string);
    return true;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Set:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
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
            isSearchable={!isMobile}
            isClearable={value.value[0] !== ANY}
            filterOption={filterOption}
            name={0}
            menuHeight={menuHeight}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
      <SearchAdditionalForms
        isClearable
        value={value}
        name={name}
        searchForm={searchForm}
        options={options}
        onChange={onChange}
        menuHeight={menuHeight}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-end gap-4">
          {[
            {
              value: OR_NEWER,
              label: 'Or Newer',
              title: 'Printed in selected set or any newer (can be in older sets too)',
            },
            {
              value: OR_OLDER,
              label: 'Or Older',
              title: 'Printed in selected set or any older (can be in newer sets too)',
            },
            {
              value: NOT_NEWER,
              label: 'Not Newer',
              title: 'Not printed in newer set',
            },
            {
              value: NOT_OLDER,
              label: 'Not Older',
              title: 'Not printed in older set',
            },
          ].map((i) => {
            return (
              <Checkbox
                key={i.value}
                className="text-sm"
                name={name}
                value={i.value}
                label={i.label}
                title={i.title}
                disabled={
                  value.value.length > 1 ||
                  value.value[0] === BCP ||
                  value.value[0] === PROMO ||
                  value.value[0] === POD
                }
                checked={value['age'] === i.value}
                onChange={onChangeOptions}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end gap-4">
          {[
            {
              value: ONLY,
              label: 'Only In',
              title: 'Printed only in selected Set',
            },
            {
              value: FIRST,
              label: 'First Print',
              title: 'Printed first in selected Set',
            },
            {
              value: REPRINT,
              label: 'Reprint',
              title: 'Reprinted in selected Set',
            },
          ].map((i) => {
            return (
              <Checkbox
                key={i.value}
                className="text-sm"
                name={name}
                value={i.value}
                label={i.label}
                title={i.title}
                disabled={
                  (value.value[0] === BCP || value.value[0] === PROMO || value.value[0] === POD) &&
                  i.value === REPRINT
                }
                checked={value[PRINT] === i.value}
                onChange={onChangeOptions}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchFormSet;
