import React from 'react';
import Select from 'react-select';
import {
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { useApp } from 'context';

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
}) => {
  const { isMobile } = useApp();

  const forms = [];

  for (let i = 1; i < value.value.length; i++) {
    forms.push(
      <div key={i} className="ps-1 mx-0 flex flex-row items-center py-1">
        <div className="pe-1 flex basis-1/4 justify-end px-0">
          <div className="flex flex-row space-x-1">
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
          <>
            <div className="inline basis-1/3 px-0">
              <Select
                classNamePrefix="react-select"
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
            <div className="pe-0 ps-1 inline basis-5/12">
              <Select
                classNamePrefix="react-select"
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
              />
            </div>
          </>
        ) : (
          <div className="inline basis-9/12 px-0">
            <Select
              classNamePrefix="react-select"
              options={options}
              isSearchable={!isMobile}
              defaultMenuIsOpen={value.value[i] === 'any'}
              menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
              maxMenuHeight={
                maxMenuHeight ? maxMenuHeight - 45 : isMobile ? 350 : 450
              }
              name={i}
              value={options.find((obj) => obj.value === value.value[i])}
              onChange={onChange}
            />
          </div>
        )}
      </div>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalForms;
