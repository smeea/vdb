import { ResultDisciplineImage } from '@/components';

const ResultCryptDisciplines = ({ value }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(value).map((d) => {
            return (
              <td className="max-w-[25px] min-w-[25px] sm:max-w-[28px] sm:min-w-[28px]" key={d}>
                <div className="flex items-center justify-center">
                  <ResultDisciplineImage value={d} isSuperior={value[d] === 2} />
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default ResultCryptDisciplines;
