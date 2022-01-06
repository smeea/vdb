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
import { useApp } from 'context';

function SearchFormTextAndButtons(props) {
  const { inventoryMode, isMobile } = useApp();

  const options = [
    ['inText', 'Only in Card Text'],
    ['regex', 'With Regex'],
  ];

  if (inventoryMode) options.unshift(['hideMissing', 'In Inventory']);

  const toggleOption = (e) => {
    switch (e.target.value) {
      case 'hideMissing':
        props.setHideMissing(!props.hideMissing);
        break;
      default:
        props.onChangeOptions(e);
    }
  };

  const OptionsForm = options.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="text"
        value={i[0]}
        type="checkbox"
        className="small"
        id={`text-${i[0]}`}
        label={i[1]}
        checked={i[0] == 'hideMissing' ? props.hideMissing : props.value[i[0]]}
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
          name="text"
          autoComplete="off"
          spellCheck="false"
          value={props.value.value}
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
        <InputGroup className="mb-2">
          <FormControl
            placeholder="Card Name / Text / RegEx"
            type="text"
            name="text"
            autoComplete="off"
            spellCheck="false"
            value={props.value.value}
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
        <Row className="pb-1 ps-1 mx-0 align-items-center">
          <Col className="d-flex justify-content-end px-0">
            <Stack direction="horizontal" gap={3}>
              {OptionsForm}
            </Stack>
          </Col>
        </Row>
      </>
    );
  }
}

export default SearchFormTextAndButtons;
