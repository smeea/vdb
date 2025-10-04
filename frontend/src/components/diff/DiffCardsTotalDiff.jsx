import { DiffQuantityDiff } from "@/components";

const DiffCardsTotalDiff = ({ qTo = 0, qFrom = 0 }) => {
  return (
    <div className="flex">
      {qFrom}
      {qTo !== qFrom && <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />}
    </div>
  );
};

export default DiffCardsTotalDiff;
