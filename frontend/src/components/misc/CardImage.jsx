import { CLAN, EN, ID, NAME, SECT, TYPE } from "@/constants";
import { useApp } from "@/context";
import { getCardImageUrl } from "@/utils";
import { twMerge } from "tailwind-merge";

const CardImage = ({ card, set, className = "max-sm:w-full", size = "md", onClick }) => {
  const { lang, showLegacyImage } = useApp();
  const { baseUrl, otherUrl, legacyUrl, legacyScanUrl } = getCardImageUrl(card, set, lang);

  const hasLegacy =
    (card[ID] > 200000 && card[CLAN] !== "Hecata" && card[SECT] !== "Imbued") ||
    ["Master"].includes(card[TYPE]);

  const url =
    showLegacyImage && (hasLegacy || legacyScanUrl)
      ? (legacyScanUrl ?? legacyUrl)
      : lang === EN
        ? baseUrl
        : otherUrl;

  const resetImgSrc = (event) => {
    if (event.target.src !== `${baseUrl}.jpg`) {
      event.target.src = `${baseUrl}.jpg`;
    }
  };

  const sizeStyle = {
    sm: "sm:min-w-[320px] sm:max-w-[320px]",
    md: "sm:min-w-[358px] sm:max-w-[358px]",
  };

  return (
    <>
      {set || lang !== EN ? (
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
