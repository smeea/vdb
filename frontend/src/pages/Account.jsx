import React from 'react';
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
      <div className="flex justify-center">
        <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
          <Banner />
        </div>
      </div>
      <div
        className={`flex flex-row items-center justify-center px-1 pb-2 md:px-0 ${
          isMobile ? (username ? '' : 'h-[80vh]') : 'h-[70vh]'
        }`}
      >
        <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
          {username ? (
            <div className="flex flex-col space-y-6">
              <div className="text-blue logo-box flex w-full items-center px-2 py-1 font-bold">
                <PersonFill />
                <span className="ms-2">Logged as: &lt;{username}&gt;</span>
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
              {(isPlaytester || isPlaytestAdmin) && <AccountPlaytest />}
              <div className="flex flex-row space-x-2">
                <AccountDeleteButton />
                <AccountLogoutButton />
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-16">
              <div>
                <AccountLogin />
              </div>
              <div>
                <AccountRegister />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
