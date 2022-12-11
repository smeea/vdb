import React from 'react';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import { ResultLibraryClan } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Checkbox,
} from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const SearchFormPrecon = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtest, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'precon';

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
          ANY BCP (excl. Promo)
        </div>
      ),
    },
  ];

  Object.keys(setsAndPrecons)
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((set) => {
      if (setsAndPrecons[set].precons) {
        const year = setsAndPrecons[set].date.slice(2, 4);
        Object.keys(setsAndPrecons[set].precons).map((precon) => {
          const name = setsAndPrecons[set].precons[precon].name;
          const clans = setsAndPrecons[set].precons[precon].clan.split('/');

          if (set === 'any') {
            options.push({
              value: set,
              name: name,
              label: (
                <div className="flex items-center">
                  <div className="flex w-[40px]" />
                  {name}
                </div>
              ),
            });
          } else {
            const clanImages = clans.map((clan) => {
              return (
                <React.Fragment key={clan}>
                  {clan === 'Bundle' ? (
                    <div className="clan-image-results inline items-center justify-center">
                      <GiftFill />
                    </div>
                  ) : clan === 'Mix' ? null : (
                    <ResultLibraryClan value={clan} />
                  )}
                </React.Fragment>
              );
            });

            options.push({
              value: `${set}:${precon}`,
              name: 'precon',
              label: (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={
                        clanImages.length == 1
                          ? 'flex w-[40px] items-center justify-center'
                          : 'inline'
                      }
                    >
                      {clanImages}
                    </div>
                    {name}
                  </div>
                  <div className="text-xs">{`${set} '${year}`}</div>
                </div>
              ),
            });
          }
        });
      }
    });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children[1];
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
        <div className="basis-1/4">
          <div className="text-blue font-bold">Precon:</div>
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
              name="precon"
              value={i.value}
              label={i.label}
              title={i.title}
              disabled={value.value[0] === 'bcp' && i.value === 'reprint'}
              checked={value['print'] === i.value}
              onChange={onChangeOptions}
            />
          );
        })}
      </div>
    </>
  );
};

export default SearchFormPrecon;
