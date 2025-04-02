import { DiffQuantityDiff } from "@/components";

const DiffCardsTotalDiff = ({ qTo, qFrom }) => {
  return (
    <>
      {qTo === qFrom ? (
        <>{qTo}</>
      ) : (
        <div className="flex">
          {qFrom}
          <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
        </div>
      )}
    </>
  );
};

export default DiffCardsTotalDiff;
