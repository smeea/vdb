import React from 'react';
import { Select } from '@/components';
import {
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { useApp } from '@/context';

const SearchAdditionalForms = ({
  value,
  name,
  onChange,
  options,
  withMoreless,
  morelessOptions,
  menuPlacement,
  searchForm,
  maxMenuHeight,
  isClearable = false,
}) => {
  const { isMobile } = useApp();

  const forms = [];

  for (let i = 1; i < value.value.length; i++) {
    forms.push(
      <div key={i} className="flex items-center">
        <div className="flex w-1/4 justify-end">
          <div className="flex space-x-1 px-1">
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
          <div className="flex w-3/4 space-x-1">
            <div className="w-1/2">
              <Select
                options={morelessOptions}
                isSearchable={false}
                menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
                name={i}
                value={morelessOptions.find(
                  (obj) => obj.value === value.value[i].moreless
                )}
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
                      return k !== 'moreless';
                    })[0]
                  ] === 'any'
                }
                maxMenuHeight={
                  maxMenuHeight ? maxMenuHeight - 45 : isMobile ? 350 : 450
                }
                menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
                name={i}
                value={options.find(
                  (obj) => obj.value === value.value[i].capacity
                )}
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
              isClearable={isClearable && value.value[i] !== 'any'}
              defaultMenuIsOpen={value.value[i] === 'any'}
              menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
              maxMenuHeight={
                maxMenuHeight ? maxMenuHeight - 45 : isMobile ? 350 : 450
              }
              name={i}
              value={options.find((obj) => obj.value === value.value[i])}
              onChange={(e, id) =>
                e ? onChange(e, id) : onChange({ name: name, value: 'any' }, id)
              }
              autoFocus
            />
          </div>
        )}
      </div>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalForms;
