import React from 'react';
import { Col, Stack } from 'react-bootstrap';
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
    <div className="search-container mx-auto">
      <div className="flex flex-row justify-center">
        <Col xs={12} md={8} lg={7} xl={6} className="px-0">
          <Banner />
        </Col>
      </div>
      <div
        className={`flex flex-row items-center justify-center ${
          isMobile ? (username ? '' : 'h-[80vh]') : 'h-[70vh]'
        }`}
      >
        <Col xs={12} md={8} lg={7} xl={6} className="px-3 pb-3">
          {username ? (
            <>
              <Stack gap={4}>
                <div className="flex items-center font-bold text-blue logo-box px-2 py-1">
                  <PersonFill />
                  <span className="ms-2">Logged as: &lt;{username}&gt;</span>
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
      </div>
    </div>
  );
};

export default Account;
