import { twMerge } from "tailwind-merge";
import { CLAN, EN, ID, NAME } from "@/constants";
import { useApp } from "@/context";
import { getCardImageUrl } from "@/utils";

const CardImage = ({ card, set, className = "max-sm:w-full", size = "md", onClick }) => {
	const { lang, showLegacyImage } = useApp();
	const { baseUrl, otherUrl, legacyUrl, legacyScanUrl } = getCardImageUrl(card, set, lang);

	const url =
		showLegacyImage && ((card[ID] > 200000 && card[CLAN] != "Hecata") || legacyScanUrl)
			? legacyScanUrl
				? legacyScanUrl
				: legacyUrl
			: lang == EN
				? baseUrl
				: otherUrl;

	const resetImgSrc = (event) => {
		if (event.target.src != `${baseUrl}.jpg`) {
			event.target.src = `${baseUrl}.jpg`;
		}
	};

	const sizeStyle = {
		sm: "sm:min-w-[320px] sm:max-w-[320px]",
		md: "sm:min-w-[358px] sm:max-w-[358px]",
	};

	return (
		<>
			{set || lang != EN ? (
				<img
					className={twMerge(sizeStyle[size], className)}
					src={`${otherUrl}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
					alt={card[NAME]}
					onClick={onClick}
					onError={resetImgSrc}
				/>
			) : (
				<picture>
					<source
						media="(max-width: 576px)"
						srcSet={`${url}.webp?v=${import.meta.env.VITE_IMAGE_VERSION}`}
						type="image/webp"
					/>
					<img
						className={twMerge(sizeStyle[size], className)}
						src={`${url}.jpg?v=${import.meta.env.VITE_IMAGE_VERSION}`}
						alt={card[NAME]}
						onClick={onClick}
						onError={resetImgSrc}
					/>
				</picture>
			)}
		</>
	);
};

export default CardImage;
