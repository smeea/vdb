import React from 'react';
import {
  Row,
  Col,
  Stack,
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';
import { useApp } from 'context';

function SearchFormTextAndButtons(props) {
  const { inventoryMode, isMobile } = useApp();

  const toggleOption = (e) => {
    switch (e.target.value) {
      case 'hideMissing':
        props.setHideMissing(!props.hideMissing);
        break;
      default:
        props.onChangeOptions(e);
    }
  };

  const options = [
    ['inText', 'Only in Card Text'],
    ['regex', 'Regex'],
  ];

  if (inventoryMode) options.unshift(['hideMissing', 'In Inventory']);

  const OptionsForm = options.map((opt, index) => {
    return (
      <Form.Check
        key={index}
        name={0}
        value={opt[0]}
        type="checkbox"
        className="small"
        id={`text-${opt[0]}`}
        label={opt[1]}
        checked={props.value[0][opt[0]]}
        onChange={toggleOption}
      />
    );
  });

  if (isMobile) {
    return (
      <>
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={0}
          autoComplete="off"
          spellCheck="false"
          value={props.value[0].value}
          onChange={props.onChange}
        />
        <Row className="pt-1 mx-0 align-items-center">
          <Col className="d-flex justify-content-end px-0">
            <Stack direction="horizontal" gap={3}>
              {OptionsForm}
            </Stack>
          </Col>
        </Row>
      </>
    );
  } else {
    return (
      <>
        <Row className="ps-1 mx-0 align-items-center">
          <InputGroup className="px-0">
            <FormControl
              placeholder="Card Name / Text / RegEx"
              type="text"
              name={0}
              autoComplete="off"
              spellCheck="false"
              value={props.value[0].value}
              onChange={props.onChange}
            />
            {props.preresults > props.showLimit && (
              <Button variant="primary" onClick={props.handleShowResults}>
                <Check2 /> FOUND {props.preresults}
              </Button>
            )}
            <Button
              title="Clear Forms & Results"
              variant="primary"
              onClick={props.handleClearButton}
            >
              <X />
            </Button>
          </InputGroup>
          <Row className="mx-0 px-0 pt-1">
            <Col
              xs={2}
              className="d-flex justify-content-between align-items-center px-0"
            >
              {props.value[0].value !== '' && (
                <div className="d-flex justify-content-end">
                  {props.value.length == 1 ? (
                    <SearchFormButtonAddText
                      setFormState={props.setFormState}
                    />
                  ) : (
                    <SearchFormButtonDelText
                      setFormState={props.setFormState}
                      value={props.value}
                      i={0}
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
        <SearchAdditionalFormsText
          value={props.value}
          onChange={props.onChange}
          onChangeOptions={props.onChangeOptions}
          setFormState={props.setFormState}
        />
      </>
    );
  }
}

export default SearchFormTextAndButtons;
