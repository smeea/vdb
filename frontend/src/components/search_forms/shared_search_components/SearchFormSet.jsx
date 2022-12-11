import React from 'react';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Checkbox,
} from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const SearchFormSet = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtest, isMobile, isXWide } = useApp();
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
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((i) => {
      const year = setsAndPrecons[i].date.slice(2, 4);
      const name = setsAndPrecons[i].name;

      options.push({
        value: i,
        name: name,
        label: (
          <div className="flex items-center justify-between">
            <div>{name}</div>
            {year && <div className="text-xs">{`'${year}`}</div>}
          </div>
        ),
      });
    });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
    }
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="flex basis-1/4 items-center justify-between">
          <div className="text-blue font-bold">Set:</div>
          {value.value[0] !== 'any' && (
            <div className="flex justify-end">
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
        <div className="inline basis-9/12">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            menuPlacement="top"
            filterOption={filterOption}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={onChange}
          />
        </div>
      </div>
      <SearchAdditionalForms
        value={value}
        name={name}
        searchForm={searchForm}
        menuPlacement={isMobile ? 'top' : 'bottom'}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
      <div className="flex flex-row items-center justify-end space-x-4">
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
              name="set"
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
      <div className="flex flex-row items-center justify-end space-x-4">
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
    </>
  );
};

export default SearchFormSet;
