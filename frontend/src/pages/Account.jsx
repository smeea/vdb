import React from 'react';
import {
  AccountLogin,
  AccountLogoutButton,
  AccountRegister,
  AccountChangePassword,
  AccountChangeEmail,
  AccountChangeName,
  AccountDeleteButton,
  AccountPlaytestButton,
  AccountLimitedButton,
} from '@/components';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { useApp } from '@/context';

const Account = () => {
  const { username, isPlaytestAdmin } = useApp();
  return (
    <div
      className={`account-container mx-auto grid place-items-center ${
        username ? 'sm:h-[90vh]' : 'h-[90vh] max-sm:p-3'
      }`}
    >
      {username ? (
        <div className="flex w-full flex-col gap-8">
          <div className="mb-3 flex w-full items-center space-x-2 border border-borderSecondary bg-bgSecondary p-2 font-bold text-fgSecondary dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgSecondaryDark sm:mb-0">
            <div className="flex min-w-[20px] justify-center">
              <PersonFill width="20" height="20" viewBox="0 0 16 16" />
            </div>
            <div className="text-lg">Logged as: &lt;{username}&gt;</div>
          </div>
          <div className="flex flex-col gap-5 sm:gap-6 p-2 sm:p-0">
            <div>
              <AccountChangeName />
            </div>
            <div>
              <AccountChangePassword />
            </div>
            <div>
              <AccountChangeEmail />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              {isPlaytestAdmin && <AccountPlaytestButton />}
              <AccountLimitedButton />
              <div className="flex gap-3 sm:gap-4">
                <div className="w-full">
                  <AccountDeleteButton />
                </div>
                <div className="w-full">
                  <AccountLogoutButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-16">
          <AccountLogin />
          <AccountRegister />
          <AccountLimitedButton />
        </div>
      )}
    </div>
  );
};

export default Account;
