import React from 'react';
import Select from 'react-select';

function SearchLibraryFormDiscipline(props) {
  const disciplines = [
    'Abombwe',
    'Animalism',
    'Auspex',
    'Celerity',
    'Chimerstry',
    'Daimoinon',
    'Dominate',
    'Dementation',
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
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const disciplineOptions = [
    {
      value: 'ANY',
      name: 'discipline',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
        </span>
        ANY
      </>
    },
    {
      value: 'NONE',
      name: 'discipline',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
        </span>
        NONE
      </>
    },
  ];

  disciplines.map((discipline, index) => {
    const imgSrc=process.env.ROOT_URL + 'images/disciplines/' + discipline.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    disciplineOptions.push({
      value: discipline,
      name: 'discipline',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={imgSrc} className='discipline-base-image-results' />
        </span>
        {discipline}
      </>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Discipline:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={disciplineOptions}
          name='discipline'
          value={disciplineOptions.find(obj => obj.value === props.value)}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormDiscipline;
