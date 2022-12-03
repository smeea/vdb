import React from 'react';
import { Stack } from 'react-bootstrap';
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
        <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 px-0">
          <Banner />
        </div>
      </div>
      <div
        className={`flex flex-row items-center justify-center ${
          isMobile ? (username ? '' : 'h-[80vh]') : 'h-[70vh]'
        }`}
      >
        <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 px-3 pb-3">
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
        </div>
      </div>
    </div>
  );
};

export default Account;
