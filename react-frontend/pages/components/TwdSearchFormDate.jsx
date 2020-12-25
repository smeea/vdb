import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

function TwdSearchFormDate(props) {
  const years = [
    'ANY',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
  ];

  const dateFromOptions = [];
  const dateToOptions = [];

  years.map((i, index) => {
    dateFromOptions.push({
      value: i.toLowerCase(),
      name: 'dateFrom',
      label: (
        <>
          <span className="margin-third" />
          {i}
        </>
      ),
    });

    dateToOptions.push({
      value: i.toLowerCase(),
      name: 'dateTo',
      label: (
        <>
          <span className="margin-third" />
          {i}
        </>
      ),
    });
  });

  return (
    <>
      <Row className="mx-0 align-items-center">
        <Col xs={5} className="d-inline px-0">
          <Select
            options={dateFromOptions}
            isSearchable={false}
            name="dateFrom"
            value={dateFromOptions.find((obj) => obj.value === props.dateFrom)}
            onChange={props.onChange}
          />
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <label className="h6 mb-0">to</label>
        </Col>
        <Col xs={5} className="d-inline px-0">
          <Select
            options={dateToOptions}
            isSearchable={false}
            name="dateTo"
            value={dateToOptions.find((obj) => obj.value === props.dateTo)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormDate;
