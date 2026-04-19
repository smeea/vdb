import { capitalize } from "@/utils";

const ResultLibrarySectReq = ({ value }) => {
  if (value.length === 0) return;
  const htmlTitle = value.map((v) => capitalize(v)).join(" or ");

  return (
    <div title={htmlTitle} className="inline text-fgGreen dark:text-fgGreenDark">
      {value.map((v) => v[0].charAt(0).toUpperCase()).join("-")}
    </div>
  );
};

export default ResultLibrarySectReq;
