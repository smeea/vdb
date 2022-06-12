import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Banner } from 'components';
import changes from '../../../CHANGES.json';

const Changelog = (props) => {
  return (
    <Container className="main-container">
      <Row className="justify-content-center">
        <Col xs={12} md={7} lg={6} xl={5} className="px-0">
          <Banner />
          <div className="px-3 pt-0 pt-lg-3">
            <h5 className="pb-2">CHANGELOG</h5>

            {changes.map((item) => (
              <React.Fragment key={item.version}>
                <h6>{item.version}:</h6>
                <ul>
                  {item.changes.map((change, idx) => (
                    <li key={idx}>{change}</li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Changelog;
