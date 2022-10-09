import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = () => {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={7} xl={6} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5 className="pb-1">CHANGELOG</h5>

            {changes.map((item) => (
              <div className="py-1" key={item.version}>
                <div className="bold blue">{item.version}:</div>
                <ul>
                  {item.changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Changelog;
