import React from 'react';

function TwdSearchFormDisciplines(props) {
  const disciplines = [
    'Abombwe',
    'Animalism',
    'Auspex',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dementation',
    'Dominate',
    'Fortitude',
    'Melpominee',
    'Mytherceria',
    'Necromancy',
    'Obeah',
    'Obfuscate',
    'Obtenebration',
    'Potence',
    'Presence',
    'Protean',
    'Quietus',
    'Sanguinus',
    'Serpentis',
    'Spiritus',
    'Temporis',
    'Thanatosis',
    'Thaumaturgy',
    'Valeren',
    'Vicissitude',
    'Visceratika',
  ];

  const virtues = [
    'Defense',
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const disciplinesForm = disciplines.map((i, index) => {
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
          <img className="discipline-base-image-forms" src={imgSrc} />
        </label>
      </div>
    );
  });

  const virtuesForm = virtues.map((i, index) => {
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
          <img className="virtue-image" src={imgSrc} />
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
