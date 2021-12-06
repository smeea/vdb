import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  AccountLogin,
  AccountLogout,
  AccountRegister,
  AccountChangePassword,
  AccountChangeEmail,
  AccountChangeName,
  AccountDelete,
} from 'components';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { useApp } from 'context';

function Account(props) {
  const { username } = useApp();

  return (
    <Container className="main-container">
      <Row className="h-75 align-items-center justify-content-center">
        <Col xs={12} md={5}>
          {username ? (
            <>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="d-flex align-items-center px-1">
                  <PersonFill />
                  <span className="ms-2">Logged as: {username}</span>
                </h6>
                <div>
                  <AccountLogout />
                </div>
              </div>
              <div className="py-2">
                <AccountChangeName />
              </div>
              <div className="py-2">
                <AccountChangePassword />
              </div>
              <div className="py-2">
                <AccountChangeEmail />
              </div>
              <div className="py-2">
                <AccountDelete />
              </div>
            </>
          ) : (
            <>
              <div className="py-2">
                <AccountLogin />
              </div>
              <div className="py-2">
                <AccountRegister />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
