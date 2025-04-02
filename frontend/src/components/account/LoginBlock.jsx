import { AccountLogin, AccountRegister } from "@/components";

const LoginBlock = ({ children }) => {
  return (
    <div className="account-container mx-auto w-full">
      <div className="flex w-full flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center text-center font-bold text-fgSecondary text-xl dark:text-fgSecondaryDark">
            {children}
          </div>
          <AccountLogin />
        </div>
        <AccountRegister />
      </div>
    </div>
  );
};

export default LoginBlock;
