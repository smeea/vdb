import { EN, ES, FR, PT } from "@/constants";

const Flag = ({ value, size = "md", noTitle }) => {
	const icons = {
		[EN]: {
			filename: "en",
			title: "English",
		},
		[ES]: {
			filename: "es",
			title: "Spanish",
		},
		[FR]: {
			filename: "fr",
			title: "French",
		},
		[PT]: {
			filename: "br",
			title: "Portuguese",
		},
	};
	const sizeStyle = {
		md: "h-[18px]",
		lg: "h-[22px]",
	};

	const sizePx = {
		md: 18,
		lg: 22,
	};

	return (
		<img
			src={`${import.meta.env.VITE_BASE_URL}/images/misc/flag-${icons[value].filename}.svg`}
			title={!noTitle ? icons[value].title : null}
			alt={`${icons[value].title} flag`}
			className={sizeStyle[size]}
			width={sizePx[size]}
			height={sizePx[size]}
		/>
	);
};

export default Flag;
