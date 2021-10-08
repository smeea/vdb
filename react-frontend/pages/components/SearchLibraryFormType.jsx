import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import AdditionalForms from './SearchAdditionalForms.jsx';

function SearchLibraryFormType(props) {
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
            <span className="margin-full justify-content-center">
              <img src={imgSrc} className="type-image-results" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.type.type;
      v.push('any');
      return {
        ...prevState,
        type: {
          ...prevState['type'],
          type: v,
        },
      };
    });
  };

  const delForm = (i) => {
    props.setFormState((prevState) => {
      const v = prevState.type.type;
      v.splice(i, 1);
      return {
        ...prevState,
        type: {
          ...prevState['type'],
          type: v,
        },
      };
    });
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Type:</div>
          {props.value.type[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              {props.value.type.length == 1 ? (
                <Button
                  className="add-form"
                  variant="primary"
                  onClick={() => addForm()}
                >
                  <Plus />
                </Button>
              ) : (
                <Button
                  className="add-form"
                  variant="primary"
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
              (obj) => obj.value === props.value.type[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <AdditionalForms
        value={props.value.type}
        logicAnd={props.value.logicAnd}
        toggleLogic={props.toggleLogic}
        addForm={addForm}
        delForm={delForm}
        options={options}
        onChange={props.onChange}
        form={'type'}
      />
    </>
  );
}

export default SearchLibraryFormType;
