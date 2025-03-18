import Plus from "@icons/plus.svg?react";
import { Button } from "@/components";
import { AND, TEXT } from "@/constants";

const SearchFormButtonAddText = ({ searchForm }) => {
	const addForm = () => {
		searchForm[TEXT].push({
			value: "",
			regex: false,
			in: false,
			logic: AND,
		});
	};

	return (
		<Button className="h-[18px] w-[18px]" onClick={addForm} noPadding>
			<Plus />
		</Button>
	);
};

export default SearchFormButtonAddText;
