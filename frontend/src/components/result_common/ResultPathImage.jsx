import { twMerge } from "tailwind-merge";
import { capitalize } from "@/utils";

const ResultPathImage = ({ value, size = "md" }) => {
  if (!value) return;

  const sizeStyle = {
    sm: "max-h-[20px] max-w-[20px] sm:max-h-[23px] sm:max-w-[23px]",
    md: "max-h-[25px] max-w-[25px] sm:max-h-[28px] sm:max-w-[28px]",
  };

  return (
    <img
      aria-label="Path"
      className={twMerge("inline dark:brightness-[0.65]", sizeStyle[size])}
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/path${value.toLowerCase().replace(/ .*/, "")}.svg`}
      title={`Path of ${capitalize(value)}`}
    />
  );
};

export default ResultPathImage;
