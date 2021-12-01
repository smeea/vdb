import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonGroupToggle,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from 'components';
import { useApp } from 'context';

function SearchLibraryFormDiscipline(props) {
  const { isMobile } = useApp();

  const disciplines = [
    'ANY',
    'Not Required',
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

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="px-0">
          <div className="bold blue">Discipline:</div>
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
            isSearchable={!isMobile}
            name={0}
            value={options.find(
              (obj) => obj.value === props.value.value[0].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={props.value}
        options={options}
        onChange={props.onChange}
        setFormState={props.setFormState}
      />
    </>
  );
}

export default SearchLibraryFormDiscipline;
