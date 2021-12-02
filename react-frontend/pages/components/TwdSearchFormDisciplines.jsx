import React from 'react';
import disciplinesList from './forms_data/disciplinesList.json';
import virtuesList from './forms_data/virtuesList.json';

function TwdSearchFormDisciplines(props) {
  const disciplinesForm = disciplinesList.map((i, index) => {
    const imgSrc = `${
      process.env.ROOT_URL
    }images/disciplines/${i.toLowerCase()}.svg`;
    const disciplineState = `discipline-container mb-2 state${
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
          <img className="discipline-base-image-forms" title={i} src={imgSrc} />
        </label>
      </div>
    );
  });

  const virtuesForm = virtuesList.map((i, index) => {
    const imgSrc = `${
      process.env.ROOT_URL
    }images/disciplines/${i.toLowerCase()}.svg`;
    const virtueState = `virtue-container mb-2 state${
      props.disciplines[i] ? 1 : 0
    }`;
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
          <img className="virtue-image" title={i} src={imgSrc} />
        </label>
      </div>
    );
  });

  return (
    <>
      <div className="input-group justify-content-start py-1">
        {disciplinesForm}
      </div>
      <div className="input-group">{virtuesForm}</div>
    </>
  );
}

export default TwdSearchFormDisciplines;
