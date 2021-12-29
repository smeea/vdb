import React from 'react';
import { Form, Stack, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import { ResultLibraryClan } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from './';
import { useApp } from 'context';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';

function SearchFormPrecon(props) {
  const { isMobile } = useApp();

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
      const year = setsAndPrecons[i].date.slice(2, 4);
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
        return (
          <div className="d-inline" key={index}>
            {clan === 'Bundle' ? (
              <div className="d-inline clan-image-results">
                <GiftFill />
              </div>
            ) : clan === 'Mix' ? null : (
              <ResultLibraryClan value={clan} />
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
        className="set-precon-traits"
        type="checkbox"
        id={`precon-${i[0]}`}
        label={i[1]}
        checked={props.value[i[0]]}
        onChange={(e) => props.onChangeOptions(e)}
      />
    );
  });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children[1];
    }
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Precon:</div>
          {props.value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
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
            menuPlacement="top"
            maxMenuHeight={isMobile ? window.innerHeight - 200 : 550}
            filterOption={filterOption}
            name={0}
            value={options.find((obj) => obj.value === props.value.value[0])}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        menuPlacement={isMobile ? 'top' : 'bottom'}
        value={props.value}
        options={options}
        onChange={props.onChange}
        setFormState={props.setFormState}
      />
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={3}>
            {preconOptionsForm}
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default SearchFormPrecon;
