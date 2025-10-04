import ArrowDown from "@icons/arrow-down.svg?react";
import ArrowUp from "@icons/arrow-up.svg?react";

const DiffQuantityDiff = ({ qFrom, qTo }) => {
  return (
    <div className="flex justify-center sm:px-1">
      {qFrom === qTo ? (
        ""
      ) : qFrom < qTo ? (
        <div className="whitespace-nowrap text-fgRed dark:text-fgRedDark">
          <ArrowDown className="inline" viewBox="0 2 16 16" />
          {qTo - qFrom}
        </div>
      ) : (
        <div className="whitespace-nowrap text-fgGreen dark:text-fgGreenDark">
          <ArrowUp className="inline" viewBox="0 2 16 16" />
          {qFrom - qTo}
        </div>
      )}
    </div>
  );
};

export default DiffQuantityDiff;
