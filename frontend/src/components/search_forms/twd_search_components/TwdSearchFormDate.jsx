import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import { useApp } from 'context';

const TwdSearchFormDate = ({ inPda, date, onChange }) => {
  const { isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const noPdaYears = [
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
    '2003',
    '2002',
    '2001',
    '2000',
    '1999',
    '1998',
    '1997',
  ];
  const years = ['ANY', '2022'];
  if (!inPda) years.push(...noPdaYears);

  const dateFromOptions = [];
  const dateToOptions = [];

  years.map((i, index) => {
    if (i === 'ANY' || date.to === 'any' || parseInt(i) <= date.to) {
      dateFromOptions.push({
        value: i.toLowerCase(),
        name: 'from',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }

    if (i === 'ANY' || date.from === 'any' || parseInt(i) >= date.from) {
      dateToOptions.push({
        value: i.toLowerCase(),
        name: 'to',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }
  });

  return (
    <>
      <Row className="mx-0 align-items-center">
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <div className="px-0">from</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={dateFromOptions}
            isSearchable={false}
            name="date-from"
            maxMenuHeight={maxMenuHeight}
            value={dateFromOptions.find((obj) => obj.value === date.from)}
            onChange={onChange}
          />
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <div className="px-0">to</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={dateToOptions}
            isSearchable={false}
            name="date-to"
            maxMenuHeight={maxMenuHeight}
            value={dateToOptions.find((obj) => obj.value === date.to)}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default TwdSearchFormDate;
