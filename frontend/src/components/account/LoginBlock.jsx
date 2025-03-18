import { AccountLogin, AccountRegister } from "@/components";

const LoginBlock = ({ children }) => {
	return (
		<div className="account-container mx-auto w-full">
			<div className="flex w-full flex-col gap-16">
				<div className="flex flex-col gap-6">
					<div className="text-fgSecondary dark:text-fgSecondaryDark flex justify-center text-center text-xl font-bold">
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
