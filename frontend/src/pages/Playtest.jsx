import React from 'react';
import {
  PlaytestReportExportAllButton,
  PlaytestManageButton,
  PlaytestUserCard,
  ErrorMessage,
} from '@/components';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { useApp } from '@/context';

const Playtest = () => {
  const { username, isPlaytestAdmin, isPlaytester } = useApp();
  return (
    <div className="account-container mx-auto grid place-items-center sm:h-[90vh]">
      {isPlaytester ? (
        <div className="flex w-full flex-col gap-8">
          <div className="mb-3 flex w-full items-center gap-2 border border-borderSecondary bg-bgSecondary p-2 font-bold text-fgSecondary dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgSecondaryDark sm:mb-0">
            <div className="flex min-w-[20px] justify-center">
              <PersonFill width="20" height="20" viewBox="0 0 16 16" />
            </div>
            <div className="text-lg">Logged as: &lt;{username}&gt;</div>
          </div>
          <div className="flex flex-col gap-5 p-2 sm:gap-6 sm:p-0">
            <PlaytestUserCard />
            {isPlaytestAdmin && (
              <div className="flex gap-3 max-sm:flex-col sm:gap-4">
                <PlaytestManageButton />
                <PlaytestReportExportAllButton />
              </div>
            )}
          </div>
        </div>
      ) : (
        <ErrorMessage>NOT ENOUGH INTERCEPT</ErrorMessage>
      )}
    </div>
  );
};

export default Playtest;
