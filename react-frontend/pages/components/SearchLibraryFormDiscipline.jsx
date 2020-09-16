import React from 'react';
import Select from 'react-select';

function SearchLibraryFormDiscipline(props) {
  const disciplines = [
    'ANY',
    'NONE',
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

  const options = []

  disciplines.map((i, index) => {
    if (i == 'ANY' || i == 'NONE') {
      options.push(
        {
          value: i.toLowerCase(),
          name: 'discipline',
          label:
          <>
            <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
            </span>
            {i}
          </>
        }
      );
    } else {
      const imgSrc=process.env.ROOT_URL + 'images/disciplines/' + i.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
      options.push(
        {
          value: i.toLowerCase(),
          name: 'discipline',
          label:
          <>
            <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
              <img src={imgSrc} className='discipline-base-image-results' />
            </span>
            {i}
          </>
        }
      );
    }
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
          options={options}
          name='discipline'
          value={options.find(obj => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormDiscipline;
