import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import AppContext from '../../context/AppContext.js';
import AdditionalForms from './SearchAdditionalForms.jsx';

function SearchLibraryFormClan(props) {
  const { isMobile } = useContext(AppContext);

  const clans = [
    'ANY',
    'NONE',
    'Abomination',
    'Ahrimane',
    'Akunanse',
    'Assamite',
    'Baali',
    'Blood Brother',
    'Brujah',
    'Brujah antitribu',
    'Caitiff',
    'Daughter of Cacophony',
    'Follower of Set',
    'Gangrel',
    'Gangrel antitribu',
    'Gargoyle',
    'Giovanni',
    'Guruhi',
    'Harbinger of Skulls',
    'Ishtarri',
    'Kiasyd',
    'Lasombra',
    'Malkavian',
    'Malkavian antitribu',
    'Nagaraja',
    'Nosferatu',
    'Nosferatu antitribu',
    'Osebo',
    'Pander',
    'Ravnos',
    'Salubri',
    'Salubri antitribu',
    'Samedi',
    'Toreador',
    'Toreador antitribu',
    'Tremere',
    'Tremere antitribu',
    'True Brujah',
    'Tzimisce',
    'Ventrue',
    'Ventrue antitribu',
    'Avenger',
    'Defender',
    'Innocent',
    'Judge',
    'Martyr',
    'Redeemer',
    'Visionary',
  ];

  const options = [];

  clans.map((i, index) => {
    if (i == 'ANY' || i == 'NONE') {
      options.push({
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <>
            <span className="margin-full" />
            {i}
          </>
        ),
      });
    } else {
      const imgSrc = `${process.env.ROOT_URL}images/clans/${i
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;
      options.push({
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <>
            <span className="margin-full">
              <img src={imgSrc} className="clan-image-results" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  const addForm = () => {
    props.setFormState((prevState) => {
      const v = prevState.clan;
      v.push('any');
      return {
        ...prevState,
        clan: v,
      };
    });
  };

  const delForm = (i) => {
    props.setFormState((prevState) => {
      const v = prevState.clan;
      v.splice(i, 1);
      return {
        ...prevState,
        clan: v,
      };
    });
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex justify-content-between px-0">
          <div className="bold blue">Clan:</div>
          {props.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              {props.value.length == 1 ? (
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

export default SearchLibraryFormClan;
