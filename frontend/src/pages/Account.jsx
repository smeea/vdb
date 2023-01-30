import React from 'react';
import {
  AccountLogin,
  AccountLogoutButton,
  AccountRegister,
  AccountChangePassword,
  AccountChangeEmail,
  AccountChangeName,
  AccountDeleteButton,
  AccountPlaytestButtons,
} from '@/components';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import { useApp } from '@/context';

const Account = () => {
  const { username, isPlaytester, isPlaytestAdmin } = useApp();

  return (
      <div className="account-container mx-auto grid sm:h-[90vh] place-items-center">
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
            {(isPlaytester || isPlaytestAdmin) && <AccountPlaytestButtons />}
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
  );
};

export default Account;
