import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonGroupToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import { cardtypeSorted } from 'utils/constants';
import { useApp } from 'context';

const LibrarySearchFormType = ({ value, onChange, setFormState }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const typesSorted = ['ANY', ...cardtypeSorted];
  const options = [];

  typesSorted.map((i) => {
    if (i == 'ANY') {
      options.push({
        value: i.toLowerCase(),
        name: 'type',
        label: (
          <>
            <span className="margin-full" />
            {i}
          </>
        ),
      });
    } else {
      const imgSrc = `${process.env.ROOT_URL}images/types/${i
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;
      options.push({
        value: i.toLowerCase(),
        name: 'type',
        label: (
          <>
            <span className="margin-full">
              <img src={imgSrc} className="type-discipline-image-forms" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Type:</div>
          {value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
                <SearchFormButtonGroupToggle
                  value={value}
                  setFormState={setFormState}
                  withAnd={true}
                />
              </div>
              {value.value.length == 1 ? (
                <SearchFormButtonAdd
                  setFormState={setFormState}
                  value={value}
                />
              ) : (
                <SearchFormButtonDel
                  setFormState={setFormState}
                  value={value}
                  i={0}
                />
              )}
            </div>
          )}
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={false}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find(
              (obj) => obj.value === value.value[0].toLowerCase()
            )}
            onChange={onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={value}
        options={options}
        onChange={onChange}
        setFormState={setFormState}
        maxMenuHeight={maxMenuHeight}
      />
    </>
  );
};

export default LibrarySearchFormType;
