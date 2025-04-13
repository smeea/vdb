import { Button, ErrorOverlay, FlexGapped, Input, Modal, Spinner } from "@/components";
import { PASSWORD } from "@/constants";
import { useApp } from "@/context";
import { userServices } from "@/services";
import EyeFill from "@icons/eye-fill.svg?react";
import EyeSlashFill from "@icons/eye-slash-fill.svg?react";
import { useActionState, useState } from "react";

const AccountDeleteConfirmation = ({ handleClose }) => {
  const { setUsername, isMobile } = useApp();
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);

  const deleteAccount = async (prevState, formData) => {
    const result = await userServices.deleteAccount(formData.get(PASSWORD));

    switch (result.error) {
      case 401:
        setError("WRONG PASSWORD");
        break;
      case 500:
        setError("CONNECTION PROBLEM");
        break;
      default:
        setUsername(undefined);
    }

    return { [PASSWORD]: formData.get(PASSWORD) };
  };

  const [data, action, pending] = useActionState(deleteAccount);

  return (
    <Modal size="xs" handleClose={handleClose} centered={isMobile} title="Delete Account">
      <FlexGapped className="flex-col">
        This will also delete all your decks and they will not be available via URL anymore.
        <form action={action} className="flex w-full">
          <div className="relative w-full">
            <Input
              placeholder="Enter password"
              type={hidePassword ? "password" : "text"}
              name={PASSWORD}
              defaultValue={data?.[PASSWORD]}
              roundedStyle="rounded-sm rounded-r-none"
              autoFocus
              required
            />
            {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
          </div>
          <div className="flex gap-2">
            <Button
              className="rounded-l-none"
              tabIndex="-1"
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <EyeFill /> : <EyeSlashFill />}
            </Button>
            <Button className="min-w-[72px]" variant="danger" type="submit">
              {pending ? <Spinner /> : "Delete"}
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </FlexGapped>
    </Modal>
  );
};

export default AccountDeleteConfirmation;
