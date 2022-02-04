import React from 'react';
import { ResultDisciplineImage } from 'components';
import disciplinesList from 'components/deck/forms_data/disciplinesList.json';
import virtuesList from 'components/deck/forms_data/virtuesList.json';

function TwdSearchFormDisciplines(props) {
  const disciplinesForm = disciplinesList.map((i, index) => {
    const disciplineState = `discipline-container state${
      props.disciplines[i] ? 1 : 0
    }`;
    return (
      <div key={index} className={disciplineState}>
        <label
          className="discipline-container d-flex justify-content-center align-items-center"
          htmlFor={i}
        >
          <input
            className="d-none"
            type="button"
            name="disciplines"
            id={i}
            onClick={(e) => props.onChange(e)}
          />
          <ResultDisciplineImage
            className="discipline-base-image-forms"
            value={i}
          />
        </label>
      </div>
    );
  });

  const virtuesForm = virtuesList.map((i, index) => {
    const virtueState = `virtue-container state${props.disciplines[i] ? 1 : 0}`;
    return (
      <div key={index} className={virtueState}>
        <label
          className="virtue-container d-flex justify-content-center align-items-center"
          htmlFor={i}
        >
          <input
            className="d-none"
            type="button"
            name="disciplines"
            id={i}
            onClick={(e) => props.onChange(e)}
          />
          <ResultDisciplineImage className="virtue-image" value={i} />
        </label>
      </div>
    );
  });

  return (
    <>
      <div className="input-group justify-content-start py-1">
        {disciplinesForm}
      </div>
      <div className="input-group pb-2">{virtuesForm}</div>
    </>
  );
}

export default TwdSearchFormDisciplines;
