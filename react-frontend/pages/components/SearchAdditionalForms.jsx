import React, { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Plus from '../../assets/images/icons/plus.svg';
import Dash from '../../assets/images/icons/dash.svg';
import AppContext from '../../context/AppContext.js';

const AdditionalForms = (props) => {
  const { isMobile } = useContext(AppContext);

  const forms = [];

  for (let i = 1; i < props.value.length; i++) {
    forms.push(
      <Row key={i} className="py-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex justify-content-between px-0 pr-1">
          <div className="px-0">
            {props.form && (
              <Button
                className="logic-form"
                variant="outline-secondary"
                onClick={() => props.toggleLogic(props.form)}
                title={props.logicAnd ? 'And' : 'Or'}
              >
                {props.logicAnd ? '&' : '//'}
              </Button>
            )}
          </div>
          <div className="d-flex">
            {i == props.value.length - 1 && (
              <Button
                className="add-form"
                variant="outline-secondary"
                onClick={() => props.addForm()}
              >
                <Plus />
              </Button>
            )}
            <div className="d-inline pl-1">
              <Button
                className="add-form"
                variant="outline-secondary"
                onClick={() => props.delForm(i)}
              >
                <Dash />
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={props.options}
            isSearchable={!isMobile}
            defaultMenuIsOpen={props.value[i] === 'any'}
            name={i}
            value={props.options.find(
              (obj) => obj.value === props.value[i].toLowerCase()
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    );
  }

  return <>{forms}</>;
};

export default AdditionalForms;
