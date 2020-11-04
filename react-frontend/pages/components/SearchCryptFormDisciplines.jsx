import React from 'react';

function SearchCryptFormDisciplines(props) {
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

  const disciplinesforms = disciplines.map((i, index) => {
    const disciplineState = `discipline-container state${props.value[i]}`;
    const imgSrcBase = `${
      process.env.ROOT_URL
    }images/disciplines/${i.toLowerCase()}.svg`;
    const imgSrcSup = `${
      process.env.ROOT_URL
    }images/disciplines/${i.toLowerCase()}sup.svg`;
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
          <img className="discipline-base-image-forms" src={imgSrcBase} />
          <img className="discipline-superior-image-forms" src={imgSrcSup} />
        </label>
      </div>
    );
  });

  return (
    <div className="input-group justify-content-start py-1">
      {disciplinesforms}
    </div>
  );
}

export default SearchCryptFormDisciplines;
