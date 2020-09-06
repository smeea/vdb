import React from 'react';

function SearchCryptFormSet(props) {
  const sets = [
    ['ANY', 'ANY'],
    ['25th', '25th Anniversary - 2019'],
    ['FB', 'First Blood - 2019'],
    ['SP', 'Sabbat Preconstructed - 2019'],
    ['Anthology', 'Anthology - 2018'],
    ['LK', 'Lost Kindred - 2018'],
    ['AU', 'Anarchs Unbound - 2016'],
    ['TU', 'The Unaligned - 2014'],
    ['DM', 'Danse Macabre - 2013'],
    ['HttB', 'Heirs to the Blood - 2010'],
    ['EK', 'Ebony Kingdom - 2009'],
    ['BSC', 'Blood Shadowed Court - 2008'],
    ['KoT', 'Keepers of Tradition - 2008'],
    ['TR', 'Twilight Rebellion - 2008'],
    ['SoC', 'Sword of Caine - 2007'],
    ['LotN', 'Lords of the Night - 2007'],
    ['NoR', 'Nights of Reckoning - 2006'],
    ['Third', 'Third Edition - 2006'],
    ['KMW', 'Kindred Most Wanted - 2005'],
    ['LoB', 'Legacies of Blood - 2005'],
    ['Gehenna', 'Gehenna - 2004'],
    ['Tenth', '10th Anniversary - 2004'],
    ['Anarchs', 'Anarchs - 2003'],
    ['BH', 'Black Hand - 2003'],
    ['CE', 'Camarilla Edition - 2002'],
    ['BL', 'Bloodlines - 2001'],
    ['FN', 'Final Nights - 2001'],
    ['SW', 'Sabbat War - 2000'],
    ['AH', 'Ancient Hearts - 1996'],
    ['DS', 'Dark Sovereigns - 1995'],
    ['VTES', 'V:TES - 1995'],
    ['Jyhad', 'Jyhad - 1994'],
    ['Promo', 'Promo'],
  ];

  const setforms = sets.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Set:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='set' value={props.value} onChange={props.onChange}>
          {setforms}
        </select>
      </div>
    </div>
  );
}

export default SearchCryptFormSet;
