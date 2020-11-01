import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchLibraryFormClan(props) {
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
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            />
            {i}
          </>
        ),
      });
    } else {
      const imgSrc = `${
        process.env.ROOT_URL
      }images/clans/${i.toLowerCase().replace(/[\s,:!?'.\-]/g, '')}.gif`;
      options.push({
        value: i.toLowerCase(),
        name: 'clan',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            >
              <img src={imgSrc} className="discipline-base-image-results" />
            </span>
            {i}
          </>
        ),
      });
    }
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Clan:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="clan"
          value={options.find((obj) => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchLibraryFormClan;
