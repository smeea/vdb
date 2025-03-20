import paths from '@/assets/data/paths.json';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import {
  Checkbox,
  ResultPathImage,
  ResultPreconClan,
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
  Select,
} from '@/components';
import {
  ANY,
  BCP,
  CLAN,
  DATE,
  FIRST,
  NAME,
  ONLY,
  PLAYTEST,
  PRECON,
  PRECONS,
  PRINT,
  REPRINT,
  TITLE,
} from '@/constants';
import { useApp } from '@/context';

const SearchFormPrecon = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtestMode, isMobile } = useApp();
  const name = PRECON;

  const options = [
    {
      value: ANY,
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          ANY
        </div>
      ),
    },
    {
      value: BCP,
      name: name,
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px]" />
          ANY BCP (excl. Promo)
        </div>
      ),
    },
  ];

  Object.keys(setsAndPrecons)
    .filter((set) => playtestMode || set !== PLAYTEST)
    .map((set) => {
      if (setsAndPrecons[set][PRECONS]) {
        const year = setsAndPrecons[set][DATE] ? setsAndPrecons[set][DATE].slice(2, 4) : null;

        Object.keys(setsAndPrecons[set][PRECONS]).map((precon) => {
          const fullName = setsAndPrecons[set][PRECONS][precon][NAME];
          const clans = setsAndPrecons[set][PRECONS][precon][CLAN].split('/');

          options.push({
            value: `${set}:${precon}`,
            name: PRECON,
            label: (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={
                      clans.length === 1 ? 'flex w-[40px] items-center justify-center' : 'inline'
                    }
                  >
                    {clans.map((clan) => {
                      return paths.includes(clan) ? (
                        <ResultPathImage key={clan} value={clan} />
                      ) : (
                        <ResultPreconClan key={clan} clan={clan} />
                      );
                    })}
                  </div>
                  {fullName}
                </div>
                <div className="text-sm whitespace-nowrap">
                  {set === PLAYTEST ? 'PLAYTEST' : set} {year && `'${year}`}
                </div>
              </div>
            ),
          });
        });
      }
    });

  const filterOption = ({ label, value }, string) => {
    const name = [ANY, BCP].includes(value)
      ? label.props.children[1]
      : label.props.children[0].props.children[1];

    const set = [ANY, BCP].includes(value) ? null : label.props.children[1].props.children;

    if (name) return `${name} ${set}`.toLowerCase().includes(string);
    return true;
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        <div className="flex w-1/4 items-center justify-between">
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Precon:</div>
          {value.value[0] !== ANY && (
            <div className="flex justify-end gap-1 px-1">
              {value.value.length === 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel searchForm={searchForm} i={0} name={name} />
              )}
            </div>
          )}
        </div>
        <div className="w-3/4">
          <Select
            options={options}
            isSearchable={!isMobile}
            isClearable={value.value[0] !== ANY}
            filterOption={filterOption}
            name={0}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={(e, id) => (e ? onChange(e, id) : onChange({ name: name, value: ANY }, id))}
          />
        </div>
      </div>
      {value.value.length > 1 && (
        <SearchAdditionalForms
          isClearable
          value={value}
          name={name}
          searchForm={searchForm}
          options={options}
          onChange={onChange}
        />
      )}
      <div className="flex items-center justify-end gap-4">
        {[
          {
            value: ONLY,
            label: 'Only In',
            title: 'Printed only in selected Set',
          },
          {
            value: FIRST,
            label: 'First Print',
            title: 'Printed first in selected Set',
          },
          {
            value: REPRINT,
            label: 'Reprint',
            title: 'Reprinted in selected Set',
          },
        ].map((i) => {
          return (
            <Checkbox
              key={i.value}
              size="sm"
              name={name}
              value={i.value}
              label={i.label}
              title={i[TITLE]}
              disabled={value.value[0] === BCP && i.value === REPRINT}
              checked={value[PRINT] === i.value}
              onChange={onChangeOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchFormPrecon;
