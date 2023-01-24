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
} from 'components';
import PersonFill from 'assets/images/icons/person-fill.svg';
import { useApp } from 'context';

const Account = () => {
  const { username, isPlaytester, isPlaytestAdmin } = useApp();

  return (
    <div className="account-container mx-auto">
      <div className="grid h-[90vh] place-items-center sm:h-[80vh]">
        {username ? (
          <div className="w-full space-y-6 sm:space-y-10">
            <div className="flex w-full items-center border border-borderSecondary bg-bgSecondary px-2 py-1 font-bold text-fgSecondary dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
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
            <div className="flex space-x-6">
              <div className="w-full">
                <AccountDeleteButton />
              </div>
              <div className="w-full">
                <AccountLogoutButton />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-16">
            <AccountLogin />
            <AccountRegister />
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
