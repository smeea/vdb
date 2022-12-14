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
  const TOP_SPACING = 'pt-8';

  return (
    <div className="search-container mx-auto flex justify-center">
      <div
        className={`basis-full md:basis-8/12 lg:basis-7/12 xl:basis-1/2 ${TOP_SPACING}`}
      >
        <Banner />
        <div
          className={`flex items-center justify-center ${
            isMobile ? (username ? '' : 'h-[80vh]') : 'h-[70vh]'
          }`}
        >
          {username ? (
            <div className="w-full space-y-6">
              <div className="text-blue logo-box flex w-full items-center px-2 py-1 font-bold">
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
            <div className="w-full space-y-16">
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
