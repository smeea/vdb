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
        <Col xs={3} className="d-flex justify-content-end pr-1">
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
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={props.options}
            isSearchable={!isMobile}
            name={i}
            value={props.options.find(
              (obj) => obj.value === props.value[i].toLowerCase()
            )}
            onChange={props.onChange}
            /* onChange={(event, id) => props.onChange(event, id)} */
          />
        </Col>
      </Row>
    );
  }
  return <>{forms}</>;
};

export default AdditionalForms;
