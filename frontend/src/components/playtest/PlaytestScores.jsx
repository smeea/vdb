import Star from "@icons/star.svg?react";
import StarFill from "@icons/star-fill.svg?react";
import StarHalf from "@icons/star-half.svg?react";
import { twMerge } from "tailwind-merge";
import { useApp } from "@/context";

const PlaytestScores = ({ value, handleClick, disabled, isSmall }) => {
  const { isMobile } = useApp();
  const SIZE = isSmall ? (isMobile ? "16" : "20") : "24";

  const titles = [
    "Useless / Unplayable",
    "Extremely weak",
    "Very weak",
    "Weak",
    "Average, on the weaker side",
    "Average, on the stronger side",
    "Strong",
    "Very strong",
    "Extremely Strong",
    "Overpowered / Broken",
  ];

  return (
    <div className="flex gap-1.5 px-1 sm:gap-2 print:dark:text-fgPrimary">
      {Array.from(Array(10).keys()).map((i) => {
        return (
          <div
            key={i}
            className={twMerge("flex print:max-w-[14px]", !disabled && "cursor-pointer")}
            onClick={() => (disabled ? null : handleClick(i + 1))}
            title={titles[i]}
          >
            {i + 0.5 === value ? (
              <StarHalf width={SIZE} height={SIZE} />
            ) : i < value ? (
              <StarFill width={SIZE} height={SIZE} />
            ) : (
              <Star width={SIZE} height={SIZE} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlaytestScores;
