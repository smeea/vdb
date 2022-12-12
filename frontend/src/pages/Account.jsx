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
        className={`md: flex flex-row items-center   justify-center ${
          isMobile ? (username ? '' : 'h-[80vh]') : 'h-[70vh]'
        }`}
      >
        <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2">
          {username ? (
            <div className="flex flex-col space-y-6">
              <div className="text-blue logo-box flex w-full items-center font-bold px-2 py-1">
                <div className="pr-2">
                  <PersonFill />
                </div>
                Logged as: &lt;{username}&gt;
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
              <div className="flex flex-row space-x-6">
                <div className="md:basis-1/2">
                  <AccountDeleteButton />
                </div>
                <div className="md:basis-1/2">
                  <AccountLogoutButton />
                </div>
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
