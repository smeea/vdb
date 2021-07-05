import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import AdditionalForms from './SearchLibraryFormAdditionalForms.jsx';

function SearchLibraryFormSect(props) {
  const sects = [
    'ANY',
    'NONE',
    'Camarilla',
    'Sabbat',
    'Laibon',
    'Independent',
    'Anarch',
    'Imbued',
  ];

  const options = [];

  sects.map((i, index) => {
    options.push({
      value: i.toLowerCase(),
      name: 'sect',
      label: (
        <>
          <span className="margin-full" />
          {i}
        </>
      ),
    });
  });

  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.sect;
      v.push('any');
      return {
        ...prevState,
        sect: v,
      };
    });
  };

  const delForm = (i) => {
    props.setFormState((prevState) => {
      const v = prevState.sect;
      v.splice(i, 1);
      return {
        ...prevState,
        sect: v,
      };
    });
  };

  return (
    <>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex justify-content-between px-0">
          <label className="h6 mb-0">Sect:</label>
          {props.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pr-1">
              {props.value.length == 1 ? (
                <Button
                  className="add-form"
                  variant="outline-secondary"
                  onClick={() => addForm()}
                >
                  <Plus />
                </Button>
              ) : (
                <Button
                  className="add-form"
                  variant="outline-secondary"
                  onClick={() => delForm(0)}
                >
                  <Dash />
                </Button>
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
            value={options.find(
              (obj) => obj.value === props.value[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <AdditionalForms
        value={props.value}
        addForm={addForm}
        delForm={delForm}
        options={options}
        onChange={props.onChange}
      />
    </>
  );
}

export default SearchLibraryFormSect;
