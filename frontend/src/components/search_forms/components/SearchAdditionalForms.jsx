import React from 'react';
import { Select, SearchFormButtonAdd, SearchFormButtonDel } from '@/components';
import { useApp } from '@/context';
import { CAPACITY, MORELESS, ANY } from '@/constants';

const SearchAdditionalForms = ({
  value,
  name,
  onChange,
  options,
  withMoreless,
  morelessOptions,
  menuPlacement,
  searchForm,
  isClearable = false,
}) => {
  const { isMobile } = useApp();
  const formIds = [...Array(value.value.length).keys()].slice(1);

  return (
    <>
      {formIds.map((i) => {
        return (
          <div key={i} className="flex items-center">
            <div className="flex w-1/4 justify-end">
              <div className="flex gap-1 px-1">
                {i == value.value.length - 1 && (
                  <SearchFormButtonAdd
                    name={name}
                    searchForm={searchForm}
                    withMoreless={withMoreless}
                  />
                )}
                <SearchFormButtonDel searchForm={searchForm} name={name} i={i} />
              </div>
            </div>
            {withMoreless ? (
              <div className="flex w-3/4 gap-1">
                <div className="w-1/2">
                  <Select
                    options={morelessOptions}
                    isSearchable={false}
                    menuPlacement={menuPlacement}
                    name={i}
                    value={morelessOptions.find((obj) => obj.value === value.value[i].moreless)}
                    onChange={onChange}
                  />
                </div>
                <div className="w-1/2">
                  <Select
                    options={options}
                    isSearchable={false}
                    defaultMenuIsOpen={
                      value.value[i][
                        Object.keys(value.value[i]).filter((k) => {
                          return k !== MORELESS;
                        })[0]
                      ] === ANY
                    }
                    menuPlacement={menuPlacement}
                    name={i}
                    value={options.find((obj) => obj.value === value.value[i][CAPACITY])}
                    onChange={onChange}
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <div className="w-3/4">
                <Select
                  options={options}
                  isSearchable={!isMobile}
                  isClearable={isClearable && value.value[i] !== ANY}
                  defaultMenuIsOpen={value.value[i] === ANY}
                  menuPlacement={menuPlacement}
                  name={i}
                  value={options.find((obj) => obj.value === value.value[i])}
                  onChange={(e, id) =>
                    e ? onChange(e, id) : onChange({ name: name, value: ANY }, id)
                  }
                  autoFocus
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SearchAdditionalForms;
