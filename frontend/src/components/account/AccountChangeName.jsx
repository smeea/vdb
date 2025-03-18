import { useActionState, useState } from "react";
import Check2 from "@icons/check2.svg?react";
import PenFill from "@icons/pen-fill.svg?react";
import { Button, ConditionalTooltipOrModal, ErrorOverlay, Input, Spinner } from "@/components";
import { NAME } from "@/constants";
import { useApp } from "@/context";
import { userServices } from "@/services";

const TooltipText = () => {
	return (
		<div className="flex flex-col gap-1">
			<div>Public name is default author name for new decks.</div>
			<div>Author name is per-deck and can be changed anytime for each deck.</div>
			<div>Public names are not unique.</div>
			<div>Changing public name will not change author name of your existing decks.</div>
			<div>
				Public name is <b>not</b> your account username (the one you login with, which cannot be
				changed).
			</div>
		</div>
	);
};

const AccountChangeName = () => {
	const { publicName, setPublicName } = useApp();
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const changeName = async (prevState, formData) => {
		const result = await userServices.changeName(formData.get(NAME));
		switch (result.error) {
			case 500:
				setError("CONNECTION PROBLEM");
				break;
			default:
				setPublicName(formData.get(NAME));
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 1000);
		}

		return { [NAME]: formData.get(NAME) };
	};

	const [data, action, pending] = useActionState(changeName, { [NAME]: publicName });

	return (
		<div className="flex flex-col gap-2">
			<div className="text-fgSecondary dark:text-fgSecondaryDark flex items-center gap-2 text-lg font-bold">
				<div className="flex min-w-[23px] justify-center">
					<PenFill />
				</div>
				<div className="flex">Change public name</div>
				<ConditionalTooltipOrModal title="Public name" overlay={<TooltipText />}>
					<div className="text-fgThird dark:text-fgThirdDark">[?]</div>
				</ConditionalTooltipOrModal>
			</div>
			<form className="flex flex-col gap-2" action={action}>
				<div className="relative flex w-full">
					<Input
						placeholder="Public name"
						defaultValue={data?.[NAME]}
						name={NAME}
						roundedStyle="rounded-sm rounded-r-none"
					/>
					<Button
						disabled={pending}
						roundedStyle="rounded-r"
						borderStyle="border-r border-y"
						variant={success ? "success" : "primary"}
						type="submit"
					>
						{pending ? <Spinner /> : <Check2 />}
					</Button>
					{error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
				</div>
			</form>
		</div>
	);
};

export default AccountChangeName;
