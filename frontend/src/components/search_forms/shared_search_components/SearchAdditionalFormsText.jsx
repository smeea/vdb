import React from 'react';
import { Row, Col, Stack, Form, FormControl } from 'react-bootstrap';
import {
  SearchFormButtonAddText,
  SearchFormButtonDelText,
  SearchFormButtonGroupToggle,
} from '../shared_search_components';
import { useApp } from 'context';

const SearchAdditionalFormsText = (props) => {
  const { isMobile, isWide } = useApp();
  const options = [
    {
      value: 'name',
      label: 'Only in Name',
    },
    {
      value: 'text',
      label: 'Only in Text',
    },
    {
      value: 'regex',
      label: 'Regex',
    },
  ];

  const forms = [];

  for (let i = 1; i < props.value.length; i++) {
    const OptionsForm = options.map((opt, index) => {
      return (
        <Form.Check
          key={index}
          name={i}
          value={opt.value}
          type="checkbox"
          className="small"
          id={`text-${i}-${opt.value}`}
          label={opt.label}
          onChange={(e) => props.onChangeOptions(e)}
        />
      );
    });

    forms.push(
      <Row key={i} className="px-0 mx-0 pt-2 align-items-center">
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={i}
          autoComplete="off"
          spellCheck="false"
          value={props.value[i].value}
          onChange={props.onChange}
          autoFocus={true}
        />
        <Row className="mx-0 px-0 pt-1">
          <Col xs={isWide || isMobile ? 2 : 3} className="px-0">
            <Stack direction="horizontal" gap={1}>
              <SearchFormButtonGroupToggle
                value={{ name: props.name, ...props.value[i] }}
                i={i}
                setFormState={props.setFormState}
              />
              <SearchFormButtonAddText setFormState={props.setFormState} />
              <SearchFormButtonDelText
                setFormState={props.setFormState}
                value={props.value}
                i={i}
              />
            </Stack>
          </Col>
          <Col className="d-flex justify-content-end px-0">
            <Stack direction="horizontal" gap={3} className="align-items-start">
              {OptionsForm}
            </Stack>
          </Col>
        </Row>
      </Row>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalFormsText;
