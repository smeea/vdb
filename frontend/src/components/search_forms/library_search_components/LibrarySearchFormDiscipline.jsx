import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { ResultDisciplineImage } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonLogicToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from '../shared_search_components';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';
import { useApp } from 'context';

const LibrarySearchFormDiscipline = ({ value, onChange, setFormState }) => {
  const { isXWide, isMobile } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const disciplinesExtendedList = [
    ...disciplinesList,
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  const disciplines = [
    'ANY',
    'Not Required',
    ...disciplinesExtendedList,
    ...virtuesList,
  ];

  const options = [];

  disciplines.map((i) => {
    if (i == 'ANY' || i == 'Not Required') {
      options.push({
        value: i.toLowerCase(),
        name: 'discipline',
        label: (
          <>
            <span className="margin-full" />
            {i}
          </>
        ),
      });
    } else {
      options.push({
        value: i.toLowerCase(),
        name: 'discipline',
        label: (
          <>
            <span className="margin-full">
              <ResultDisciplineImage
                className="type-discipline-image-forms"
                value={i}
              />
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
        <Col xs={3} className="px-0">
          <div className="bold blue">Discipline:</div>
          {value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
                <SearchFormButtonLogicToggle
                  value={value}
                  setFormState={setFormState}
                  withAnd
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
            isSearchable={!isMobile}
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

export default LibrarySearchFormDiscipline;
