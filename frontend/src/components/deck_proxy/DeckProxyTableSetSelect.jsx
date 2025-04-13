import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { CardImage, Select, Tooltip } from "@/components";
import { DATE, ID, NAME, PLAYTEST, POD, SET } from "@/constants";
import { useApp } from "@/context";
import EyeFill from "@icons/eye-fill.svg?react";
import { twMerge } from "tailwind-merge";

const DeckProxyTableSetSelect = ({ card, value, handleSetSelector, className }) => {
  const { playtestMode } = useApp();

  const setOptions = [
    {
      value: "",
      id: card[ID],
      label: <div className="text-sm">Newest</div>,
    },
  ];

  Object.keys(setsAndPrecons)
    .filter((i) => playtestMode || i !== PLAYTEST)
    .forEach((i) => {
      if (card[SET][i] && i !== POD) {
        setOptions.push({
          value: i.toLowerCase(),
          id: card[ID],
          label: (
            <div className="text-sm">
              {setsAndPrecons[i][NAME]}
              {setsAndPrecons[i][DATE] ? ` '${setsAndPrecons[i][DATE].slice(2, 4)}` : null}
            </div>
          ),
        });
      }
    });

  return (
    <>
      <td className={twMerge("min-w-[165px]", className)}>
        <Select
          options={setOptions}
          isSearchable={false}
          name={SET}
          placeholder="Set"
          value={setOptions.find((obj) => value && obj.value === value.toLowerCase)}
          onChange={handleSetSelector}
        />
      </td>
      <td className={twMerge("min-w-[25px]", className)}>
        <div className="flex items-center justify-center">
          <Tooltip overlay={<CardImage card={card} set={value ?? null} />} noPadding>
            <EyeFill />
          </Tooltip>
        </div>
      </td>
    </>
  );
};

export default DeckProxyTableSetSelect;
