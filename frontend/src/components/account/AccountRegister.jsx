import { useActionState, useState } from "react";
import PersonPlusFill from "@icons/person-plus-fill.svg?react";
import {
  AccountEmailForm,
  AccountPasswordForm,
  AccountUsernameForm,
  ErrorOverlay,
} from "@/components";
import { DECKS, EMAIL, PASSWORD, USERNAME } from "@/constants";
import { deckStore, useApp } from "@/context";
import { userServices } from "@/services";

const AccountRegister = () => {
  const { setUsername, setEmail, setPublicName } = useApp();
  const [usernameError, setUsernameError] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const registerUser = async (prevState, formData) => {
    const result = await userServices.register(
      formData.get(USERNAME),
      formData.get(PASSWORD),
      formData.get(EMAIL),
    );

    switch (result.error) {
      case 409:
        setUsernameError("USER ALREADY EXIST");
        break;
      case 500:
        setConnectionError("CONNECTION PROBLEM");
        break;
      default:
        setUsername(formData.get(USERNAME));
        setPublicName(formData.get(USERNAME));
        setEmail(formData.get(EMAIL));
        deckStore[DECKS] = {};
    }

    return {
      [PASSWORD]: formData.get(PASSWORD),
      [EMAIL]: formData.get(EMAIL),
      [USERNAME]: formData.get(USERNAME),
    };
  };

  const [data, action] = useActionState(registerUser);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-bold text-fgSecondary text-xl dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <PersonPlusFill width="22" height="22" viewBox="0 0 16 16" />
        </div>
        <div className="flex">Create account</div>
      </div>
      <form className="flex flex-col gap-2" action={action}>
        <div className="relative flex w-full">
          <AccountUsernameForm defaultValue={data?.[USERNAME]} />
          {usernameError && <ErrorOverlay placement="bottom">{usernameError}</ErrorOverlay>}
        </div>
        <div className="relative flex w-full">
          <AccountEmailForm defaultValue={data?.[EMAIL]} />
        </div>
        <div className="relative flex w-full">
          <AccountPasswordForm defaultValue={data?.[PASSWORD]} />
          {connectionError && <ErrorOverlay placement="bottom">{connectionError}</ErrorOverlay>}
        </div>
      </form>
    </div>
  );
};

export default AccountRegister;
