import React, { useContext } from 'react';
import AppContext from 'context/AppContext';

function DeckCryptDisciplines(props) {
  const { isMobile } = useContext(AppContext);

  const emptyCols = [];
  let counter = 0;
  const n = props.keyDisciplines + props.nonKeyDisciplines;
  const maxCols = n < 8 ? n : isMobile ? 7 : 8;

  const width = 100 / maxCols + '%';

  const disciplineCols = props.disciplinesSet.map((d, index) => {
    let imgSrc;
    let imgClass;
    if (props.value[d] == 1) {
      imgSrc = `${process.env.ROOT_URL}images/disciplines/${d
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;
      imgClass = 'discipline-base-image-results';
    } else if (props.value[d] == 2) {
      imgSrc = `${process.env.ROOT_URL}images/disciplines/${d
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}sup.svg`;
      imgClass = 'discipline-superior-image-results';
    }
    if (counter < props.keyDisciplines) {
      counter += 1;
      return (
        <td width={width} key={index}>
          {props.value[d] && (
            <img className={imgClass} src={imgSrc} title={d} />
          )}
        </td>
      );
    } else if (props.value[d]) {
      counter += 1;
      return (
        <td width={width} key={index}>
          {props.value[d] && (
            <img className={imgClass} src={imgSrc} title={d} />
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
          {disciplineCols}
          {emptyCols}
        </tr>
      </tbody>
    </table>
  );
}

export default DeckCryptDisciplines;
