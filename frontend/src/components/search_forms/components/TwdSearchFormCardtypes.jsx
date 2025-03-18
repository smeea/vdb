import { useState } from "react";
import { ResultLibraryTypeImage, Select, Toggle } from "@/components";
import {
	ANY,
	CARDTYPES,
	ID,
	NAME,
	TYPE_ACTION,
	TYPE_ACTION_MODIFIER,
	TYPE_ALLY,
	TYPE_COMBAT,
	TYPE_EQUIPMENT,
	TYPE_EVENT,
	TYPE_MASTER,
	TYPE_POLITICAL_ACTION,
	TYPE_REACTION,
	TYPE_RETAINER,
} from "@/constants";

const TypeForm = ({ isManual, handleManual, value = ANY, name, options, onChange }) => {
	const [min, max] = value == ANY ? [0, 100] : value.split(",");

	return (
		<div className="flex items-center gap-1">
			<div className="flex w-1/6 justify-center">
				<ResultLibraryTypeImage value={name} size="xl" />
			</div>
			<div className="w-5/6">
				{isManual ? (
					<div className="flex items-center justify-between gap-1">
						<input
							className="border-borderSecondary bg-bgPrimary text-fgPrimary outline-bgCheckboxSelected dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark min-h-[42px] w-full rounded-sm border text-center focus:outline"
							type="number"
							value={min}
							name={name.toLowerCase()}
							id="min"
							onChange={handleManual}
						/>
						-
						<input
							className="border-borderSecondary bg-bgPrimary text-fgPrimary outline-bgCheckboxSelected dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark min-h-[42px] w-full rounded-sm border text-center focus:outline"
							type="number"
							name={name.toLowerCase()}
							id="max"
							value={max}
							onChange={handleManual}
						/>
					</div>
				) : (
					<Select
						options={options}
						isSearchable={false}
						name={CARDTYPES}
						value={options.find((obj) => obj.value === value)}
						onChange={onChange}
					/>
				)}
			</div>
		</div>
	);
};

const TwdSearchFormCardtypes = ({ value, onChange }) => {
	const [isManual, setIsManual] = useState(false);
	const types = [
		[TYPE_MASTER, [15, 25, 35]],
		[TYPE_ACTION, [0, 5, 15]],
		[TYPE_POLITICAL_ACTION, [0, 5, 10, 15]],
		[TYPE_ALLY, [0, 5, 15]],
		[TYPE_EQUIPMENT, [0, 5, 10]],
		[TYPE_RETAINER, [0, 5, 10]],
		[TYPE_ACTION_MODIFIER, [0, 10, 20, 30]],
		[TYPE_REACTION, [0, 10, 20, 30]],
		[TYPE_COMBAT, [0, 10, 20, 30]],
		[TYPE_EVENT, [0, 4, 8]],
	];

	const handleManual = (e) => {
		const v = e.target.value;
		let [min, max] = value[e.target[NAME]].split(",");
		if (e.target[ID] == "min") {
			if (v >= 0) {
				min = e.target.value ?? 0;
			}
		} else {
			if (v <= 100) {
				max = e.target.value ?? 100;
			}
		}

		min = min === ANY || !min ? 0 : min;
		max = max === ANY || !max ? 100 : max;
		onChange({ name: e.target[NAME], value: `${min},${max}` }, { name: CARDTYPES });
	};

	const typesOptions = {};
	types.forEach((i) => {
		const options = [
			{
				value: ANY,
				name: i[0].toLowerCase(),
				label: <div className="flex justify-center">ANY</div>,
			},
		];

		if (i[1][0] === 0) {
			options.push({
				value: "0,0",
				name: i[0].toLowerCase(),
				label: <div className="flex justify-center">None</div>,
			});
		}

		i[1]
			.filter((i) => i !== 0)
			.map((j) => {
				options.push({
					value: `0,${j}`,
					name: i[0].toLowerCase(),
					label: <div className="flex justify-center">&lt; {j}%</div>,
				});
			});

		i[1]
			.filter((i) => i !== 0)
			.map((j, idx) => {
				if (i[1][0] === 0) {
					idx = idx + 1;
				}
				if (idx < i[1].length - 1)
					options.push({
						value: `${j},${i[1][idx + 1]}`,
						name: i[0].toLowerCase(),
						label: (
							<div className="flex justify-center">
								{j}...{i[1][idx + 1]}%
							</div>
						),
					});
			});

		i[1]
			.filter((i) => i !== 0)
			.map((j) => {
				options.push({
					value: `${j},100`,
					name: i[0].toLowerCase(),
					label: <div className="flex justify-center">&gt; {j}%</div>,
				});
			});

		typesOptions[i[0]] = options;
	});

	return (
		<div className="flex flex-col gap-2">
			<div className="flex justify-between gap-2">
				<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
					Library Card Types:
				</div>
				<Toggle isOn={isManual} handleClick={() => setIsManual(!isManual)}>
					Custom %
				</Toggle>
			</div>
			<div className="flex gap-6">
				<div className="flex w-1/2 flex-col gap-1">
					{[TYPE_MASTER, TYPE_ACTION, TYPE_POLITICAL_ACTION, TYPE_ALLY, TYPE_EQUIPMENT].map((i) => {
						return (
							<TypeForm
								key={i}
								isManual={isManual}
								handleManual={handleManual}
								onChange={onChange}
								name={i}
								value={value[i.toLowerCase()]}
								options={typesOptions[i]}
							/>
						);
					})}
				</div>
				<div className="flex w-1/2 flex-col gap-1">
					{[TYPE_RETAINER, TYPE_ACTION_MODIFIER, TYPE_REACTION, TYPE_COMBAT, TYPE_EVENT].map(
						(i) => {
							return (
								<TypeForm
									key={i}
									isManual={isManual}
									handleManual={handleManual}
									onChange={onChange}
									name={i}
									value={value[i.toLowerCase()]}
									options={typesOptions[i]}
								/>
							);
						},
					)}
				</div>
			</div>
		</div>
	);
};

export default TwdSearchFormCardtypes;
