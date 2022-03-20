import React from 'react';
import { Row, Col, Stack, Form, FormControl } from 'react-bootstrap';
import {
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';

const SearchAdditionalFormsText = (props) => {
  const options = [
    ['inText', 'Only in Card Text'],
    ['regex', 'Regex'],
  ];

  const forms = [];

  for (let i = 1; i < props.value.length; i++) {
    const OptionsForm = options.map((opt, index) => {
      return (
        <Form.Check
          key={index}
          name={i}
          value={opt[0]}
          type="checkbox"
          className="small"
          id={`text-${i}-${opt[0]}`}
          label={opt[1]}
          checked={props.value[i][opt[0]]}
          onChange={props.onChangeOptions}
        />
      );
    });

    forms.push(
      <Row key={i} className="ps-1 mx-0 pt-2 align-items-center">
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={i}
          autoComplete="off"
          spellCheck="false"
          value={props.value[i].value}
          onChange={props.onChange}
        />
        <Row className="mx-0 px-0 pt-1">
          <Col
            xs={2}
            className="d-flex justify-content-between align-items-center px-0"
          >
            {props.value[0].value !== '' && (
              <div className="d-flex justify-content-end pe-1">
                {props.value.length == 1 ? (
                  <SearchFormButtonAddText setFormState={props.setFormState} />
                ) : (
                  <SearchFormButtonDelText
                    setFormState={props.setFormState}
                    value={props.value}
                    i={i}
                  />
                )}
              </div>
            )}
          </Col>
          <Col className="d-flex justify-content-end px-0">
            <Stack direction="horizontal" gap={3}>
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
