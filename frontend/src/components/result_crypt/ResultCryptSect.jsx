const ResultCryptSect = ({ value }) => {
	return (
		<div title={value} className="text-fgGreen dark:text-fgGreenDark flex">
			{value.charAt(0).toUpperCase()}
		</div>
	);
};

export default ResultCryptSect;
