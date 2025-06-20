import { twMerge } from "tailwind-merge";
import virtuesList from "@/assets/data/virtuesList.json";
import { ResultDisciplineImage } from "@/components";

const CryptSearchFormVirtues = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap">
      {Object.keys(virtuesList).map((i) => (
        <div
          key={i}
          className={twMerge(
            "flex h-[39px] w-[39px] cursor-pointer items-center justify-center",
            !value[i] && "opacity-40",
          )}
          onClick={() => onChange(i, 1)}
        >
          <ResultDisciplineImage size="lg" value={i} />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormVirtues;
