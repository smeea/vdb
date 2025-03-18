import { Input } from "@/components";
import { USERNAME } from "@/constants";

const AccountUsernameForm = ({ defaultValue, autoFocus, isNew }) => {
	return (
		<Input
			autoFocus={autoFocus}
			placeholder={isNew ? "New Username" : "Username"}
			name={USERNAME}
			defaultValue={defaultValue}
			required
		/>
	);
};

export default AccountUsernameForm;
