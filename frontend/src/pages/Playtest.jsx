import React from 'react';
import { Link } from 'react-router-dom';
import Wrench from '@/assets/images/icons/wrench.svg?react';
import InboxesFill from '@/assets/images/icons/inboxes-fill.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import { PlaytestUserCard, ButtonIconed } from '@/components';
import { useApp } from '@/context';
import { EN, LANG } from '@/utils/constants';

const Playtest = () => {
  const { username, isPlaytestAdmin, playtestProfile } = useApp();

  return (
    <div className="account-container mx-auto grid place-items-center sm:h-[90vh]">
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
              <Link to="/playtest/manage" className="w-full hover:no-underline">
                <ButtonIconed
                  className="w-full"
                  title="Manage Playtesters"
                  icon={<Wrench />}
                  text="Manage Playtesters"
                />
              </Link>
              <Link
                to={`/playtest/reports/${playtestProfile[LANG] ?? EN}`}
                className="w-full hover:no-underline"
              >
                <ButtonIconed
                  className="w-full"
                  title="Show Playtest Reports"
                  icon={<InboxesFill />}
                  text="Reports"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playtest;
