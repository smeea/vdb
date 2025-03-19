import X from '@icons/x.svg?react';
import { Button, Header, ResultLibraryTypeImage, SortButton } from '@/components';
import { TYPE } from '@/constants';
import { setLibraryCompare } from '@/context';

const ResultLibraryTotal = ({
  cards,
  sortMethods,
  sortMethod,
  setSortMethod,
  inCompare,
  inHoF,
}) => {
  const byTypes = {};
  let total = 0;

  cards.forEach((card) => {
    if (byTypes[card[TYPE]]) {
      byTypes[card[TYPE]] += 1;
    } else {
      byTypes[card[TYPE]] = 1;
    }
    total += 1;
  });

  return (
    <Header>
      <div className="p-1 font-bold whitespace-nowrap sm:p-2">
        {inHoF ? 'LIBRARY' : inCompare ? 'COMPARE' : 'TOTAL'}: {total}
      </div>
      <div className={Object.keys(byTypes).length > 3 ? '' : 'flex items-center'}>
        {Object.keys(byTypes).map((k) => {
          return (
            <div key={k} className="inline-block px-2 whitespace-nowrap">
              <div className="flex items-center gap-0.5">
                <ResultLibraryTypeImage value={k} />
                {byTypes[k]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {!inCompare ? (
          <SortButton
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        ) : (
          <div>
            <Button title="Clear Compare" onClick={() => setLibraryCompare(undefined)}>
              <X width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        )}
      </div>
    </Header>
  );
};

export default ResultLibraryTotal;
