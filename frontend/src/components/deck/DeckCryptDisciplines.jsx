import { ResultDisciplineImage } from "@/components";
import { useApp } from "@/context";

const DeckCryptDisciplines = ({ value, disciplinesSet, keyDisciplines }) => {
	const { isMobile } = useApp();

	return (
		<table>
			<tbody>
				<tr>
					{disciplinesSet.slice(0, keyDisciplines).map((d) => {
						return (
							<td className="max-w-[24px] min-w-[24px] sm:max-w-[28px] sm:min-w-[28px]" key={d}>
								{value?.[d] && (
									<div className="flex items-center justify-center">
										<ResultDisciplineImage
											value={d}
											size={isMobile ? "sm" : "md"}
											isSuperior={value[d] === 2}
										/>
									</div>
								)}
							</td>
						);
					})}
					{disciplinesSet
						.slice(keyDisciplines)
						.toSorted()
						.map((d) => {
							if (!value[d]) return null;

							return (
								<td className="max-w-[24px] min-w-[24px] sm:max-w-[28px] sm:min-w-[28px]" key={d}>
									{value[d] && (
										<div className="flex items-center justify-center">
											<ResultDisciplineImage
												size={isMobile ? "sm" : "md"}
												value={d}
												isSuperior={value[d] === 2}
											/>
										</div>
									)}
								</td>
							);
						})}
				</tr>
			</tbody>
		</table>
	);
};

export default DeckCryptDisciplines;
