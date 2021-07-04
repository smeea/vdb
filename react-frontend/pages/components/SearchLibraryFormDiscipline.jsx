import React, { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import Select from 'react-select';
import AppContext from '../../context/AppContext.js';

function SearchLibraryFormDiscipline(props) {
  const { isMobile } = useContext(AppContext);

  const disciplines = [
    'ANY',
    'NONE',
    'Abombwe',
    'Animalism',
    'Auspex',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dominate',
    'Dementation',
    'Flight',
    'Fortitude',
    'Maleficia',
    'Melpominee',
    'Mytherceria',
    'Necromancy',
    'Obeah',
    'Obfuscate',
    'Obtenebration',
    'Potence',
    'Presence',
    'Protean',
    'Quietus',
    'Sanguinus',
    'Serpentis',
    'Spiritus',
    'Striga',
    'Temporis',
    'Thanatosis',
    'Thaumaturgy',
    'Valeren',
    'Vicissitude',
    'Visceratika',
    'Defense',
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const options = [];

  disciplines.map((i, index) => {
    if (i == 'ANY' || i == 'NONE') {
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
      const imgSrc = `${process.env.ROOT_URL}images/disciplines/${i
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;
      options.push({
        value: i.toLowerCase(),
        name: 'discipline',
        label: (
          <>
            <span className="margin-full">
              <img src={imgSrc} className="discipline-base-image-results" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  const Forms = () => {
    const forms = [];
    for (let i = 1; i < props.formQuantity; i++) {
      forms.push(
        <Row key={i} className="py-1 pl-1 mx-0 align-items-center">
          <Col xs={3} className="d-flex justify-content-end pr-1">
            {props.formQuantity > 1 && props.formQuantity == i + 1 && (
              <>
                <Button
                  className="add-form"
                  variant="outline-secondary"
                  onClick={() => delForm()}
                >
                  <Dash />
                </Button>
                <Button
                  className="add-form"
                  variant="outline-secondary"
                  onClick={() => addForm()}
                >
                  <Plus />
                </Button>
              </>
            )}
          </Col>
          <Col xs={9} className="d-inline px-0">
            <Select
              classNamePrefix="react-select"
              options={options}
              isSearchable={!isMobile}
              name={i}
              value={options.find(
                (obj) => obj.value === props.value[i].toLowerCase()
              )}
              onChange={props.onChange}
            />
          </Col>
        </Row>
      );
    }
    return <>{forms}</>;
  };

  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.discipline;
      v.push('any');
      return {
        ...prevState,
        discipline: v,
      };
    });
    props.setFormQuantity(props.formQuantity + 1);
  };

  const delForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.discipline;
      v.pop();
      return {
        ...prevState,
        discipline: v,
      };
    });
    props.setFormQuantity(props.formQuantity - 1);
  };

  return (
    <>
      <Row className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="pl-0 pr-1">
          <label className="h6 mb-0">Discipline:</label>
          {props.formQuantity == 1 && (
            <div className="d-flex justify-content-end">
              {props.value[0] !== 'any' && (
                <Button
                  className="add-form"
                  variant="outline-secondary"
                  onClick={() => addForm()}
                >
                  <Plus />
                </Button>
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
            value={options.find(
              (obj) => obj.value === props.value[0].toLowerCase()
            )}
            onChange={(event, id) => props.onChange(event, id)}
          />
        </Col>
      </Row>
      <Forms />
    </>
  );
}

export default SearchLibraryFormDiscipline;
