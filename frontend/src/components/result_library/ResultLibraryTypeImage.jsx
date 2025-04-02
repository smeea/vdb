import { ResultMiscImage } from "@/components";

const ResultLibraryTypeImage = ({ value, size }) => {
  const cardtypes = value.split("/");

  return (
    <>
      {cardtypes.map((i) => {
        return <ResultMiscImage key={i} value={i.toUpperCase()} title={i} size={size} />;
      })}
    </>
  );
};

export default ResultLibraryTypeImage;
