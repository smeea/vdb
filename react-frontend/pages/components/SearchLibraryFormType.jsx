import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import AdditionalForms from './SearchAdditionalForms.jsx';
import SearchFormButtonGroupToggle from './SearchFormButtonGroupToggle.jsx';
import SearchFormButtonAdd from './SearchFormButtonAdd.jsx';
import SearchFormButtonDel from './SearchFormButtonDel.jsx';
import AppContext from '../../context/AppContext.js';

function SearchLibraryFormType(props) {
  const { isMobile } = useContext(AppContext);

  const types = [
    'ANY',
    'Action',
    'Action Modifier',
    'Ally',
    'Combat',
    'Conviction',
    'Equipment',
    'Event',
    'Master',
    'Political Action',
    'Power',
    'Reaction',
    'Retainer',
  ];

  const options = [];

  types.map((i, index) => {
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
              <img src={imgSrc} className="type-image-results" />
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
          {props.value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              <div className="pe-1">
                <SearchFormButtonGroupToggle
                  value={props.value}
                  setFormState={props.setFormState}
                  withAnd={true}
                />
              </div>
              {props.value.value.length == 1 ? (
                <SearchFormButtonAdd
                  setFormState={props.setFormState}
                  value={props.value}
                />
              ) : (
                <SearchFormButtonDel
                  setFormState={props.setFormState}
                  value={props.value}
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
            maxMenuHeight={
              isMobile
                ? window.innerHeight > 600
                  ? window.innerHeight - 200
                  : 300
                : 550
            }
            value={options.find(
              (obj) => obj.value === props.value.value[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <AdditionalForms
        value={props.value}
        options={options}
        onChange={props.onChange}
        setFormState={props.setFormState}
      />
    </>
  );
}

export default SearchLibraryFormType;
