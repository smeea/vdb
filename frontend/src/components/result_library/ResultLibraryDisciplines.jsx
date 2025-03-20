import { ResultDisciplineImage } from '@/components';

const ResultLibraryDisciplines = ({ value }) => {
  if (value === '') return;

  if (value.indexOf('&') !== -1) {
    const disciplines = value.split(' & ');
    return (
      <div className="flex min-w-[55px] flex-wrap items-center justify-center">
        <ResultDisciplineImage value={disciplines[0]} />+
        <ResultDisciplineImage value={disciplines[1]} />
      </div>
    );
  } else if (value.indexOf('/') !== -1) {
    const disciplines = value.split('/');
    return (
      <div className="flex min-w-[55px] flex-wrap items-center justify-center">
        {disciplines.map((d) => {
          return (
            <div className="group flex items-center" key={d}>
              <ResultDisciplineImage value={d} />
              <div className="inline group-last:hidden">/</div>
            </div>
          );
        })}
      </div>
    );
  }

  return <ResultDisciplineImage value={value} />;
};

export default ResultLibraryDisciplines;
