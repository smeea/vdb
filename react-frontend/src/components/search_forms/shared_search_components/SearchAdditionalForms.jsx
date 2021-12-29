import React from 'react';
import { Row, Col, Stack } from 'react-bootstrap';
import Select from 'react-select';
import { SearchFormButtonAdd, SearchFormButtonDel } from 'components';
import { useApp } from 'context';

const SearchAdditionalForms = (props) => {
  const { isMobile } = useApp();

  const forms = [];

  for (let i = 1; i < props.value.value.length; i++) {
    forms.push(
      <Row key={i} className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex justify-content-end px-0 pe-1">
          <Stack direction="horizontal" gap={1}>
            {i == props.value.value.length - 1 && (
              <SearchFormButtonAdd
                setFormState={props.setFormState}
                value={props.value}
              />
            )}
            <SearchFormButtonDel
              setFormState={props.setFormState}
              value={props.value}
              i={i}
            />
          </Stack>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={props.options}
            isSearchable={!isMobile}
            defaultMenuIsOpen={props.value.value[i] === 'any'}
            menuPlacement={props.menuPlacement ? props.menuPlacement : 'bottom'}
            name={i}
            value={props.options.find(
              (obj) => obj.value === props.value.value[i]
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalForms;
