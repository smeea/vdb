import { twMerge } from "tailwind-merge";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import { ResultDisciplineImage } from "@/components";

const CryptSearchFormDisciplines = ({ value, onChange, withExtra }) => {
  const disciplines = withExtra
    ? [...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted()
    : Object.keys(disciplinesList);

  return (
    <div className="flex flex-wrap">
      {disciplines.map((i) => (
        <div
          key={i}
          className={twMerge(
            "flex h-[39px] w-[39px] cursor-pointer items-center justify-center",
            !value[i] && "opacity-40",
          )}
          onClick={() => onChange(i, 2)}
        >
          <ResultDisciplineImage size="xl" value={i} isSuperior={value[i] === 2} />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormDisciplines;
