import React from 'react';
import { ResultDisciplineImage } from 'components';
import { useApp } from 'context';

const DeckCryptDisciplines = ({
  value,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
}) => {
  const { isMobile } = useApp();

  const emptyCols = [];
  let counter = 0;
  const n = keyDisciplines + nonKeyDisciplines;
  const maxCols = n < 8 ? n : isMobile ? 7 : 8;

  const width = 100 / maxCols + '%';

  const keyDisciplinesCols = disciplinesSet
    .slice(0, keyDisciplines)
    .map((d, index) => {
      counter += 1;
      return (
        <td width={width} key={index}>
          {value?.[d] && (
            <ResultDisciplineImage value={d} superior={value[d] === 2} />
          )}
        </td>
      );
    });

  const restDisciplinesCols = disciplinesSet
    .slice(keyDisciplines)
    .sort()
    .map((d, index) => {
      if (value[d]) {
        counter += 1;
        return (
          <td width={width} key={index}>
            {value[d] && (
              <ResultDisciplineImage value={d} superior={value[d] === 2} />
            )}
          </td>
        );
      } else {
        return null;
      }
    });

  while (counter < maxCols) {
    counter += 1;
    emptyCols.push(<td width={width} key={counter}></td>);
  }

  return (
    <table className="disciplines">
      <tbody>
        <tr>
          {keyDisciplinesCols}
          {restDisciplinesCols}
          {emptyCols}
        </tr>
      </tbody>
    </table>
  );
};

export default DeckCryptDisciplines;
