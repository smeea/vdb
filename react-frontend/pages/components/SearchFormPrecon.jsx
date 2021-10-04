import React, { useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import GiftFill from '../../assets/images/icons/gift-fill.svg';
import setsAndPrecons from './forms_data/setsAndPrecons.json';
import AppContext from '../../context/AppContext.js';

function SearchFormPrecon(props) {
  const { isMobile } = useContext(AppContext);

  const preOptions = [
    {
      set: 'any',
      name: 'ANY',
    },
    {
      set: 'bcp',
      name: 'ANY BCP',
    },
  ];

  Object.keys(setsAndPrecons).map((i) => {
    if (setsAndPrecons[i].hasOwnProperty('precons')) {
      const set = i;
      const year = setsAndPrecons[i].year;
      Object.keys(setsAndPrecons[i].precons).map((j) => {
        const precon = j;
        const name = setsAndPrecons[i].precons[j].name;
        const clans = setsAndPrecons[i].precons[j].clan.split('/');
        preOptions.push({
          set: set,
          precon: precon,
          year: year,
          name: name,
          clans: clans,
        });
      });
    }
  });

  const options = [];

  preOptions.map((i, index) => {
    if (i.set != 'any' && i.set != 'bcp') {
      const clanImages = i.clans.map((clan, index) => {
        const imgSrc = `${process.env.ROOT_URL}images/clans/${clan
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}.svg`;

        return (
          <div className="d-inline" key={index}>
            {clan === 'Bundle' ? (
              <div className="d-inline clan-image-results">
                <GiftFill />
              </div>
            ) : clan === 'Mix' ? null : (
              <img src={imgSrc} className="clan-image-results" />
            )}
          </div>
        );
      });

      options.push({
        value: `${i.set}:${i.precon}`,
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pe-2">
              <div
                className={clanImages.length == 1 ? 'margin-full' : 'd-inline'}
              >
                {clanImages}
              </div>
              {i.name}
            </div>
            <div className="small">{`${i.set} '${i.year}`}</div>
          </div>
        ),
      });
    } else {
      options.push({
        value: i.set,
        name: 'precon',
        label: (
          <>
            <span className="margin-full" />
            {i.name}
          </>
        ),
      });
    }
  });

  const preconOptions = [
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const preconOptionsForm = preconOptions.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="precon"
        value={i[0]}
        type="checkbox"
        id={`precon-${i[0]}`}
        label={i[1]}
        checked={props.value[i[0]]}
        onChange={(e) => props.onChangeOptions(e)}
      />
    );
  });

  const filterOption = ({ label }, string) => {
    const l = label.props.children[1];
    if (l == 'any' || l == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
    }
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="pt-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Precon:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            menuPlacement={isMobile ? 'top' : 'bottom'}
            filterOption={filterOption}
            name="precon"
            value={options.find((obj) => obj.value === props.value.precon)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          {preconOptionsForm}
        </Col>
      </Row>
    </>
  );
}

export default SearchFormPrecon;
