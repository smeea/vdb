import virtuesList from "@/assets/data/virtuesList.json";
import { ResultDisciplineImage } from "@/components";

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
	const disciplinesSorted = Object.keys(disciplinesDetailed).toSorted((a, b) => {
		return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
	});

	const withVirtues = disciplinesSorted.some(
		(d) => virtuesList[d] && disciplinesDetailed[d][0] > 0,
	);
	const withDisciplines = disciplinesSorted.some(
		(d) => !virtuesList[d] && disciplinesDetailed[d][0] > 0,
	);

	return (
		<div>
			{withDisciplines &&
				disciplinesSorted
					.filter((d) => !virtuesList[d] && disciplinesDetailed[d][0] > 0)
					.map((d) => {
						return (
							<div key={d} className="inline-block pr-5 whitespace-nowrap">
								<div className="flex items-center gap-1">
									<ResultDisciplineImage
										title={`${d} Superior | Inferior`}
										isSuperior={true}
										value={d}
									/>
									<div>{disciplinesDetailed[d][2]}</div>
									<div className="text-midGray dark:text-midGrayDark">|</div>
									<div>{disciplinesDetailed[d][1]}</div>
								</div>
							</div>
						);
					})}
			{withVirtues &&
				disciplinesSorted
					.filter((d) => virtuesList[d] && disciplinesDetailed[d][0] > 0)
					.map((d) => {
						return (
							<div key={d} className="inline-block pr-5 whitespace-nowrap">
								<div className="flex items-center gap-1">
									<ResultDisciplineImage value={d} />
									<div className="flex">{disciplinesDetailed[d][1]}</div>
								</div>
							</div>
						);
					})}
		</div>
	);
};

export default DisciplinesCryptSummary;
