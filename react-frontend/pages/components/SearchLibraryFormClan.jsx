import React from 'react';
import Select from 'react-select';

function SearchLibraryFormClan(props) {
  const clans = [
    'Abomination',
    'Ahrimane',
    'Akunanse',
    'Assamite',
    'Baali',
    'Blood Brother',
    'Brujah',
    'Brujah antitribu',
    'Caitiff',
    'Daughter of Cacophony',
    'Follower of Set',
    'Gangrel',
    'Gangrel antitribu',
    'Gargoyle',
    'Giovanni',
    'Guruhi',
    'Harbinger of Skulls',
    'Ishtarri',
    'Kiasyd',
    'Lasombra',
    'Malkavian',
    'Malkavian antitribu',
    'Nagaraja',
    'Nosferatu',
    'Nosferatu antitribu',
    'Osebo',
    'Pander',
    'Ravnos',
    'Salubri',
    'Salubri antitribu',
    'Samedi',
    'Toreador',
    'Toreador antitribu',
    'Tremere',
    'Tremere antitribu',
    'True Brujah',
    'Tzimisce',
    'Ventrue',
    'Ventrue antitribu',
    'Avenger',
    'Defender',
    'Innocent',
    'Judge',
    'Martyr',
    'Redeemer',
    'Visionary',
  ];

  const clanOptions = [
    {
      value: 'ANY',
      name: 'clan',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
        </span>
        ANY
      </>
    },
    {
      value: 'NONE',
      name: 'clan',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
        </span>
        NONE
      </>
    },
  ];

  clans.map((clan, index) => {
    const imgSrc=process.env.ROOT_URL + 'images/clans/' + clan.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    clanOptions.push({
      value: clan,
      name: 'clan',
      label:
      <>
        <span style={{display: 'inline-block', width: '40px', textAlign: 'center'}}>
          <img src={imgSrc} className='discipline-base-image-results' />
        </span>
        {clan}
      </>
    });
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Clan:
        </label>
      </div>
      <div className='form-group col-9'>
        <Select
          options={clanOptions}
          name='clan'
          value={clanOptions.find(obj => obj.value === props.value)}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default SearchLibraryFormClan;
