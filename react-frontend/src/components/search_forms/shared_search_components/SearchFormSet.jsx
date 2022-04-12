import React from 'react';
import { Form, Stack, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from './';
import { useApp } from 'context';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';

function SearchFormSet(props) {
  const { isMobile } = useApp();

  const preOptions = Object.keys(setsAndPrecons).map((i) => {
    return {
      set: i,
      name: setsAndPrecons[i].name,
      year: setsAndPrecons[i].date.slice(2, 4),
    };
  });

  const options = [
    {
      value: 'any',
      name: 'set',
      label: (
        <>
          <span className="margin-full" />
          ANY
        </>
      ),
    },
    {
      value: 'bcp',
      name: 'set',
      label: <>Any BCP (incl. Promo)</>,
    },
  ];

  preOptions.map((i, index) => {
    options.push({
      value: i.set,
      name: 'set',
      label: (
        <div className="d-flex justify-content-between align-items-center">
          <div className="pe-2">{i.name}</div>
          {i.year && <div className="ps-2 small">{`'${i.year}`}</div>}
        </div>
      ),
    });
  });

  const ageFormOptions = [
    {
      value: 'or-newer',
      label: 'Or Newer',
      title: 'Printed in selected set or any newer (can be in older sets too)',
    },
    {
      value: 'or-older',
      label: 'Or Older',
      title: 'Printed in selected set or any older (can be in newer sets too)',
    },
    {
      value: 'not-newer',
      label: 'Not Newer',
      title: 'Not printed in newer set',
    },
    {
      value: 'not-older',
      label: 'Not Older',
      title: 'Not printed in older set',
    },
  ];

  const ageForm = ageFormOptions.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="set"
        value={i.value}
        type="checkbox"
        className="small pe-1"
        id={`set-${i.label}`}
        label={i.label}
        disabled={props.value.value.length > 1}
        title={i.title}
        checked={props.value['age'] === i.value}
        onChange={(e) => props.onChangeOptions(e)}
      />
    );
  });

  const additionalFormOptions = [
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const additionalForm = additionalFormOptions.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="set"
        value={i[0]}
        type="checkbox"
        className="small"
        id={`set-${i[0]}`}
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
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Set:</div>
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
          <Stack direction="horizontal" gap={2}>
            {ageForm}
          </Stack>
        </Col>
      </Row>
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={3}>
            {additionalForm}
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default SearchFormSet;
