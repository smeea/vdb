import React from 'react';
import {
  ResultPreconClan,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Checkbox,
  Select,
} from '@/components';
import { useApp } from '@/context';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import {
  ANY,
  BCP,
  CLAN,
  DATE,
  FIRST,
  NAME,
  ONLY,
  PLAYTEST,
  PRECON,
  PRECONS,
  PRINT,
  REPRINT,
  TITLE,
} from '@/constants';

const SearchFormPrecon = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtestMode, isMobile, isXWide } = useApp();
  const menuHeight = isXWide ? 500 : 350;
  const name = PRECON;

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
          ANY BCP (excl. Promo)
        </div>
      ),
    },
  ];

  Object.keys(setsAndPrecons)
    .filter((set) => playtestMode || set !== PLAYTEST)
    .map((set) => {
      if (setsAndPrecons[set][PRECONS]) {
        const year = setsAndPrecons[set][DATE] ? setsAndPrecons[set][DATE].slice(2, 4) : null;

        Object.keys(setsAndPrecons[set][PRECONS]).map((precon) => {
          const fullName = setsAndPrecons[set][PRECONS][precon][NAME];
          const clans = setsAndPrecons[set][PRECONS][precon][CLAN].split('/');

          options.push({
            value: `${set}:${precon}`,
            name: PRECON,
            label: (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={
                      clans.length == 1 ? 'flex w-[40px] items-center justify-center' : 'inline'
                    }
                  >
                    {clans.map((clan) => (
                      <ResultPreconClan key={clan} clan={clan} />
                    ))}
                  </div>
                  {fullName}
                </div>
                <div className="whitespace-nowrap text-sm">
                  {set == PLAYTEST ? 'PLAYTEST' : set} {year && `'${year}`}
                </div>
              </div>
            ),
          });
        });
      }
    });

  const filterOption = ({ label, value }, string) => {
    const name = [ANY, BCP].includes(value)
      ? label.props.children[1]
      : label.props.children[0].props.children[1];

    const set = [ANY, BCP].includes(value) ? null : label.props.children[1].props.children;

    if (name) return `${name} ${set}`.toLowerCase().includes(string);
    return true;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Precon:</div>
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
              title={i[TITLE]}
              disabled={value.value[0] === BCP && i.value === REPRINT}
              checked={value[PRINT] === i.value}
              onChange={onChangeOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchFormPrecon;
