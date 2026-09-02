import { Input } from "@/components";
import { EMAIL } from "@/constants";

const AccountEmailForm = ({ defaultValue }) => {
  return (
    <Input
      placeholder="Email (Optional; required for password reset)"
      type="email"
      name={EMAIL}
      defaultValue={defaultValue}
    />
  );
};

export default AccountEmailForm;
