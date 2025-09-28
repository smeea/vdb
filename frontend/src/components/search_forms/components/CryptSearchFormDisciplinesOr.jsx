import ChevronBarContract from "@icons/chevron-bar-contract.svg?react";
import XLg from "@icons/x-lg.svg?react";
import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import disciplinesList from "@/assets/data/disciplinesList.json";
import { Button, ResultDisciplineImage } from "@/components";
import { deepClone } from "@/utils";

const Box = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="mx-1.5 my-1.5 h-[27px] w-[27px] cursor-pointer border border-darkGray dark:border-darkGrayDark"
    />
  );
};

const CryptSearchFormDisciplinesOr = ({ value, setValue }) => {
  const [activeForm, setActiveForm] = useState();
  const [lastDiscipline, setLastDiscipline] = useState();

  const onChange = (i, d) => {
    const v = deepClone(value);

    if (Object.keys(v[i]).length > 1 && !v[i][d]) {
      delete v[i][lastDiscipline];
    }

    if (v[i][d] === 2) {
      delete v[i][d];
    } else {
      v[i][d] = (v[i][d] || 0) + 1;
      setLastDiscipline(d);
    }

    setValue(v);
  };

  const addForm = () => {
    setValue([...value, {}]);
    setActiveForm(value.length);
  };

  const openForm = (idx, d) => {
    setActiveForm(idx);
    setLastDiscipline(d);
  };

  const clearForm = () => {
    const v = deepClone(value);
    v.splice(activeForm, 1);
    setActiveForm();
    setValue(v);
  };

  return (
    <div className="flex flex-col">
      <div className="flex min-h-[39px] flex-wrap items-center gap-3">
        {value.map((i, idx) => (
          <div
            key={idx}
            className={twMerge(
              "flex min-w-[55px] items-center justify-center",
              idx === activeForm && "border-borderPrimary border-b dark:border-borderPrimaryDark",
            )}
          >
            {Object.keys(i).map((d, index) => (
              <Fragment key={d}>
                <div
                  className="flex h-[39px] w-[39px] cursor-pointer items-center justify-center"
                  onClick={() => openForm(idx, d)}
                >
                  <ResultDisciplineImage size="xl" value={d} isSuperior={i[d] === 2} />
                </div>
                {index < 1 && "/"}
              </Fragment>
            ))}
            {Object.keys(i).length < 1 && (
              <>
                <Box onClick={() => openForm(idx)} />/
              </>
            )}
            {Object.keys(i).length < 2 && <Box onClick={() => openForm(idx)} />}
            {idx === activeForm && (
              <div className="flex h-[39px] items-center justify-center px-1">
                <Button
                  className="h-[20px] w-[20px]"
                  noPadding
                  title="Remove active filter"
                  onClick={clearForm}
                >
                  <div className="flex items-center justify-center">
                    <XLg width="13" height="13" viewBox="0 0 16 16" />
                  </div>
                </Button>
              </div>
            )}
          </div>
        ))}
        <Button className="h-[39px] w-[34px] text-sm" onClick={addForm}>
          +OR DIS
        </Button>
      </div>
      {value[activeForm] && (
        <div className="flex flex-wrap">
          {Object.keys(disciplinesList).map((i) => (
            <div
              key={i}
              className={twMerge(
                "flex h-[39px] w-[39px] cursor-pointer items-center justify-center",
                !value[activeForm][i] && "opacity-40",
              )}
              onClick={() => onChange(activeForm, i)}
            >
              <ResultDisciplineImage size="xl" value={i} isSuperior={value[activeForm][i] === 2} />
            </div>
          ))}
          <div className="flex h-[39px] w-[39px] items-center justify-center">
            <Button
              className="h-[25px] w-[25px]"
              title="Close active filter"
              onClick={() => setActiveForm()}
            >
              <div className="flex items-center justify-center gap-2">
                <ChevronBarContract width="19" height="19" viewBox="0 0 16 16" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptSearchFormDisciplinesOr;
