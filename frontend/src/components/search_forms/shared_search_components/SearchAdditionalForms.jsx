import React from 'react';
import { Col, Stack } from 'react-bootstrap';
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
      <div key={i} className="flex flex-row py-1 ps-1 mx-0 items-center">
        <div className="basis-1/4 flex justify-end px-0 pe-1">
          <Stack direction="horizontal" gap={1}>
            {i == value.value.length - 1 && (
              <SearchFormButtonAdd
                name={name}
                searchForm={searchForm}
                withMoreless={withMoreless}
              />
            )}
            <SearchFormButtonDel searchForm={searchForm} name={name} i={i} />
          </Stack>
        </div>
        {withMoreless ? (
          <>
            <div className="basis-1/3 d-inline px-0">
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
            <div className="xs={5} d-inline pe-0 ps-1">
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
          <div className="xs={9} d-inline px-0">
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
