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
} from 'components';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { useApp } from 'context';

function Account(props) {
  const { username } = useApp();

  return (
    <Container className="main-container">
      <Row className="align-items-center justify-content-center py-3 vh-80">
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
                <div>
                  <AccountChangeName />
                </div>
                <div>
                  <AccountChangePassword />
                </div>
                <div>
                  <AccountChangeEmail />
                </div>
                <AccountLogoutButton />
                <AccountDeleteButton />
              </Stack>
            </>
          ) : (
            <Stack gap={4}>
              <div>
                <AccountLogin />
              </div>
              <div>
                <AccountRegister />
              </div>
            </Stack>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
