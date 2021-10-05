import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import AppContext from '../../context/AppContext.js';
import AdditionalForms from './SearchAdditionalForms.jsx';

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

  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.discipline.discipline;
      v.push('any');
      return {
        ...prevState,
        discipline: {
          ...prevState['discipline'],
          discipline: v,
        },
      };
    });
  };

  const delForm = (i) => {
    props.setFormState((prevState) => {
      const v = prevState.discipline.discipline;
      v.splice(i, 1);
      return {
        ...prevState,
        discipline: {
          ...prevState['discipline'],
          discipline: v,
        },
      };
    });
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="px-0">
          <div className="bold blue">Discipline:</div>
          {props.value.discipline[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              {props.value.discipline.length == 1 ? (
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
            isSearchable={!isMobile}
            name={0}
            value={options.find(
              (obj) => obj.value === props.value.discipline[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <AdditionalForms
        value={props.value.discipline}
        logicAnd={props.value.logicAnd}
        toggleLogic={props.toggleLogic}
        addForm={addForm}
        delForm={delForm}
        options={options}
        onChange={props.onChange}
        form={'discipline'}
      />
    </>
  );
}

export default SearchLibraryFormDiscipline;
