import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchFormSet(props) {
  const sets = [
    ['any', 'ANY'],
    ['Promo', 'Promo'],
    ['25th', '25th Anniversary - 2019'],
    ['FB', 'First Blood - 2019'],
    ['SP', 'Sabbat Preconstructed - 2019'],
    ['Anthology', 'Anthology - 2018'],
    ['LK', 'Lost Kindred - 2018'],
    ['AU', 'Anarchs Unbound - 2016'],
    ['TU', 'The Unaligned - 2014'],
    ['DM', 'Danse Macabre - 2013'],
    ['HttB', 'Heirs to the Blood - 2010'],
    ['EK', 'Ebony Kingdom - 2009'],
    ['BSC', 'Blood Shadowed Court - 2008'],
    ['KoT', 'Keepers of Tradition - 2008'],
    ['TR', 'Twilight Rebellion - 2008'],
    ['SoC', 'Sword of Caine - 2007'],
    ['LotN', 'Lords of the Night - 2007'],
    ['NoR', 'Nights of Reckoning - 2006'],
    ['Third', 'Third Edition - 2006'],
    ['KMW', 'Kindred Most Wanted - 2005'],
    ['LoB', 'Legacies of Blood - 2005'],
    ['Gehenna', 'Gehenna - 2004'],
    ['Tenth', '10th Anniversary - 2004'],
    ['Anarchs', 'Anarchs - 2003'],
    ['BH', 'Black Hand - 2003'],
    ['CE', 'Camarilla Edition - 2002'],
    ['BL', 'Bloodlines - 2001'],
    ['FN', 'Final Nights - 2001'],
    ['SW', 'Sabbat War - 2000'],
    ['AH', 'Ancient Hearts - 1996'],
    ['DS', 'Dark Sovereigns - 1995'],
    ['VTES', 'V:TES - 1995'],
    ['Jyhad', 'Jyhad - 1994'],
  ];

  const options = [];

  sets.map((i, index) => {
    if (i[0] == 'any') {
      options.push({
        value: i[0],
        name: 'set',
        label: (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '40px',
                textAlign: 'center',
              }}
            ></span>
            {i[1]}
          </>
        ),
      });
    } else {
      options.push({
        value: i[0],
        name: 'set',
        label: i[1],
      });
    }
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">
          Set:
        </label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="set"
          value={options.find((obj) => obj.value === props.value)}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchFormSet;
