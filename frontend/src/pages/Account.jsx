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

const Account = () => {
  const { isMobile, username, isPlaytester, isPlaytestAdmin } = useApp();

  return (
    <Container className="main-container">
      <Row className="align-items-center justify-content-center p-0">
        <Col xs={12} md={8} lg={7} xl={6} className="px-0">
          <Banner />
        </Col>
      </Row>
      <Row
        className={`d-flex align-items-center justify-content-center ${
          isMobile ? '' : 'vh-70'
        }`}
      >
        <Col xs={12} md={8} lg={7} xl={6} className="pb-3 ">
          {username ? (
            <>
              <Stack gap={4}>
                <div className="d-flex align-items-center bold blue logo-box px-2 py-1">
                  <PersonFill />
                  <span className="ms-2">Logged as: {username}</span>
                </div>
                <AccountChangeName />
                <AccountChangePassword />
                <AccountChangeEmail />
                {(isPlaytester || isPlaytestAdmin) && <AccountPlaytest />}
                <Stack gap={3} direction={isMobile ? 'vertical' : 'horizontal'}>
                  <AccountDeleteButton />
                  <AccountLogoutButton />
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
