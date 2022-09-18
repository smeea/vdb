import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import {
  AccountLogin,
  AccountLogoutButton,
  AccountRegister,
  AccountChangePassword,
  AccountChangeEmail,
  AccountChangeName,
  AccountDeleteButton,
  AccountPlaytest,
  Banner,
} from 'components';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { useApp } from 'context';

const Account = (props) => {
  const { isMobile, username, isPlaytester } = useApp();

  return (
    <Container className="main-container">
      <Row className="align-items-center justify-content-center p-0">
        <Col xs={12} md={7} lg={6} xl={5} className="px-0">
          <Banner />
        </Col>
      </Row>
      <Row
        className={`align-items-center justify-content-center vh-${
          isMobile ? 80 : 70
        }`}
      >
        <Col xs={12} md={7} lg={6} xl={5}>
          {username ? (
            <>
              <Stack gap={4}>
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="d-flex align-items-center px-1">
                    <PersonFill />
                    <span className="ms-2">Logged as: {username}</span>
                  </h6>
                </div>
                <AccountChangeName />
                <AccountChangePassword />
                <AccountChangeEmail />
                {isPlaytester && <AccountPlaytest />}
                <Stack gap={3}>
                  <AccountLogoutButton />
                  <AccountDeleteButton />
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <div className="py-4">
                <AccountLogin />
              </div>
              <div className="py-4">
                <AccountRegister />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
