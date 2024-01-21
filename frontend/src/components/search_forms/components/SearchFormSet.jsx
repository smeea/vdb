import React from 'react';
import {
  Select,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Checkbox,
} from '@/components';
import { useApp } from '@/context';
import { PLAYTEST } from '@/utils/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const SearchFormSet = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtestMode, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'set';

  const options = [
    {
      value: 'any',
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          ANY
        </div>
      ),
    },
    {
      value: 'bcp',
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
      const year =
        set === PLAYTEST ? null : setsAndPrecons[set].date.slice(2, 4);
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
    if (['any', 'bcp', 'Promo', 'POD', PLAYTEST].includes(value)) {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
      year = label.props.children[1].props?.children;
    }

    if (name) {
      return `${name} ${year}`.toLowerCase().includes(string);
    }
    return true;
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Set:
          </div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end space-x-1 px-1">
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel
                  searchForm={searchForm}
                  i={0}
                  name={name}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-3/4">
          <Select
            options={options}
            isSearchable={!isMobile}
            isClearable={value.value[0] !== 'any'}
            menuPlacement="top"
            filterOption={filterOption}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={(e, id) =>
              e ? onChange(e, id) : onChange({ name: name, value: 'any' }, id)
            }
          />
        </div>
      </div>
      <SearchAdditionalForms
        isClearable
        value={value}
        name={name}
        searchForm={searchForm}
        menuPlacement={isMobile ? 'top' : 'bottom'}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-end space-x-4">
          {[
            {
              value: 'or-newer',
              label: 'Or Newer',
              title:
                'Printed in selected set or any newer (can be in older sets too)',
            },
            {
              value: 'or-older',
              label: 'Or Older',
              title:
                'Printed in selected set or any older (can be in newer sets too)',
            },
            {
              value: 'not-newer',
              label: 'Not Newer',
              title: 'Not printed in newer set',
            },
            {
              value: 'not-older',
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
                  value.value[0] === 'bcp' ||
                  value.value[0] === 'Promo' ||
                  value.value[0] === 'POD'
                }
                checked={value['age'] === i.value}
                onChange={onChangeOptions}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-end space-x-4">
          {[
            {
              value: 'only',
              label: 'Only In',
              title: 'Printed only in selected Set',
            },
            {
              value: 'first',
              label: 'First Print',
              title: 'Printed first in selected Set',
            },
            {
              value: 'reprint',
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
                  (value.value[0] === 'bcp' ||
                    value.value[0] === 'Promo' ||
                    value.value[0] === 'POD') &&
                  i.value === 'reprint'
                }
                checked={value['print'] === i.value}
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
