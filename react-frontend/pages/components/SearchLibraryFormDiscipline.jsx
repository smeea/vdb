import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import AdditionalForms from './SearchAdditionalForms.jsx';
import SearchFormButtonGroupToggle from './SearchFormButtonGroupToggle.jsx';
import SearchFormButtonAdd from './SearchFormButtonAdd.jsx';
import SearchFormButtonDel from './SearchFormButtonDel.jsx';
import disciplinesList from './forms_data/disciplinesList.json';
import virtuesList from './forms_data/virtuesList.json';
import AppContext from '../../context/AppContext';

function SearchLibraryFormDiscipline(props) {
  const { isMobile } = useContext(AppContext);

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
            maxMenuHeight={
              isMobile
                ? window.innerHeight > 600
                  ? window.innerHeight - 250
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

export default SearchLibraryFormDiscipline;
