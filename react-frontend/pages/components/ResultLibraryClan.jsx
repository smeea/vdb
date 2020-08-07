import React from 'react';

import abomination from './../../assets/images/clans/abomination.gif';
import ahrimane from './../../assets/images/clans/ahrimane.gif';
import akunanse from './../../assets/images/clans/akunanse.gif';
import assamite from './../../assets/images/clans/assamite.gif';
import baali from './../../assets/images/clans/baali.gif';
import bloodbrother from './../../assets/images/clans/bloodbrother.gif';
import brujah from './../../assets/images/clans/brujah.gif';
import brujahantitribu from './../../assets/images/clans/brujahantitribu.gif';
import caitiff from './../../assets/images/clans/caitiff.gif';
import daughterofcacophony from './../../assets/images/clans/daughterofcacophony.gif';
import followerofset from './../../assets/images/clans/followerofset.gif';
import gangrel from './../../assets/images/clans/gangrel.gif';
import gangrelantitribu from './../../assets/images/clans/gangrelantitribu.gif';
import gargoyle from './../../assets/images/clans/gargoyle.gif';
import giovanni from './../../assets/images/clans/giovanni.gif';
import guruhi from './../../assets/images/clans/guruhi.gif';
import harbingerofskulls from './../../assets/images/clans/harbingerofskulls.gif';
import ishtarri from './../../assets/images/clans/ishtarri.gif';
import kiasyd from './../../assets/images/clans/kiasyd.gif';
import lasombra from './../../assets/images/clans/lasombra.gif';
import malkavian from './../../assets/images/clans/malkavian.gif';
import malkavianantitribu from './../../assets/images/clans/malkavianantitribu.gif';
import nagaraja from './../../assets/images/clans/nagaraja.gif';
import nosferatu from './../../assets/images/clans/nosferatu.gif';
import nosferatuantitribu from './../../assets/images/clans/nosferatuantitribu.gif';
import osebo from './../../assets/images/clans/osebo.gif';
import pander from './../../assets/images/clans/pander.gif';
import ravnos from './../../assets/images/clans/ravnos.gif';
import salubri from './../../assets/images/clans/salubri.gif';
import salubriantitribu from './../../assets/images/clans/salubriantitribu.gif';
import samedi from './../../assets/images/clans/samedi.gif';
import toreador from './../../assets/images/clans/toreador.gif';
import toreadorantitribu from './../../assets/images/clans/toreadorantitribu.gif';
import tremere from './../../assets/images/clans/tremere.gif';
import tremereantitribu from './../../assets/images/clans/tremereantitribu.gif';
import truebrujah from './../../assets/images/clans/truebrujah.gif';
import tzimisce from './../../assets/images/clans/tzimisce.gif';
import ventrue from './../../assets/images/clans/ventrue.gif';
import ventrueantitribu from './../../assets/images/clans/ventrueantitribu.gif';
import avenger from './../../assets/images/clans/avenger.gif';
import defender from './../../assets/images/clans/defender.gif';
import innocent from './../../assets/images/clans/innocent.gif';
import judge from './../../assets/images/clans/judge.gif';
import martyr from './../../assets/images/clans/martyr.gif';
import redeemer from './../../assets/images/clans/redeemer.gif';
import visionary from './../../assets/images/clans/visionary.gif';

function ResultLibraryClan(props) {
  const clanicons = {
    'Abomination': abomination,
    'Ahrimane': ahrimane,
    'Akunanse': akunanse,
    'Assamite': assamite,
    'Baali': baali,
    'Blood Brother': bloodbrother,
    'Brujah': brujah,
    'Brujah antitribu': brujahantitribu,
    'Caitiff': caitiff,
    'Daughter of Cacophony': daughterofcacophony,
    'Follower of Set': followerofset,
    'Gangrel': gangrel,
    'Gangrel antitribu': gangrelantitribu,
    'Gargoyle': gargoyle,
    'Giovanni': giovanni,
    'Guruhi': guruhi,
    'Harbinger of Skulls': harbingerofskulls,
    'Ishtarri': ishtarri,
    'Kiasyd': kiasyd,
    'Lasombra': lasombra,
    'Malkavian': malkavian,
    'Malkavian antitribu': malkavianantitribu,
    'Nagaraja': nagaraja,
    'Nosferatu': nosferatu,
    'Nosferatu antitribu': nosferatuantitribu,
    'Osebo': osebo,
    'Pander': pander,
    'Ravnos': ravnos,
    'Salubri': salubri,
    'Salubri antitribu': salubriantitribu,
    'Samedi': samedi,
    'Toreador': toreador,
    'Toreador antitribu': toreadorantitribu,
    'Tremere': tremere,
    'Tremere antitribu': tremereantitribu,
    'True Brujah': truebrujah,
    'Tzimisce': tzimisce,
    'Ventrue': ventrue,
    'Ventrue antitribu': ventrueantitribu,
    'Avenger': avenger,
    'Defender': defender,
    'Innocent': innocent,
    'Judge': judge,
    'Martyr': martyr,
    'Redeemer': redeemer,
    'Visionary': visionary,
  };

  const imgClass='clan-image-results';
  let clan_images;

  if (props.value.indexOf('/') != -1) {
    const clans = props.value.split('/');
    let items = clans.length;
    clan_images = clans.map((clan, index) => {
      const imgSrc = clanicons[clan];
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />{' / '}
          </span>
        );
      } else {
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />
          </span>
        );
      }
    });
  } else {
    const imgSrc = clanicons[props.value];
    clan_images =
      <img className={imgClass} src={imgSrc} />;
  }

  return (
    <td className='clan'>
      {clan_images}
    </td>
  );
}

export default ResultLibraryClan;
