import { useActionState, useState } from "react";
import LockFill from "@icons/lock-fill.svg?react";
import { AccountPasswordForm, ErrorOverlay } from "@/components";
import { NEW_PASSWORD, PASSWORD } from "@/constants";
import { userServices } from "@/services";

const AccountChangePassword = () => {
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const changePassword = async (prevState, formData) => {
		setError();
		const result = await userServices.changePassword(
			formData.get(PASSWORD),
			formData.get(NEW_PASSWORD),
		);
		switch (result.error) {
			case 401:
				setError("WRONG OLD PASSWORD");
				break;
			case 500:
				setError("CONNECTION PROBLEM");
				break;
			default:
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 1000);
		}

		return { password: "", newPassword: formData.get(NEW_PASSWORD) };
	};

	const [data, action] = useActionState(changePassword);

	return (
		<div className="flex flex-col gap-2">
			<div className="text-fgSecondary dark:text-fgSecondaryDark flex items-center gap-2 text-lg font-bold">
				<div className="flex min-w-[23px] justify-center">
					<LockFill width="20" height="20" viewBox="0 0 16 16" />
				</div>
				<div className="flex">Change password</div>
			</div>
			<form className="flex flex-col gap-2" action={action}>
				<div className="relative flex w-full">
					<AccountPasswordForm defaultValue={data?.[PASSWORD]} isOld />
				</div>
				<div className="relative flex w-full">
					<AccountPasswordForm defaultValue={data?.[NEW_PASSWORD]} success={success} isNew />
					{error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
				</div>
			</form>
		</div>
	);
};

export default AccountChangePassword;
