import { CryptSearchFormDisciplines, CryptSearchFormVirtues } from "@/components";

const TwdSearchFormDisciplines = ({ value, onChange }) => {
	return (
		<div className="flex flex-col gap-1">
			<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
				Library Disciplines:
			</div>
			<CryptSearchFormDisciplines value={value} onChange={onChange} withExtra />
			<CryptSearchFormVirtues value={value} onChange={onChange} />
		</div>
	);
};

export default TwdSearchFormDisciplines;
