import { useActionState, useState } from "react";
import DoorOpenFill from "@icons/door-open-fill.svg?react";
import {
  AccountPasswordForm,
  AccountUsernameForm,
  ConditionalTooltipOrModal,
  ErrorOverlay,
} from "@/components";
import { PASSWORD, USERNAME } from "@/constants";
import { useApp } from "@/context";
import { userServices } from "@/services";

const LoginTooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>Account is required for Deck Building and Inventory.</div>
      <div>
        Decks and Inventory are stored on the server and you can access them from any device.
      </div>
    </div>
  );
};

const PasswordTooltipText = () => {
  return (
    <div className="flex flex-col gap-1">
      <div>There is no automatic password restoration yet.</div>
      <div>
        Please{" "}
        <a href="mailto:smeea@riseup.net?subject=VDB - Password reset&body=Account: <PUT YOUR ACCOUNT NAME HERE>">
          send me an email
        </a>{" "}
        with your username and I will generate temporary password.
      </div>
      <div>Usually I do it within a day, but sometimes it takes a bit more.</div>
    </div>
  );
};

const AccountLogin = () => {
  const { initializeUserData } = useApp();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState();

  const loginUser = async (prevState, formData) => {
    const result = await userServices.login(formData.get(USERNAME), formData.get(PASSWORD));
    switch (result.error) {
      case 401:
        setPasswordError("WRONG PASSWORD");
        break;
      case 500:
        setPasswordError("CONNECTION PROBLEM");
        break;
      case 400:
        setUsernameError("USER DOES NOT EXIST");
        break;
      default:
        initializeUserData(result);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
    }

    return { [USERNAME]: formData.get(USERNAME), [PASSWORD]: formData.get(PASSWORD) };
  };

  const [data, action] = useActionState(loginUser);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-bold text-fgSecondary text-xl dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <DoorOpenFill width="20" height="20" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Login</div>
        <ConditionalTooltipOrModal title="Why to have account" overlay={<LoginTooltipText />}>
          <div className="text-fgThird dark:text-fgThirdDark">[?]</div>
        </ConditionalTooltipOrModal>
      </div>
      <form className="flex flex-col gap-2" action={action}>
        <div className="relative flex w-full">
          <AccountUsernameForm defaultValue={data?.[USERNAME]} autoFocus />
          {usernameError && <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>}
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm defaultValue={data?.[PASSWORD]} success={success} />
          {passwordError && <ErrorOverlay placement="bottom">{passwordError}</ErrorOverlay>}
        </div>
        <div className="flex">
          <ConditionalTooltipOrModal
            placement="bottom"
            overlay={<PasswordTooltipText />}
            title="Password reset"
          >
            <div className="text-fgSecondary text-sm italic hover:underline dark:text-fgSecondaryDark">
              Forgot password
            </div>
          </ConditionalTooltipOrModal>
        </div>
      </form>
    </div>
  );
};

export default AccountLogin;
