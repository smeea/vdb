import PersonFill from "@icons/person-fill.svg?react";
import { twMerge } from "tailwind-merge";
import {
  AccountChangeEmail,
  AccountChangeName,
  AccountChangePassword,
  AccountDeleteButton,
  AccountLegacyToggle,
  AccountLogin,
  AccountLogoutButton,
  AccountRegister,
  Limited,
} from "@/components";
import { useApp } from "@/context";

const Account = () => {
  const { username } = useApp();
  return (
    <div
      className={twMerge(
        "account-container mx-auto grid place-items-center",
        username ? "sm:h-[90vh]" : "h-[90vh] max-sm:p-2",
      )}
    >
      {username ? (
        <div className="flex w-full flex-col sm:gap-8">
          <div className="mb-3 flex w-full items-center gap-2 border border-borderSecondary bg-bgSecondary p-2 font-bold text-fgSecondary sm:mb-0 dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
            <div className="flex min-w-[20px] justify-center">
              <PersonFill width="20" height="20" viewBox="0 0 16 16" />
            </div>
            <div className="text-lg">Logged as: &lt;{username}&gt;</div>
          </div>
          <div className="flex flex-col gap-5 max-sm:p-2 sm:gap-6">
            <AccountChangeName />
            <AccountChangePassword />
            <AccountChangeEmail />
            <div className="flex flex-col gap-3 sm:gap-4">
              <AccountLegacyToggle />
              <Limited />
              <div className="flex gap-3 sm:gap-4">
                <AccountDeleteButton />
                <AccountLogoutButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-16">
          <AccountLogin />
          <AccountRegister />
          <Limited />
        </div>
      )}
    </div>
  );
};

export default Account;
