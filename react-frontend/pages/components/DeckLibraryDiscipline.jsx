import React from 'react';

import abombwe from './../../assets/images/disciplines/abombwe.gif';
import animalism from './../../assets/images/disciplines/animalism.gif';
import auspex from './../../assets/images/disciplines/auspex.gif';
import celerity from './../../assets/images/disciplines/celerity.gif';
import chimerstry from './../../assets/images/disciplines/chimerstry.gif';
import daimoinon from './../../assets/images/disciplines/daimoinon.gif';
import dominate from './../../assets/images/disciplines/dominate.gif';
import dementation from './../../assets/images/disciplines/dementation.gif';
import fortitude from './../../assets/images/disciplines/fortitude.gif';
import melpominee from './../../assets/images/disciplines/melpominee.gif';
import mytherceria from './../../assets/images/disciplines/mytherceria.gif';
import necromancy from './../../assets/images/disciplines/necromancy.gif';
import obeah from './../../assets/images/disciplines/obeah.gif';
import obfuscate from './../../assets/images/disciplines/obfuscate.gif';
import obtenebration from './../../assets/images/disciplines/obtenebration.gif';
import potence from './../../assets/images/disciplines/potence.gif';
import presence from './../../assets/images/disciplines/presence.gif';
import protean from './../../assets/images/disciplines/protean.gif';
import quietus from './../../assets/images/disciplines/quietus.gif';
import sanguinus from './../../assets/images/disciplines/sanguinus.gif';
import serpentis from './../../assets/images/disciplines/serpentis.gif';
import spiritus from './../../assets/images/disciplines/spiritus.gif';
import temporis from './../../assets/images/disciplines/temporis.gif';
import thanatosis from './../../assets/images/disciplines/thanatosis.gif';
import thaumaturgy from './../../assets/images/disciplines/thaumaturgy.gif';
import valeren from './../../assets/images/disciplines/valeren.gif';
import vicissitude from './../../assets/images/disciplines/vicissitude.gif';
import visceratika from './../../assets/images/disciplines/visceratika.gif';
import abombwesup from './../../assets/images/disciplines/abombwesup.gif';
import animalismsup from './../../assets/images/disciplines/animalismsup.gif';
import auspexsup from './../../assets/images/disciplines/auspexsup.gif';
import celeritysup from './../../assets/images/disciplines/celeritysup.gif';
import chimerstrysup from './../../assets/images/disciplines/chimerstrysup.gif';
import daimoinonsup from './../../assets/images/disciplines/daimoinonsup.gif';
import dominatesup from './../../assets/images/disciplines/dominatesup.gif';
import dementationsup from './../../assets/images/disciplines/dementationsup.gif';
import fortitudesup from './../../assets/images/disciplines/fortitudesup.gif';
import melpomineesup from './../../assets/images/disciplines/melpomineesup.gif';
import mytherceriasup from './../../assets/images/disciplines/mytherceriasup.gif';
import necromancysup from './../../assets/images/disciplines/necromancysup.gif';
import obeahsup from './../../assets/images/disciplines/obeahsup.gif';
import obfuscatesup from './../../assets/images/disciplines/obfuscatesup.gif';
import obtenebrationsup from './../../assets/images/disciplines/obtenebrationsup.gif';
import potencesup from './../../assets/images/disciplines/potencesup.gif';
import presencesup from './../../assets/images/disciplines/presencesup.gif';
import proteansup from './../../assets/images/disciplines/proteansup.gif';
import quietussup from './../../assets/images/disciplines/quietussup.gif';
import sanguinussup from './../../assets/images/disciplines/sanguinussup.gif';
import serpentissup from './../../assets/images/disciplines/serpentissup.gif';
import spiritussup from './../../assets/images/disciplines/spiritussup.gif';
import temporissup from './../../assets/images/disciplines/temporissup.gif';
import thanatosissup from './../../assets/images/disciplines/thanatosissup.gif';
import thaumaturgysup from './../../assets/images/disciplines/thaumaturgysup.gif';
import valerensup from './../../assets/images/disciplines/valerensup.gif';
import vicissitudesup from './../../assets/images/disciplines/vicissitudesup.gif';
import visceratikasup from './../../assets/images/disciplines/visceratikasup.gif';
import defense from '././../../assets/images/disciplines/defense.gif';
import innocence from './../../assets/images/disciplines/innocence.gif';
import justice from './../../assets/images/disciplines/justice.gif';
import martyrdom from './../../assets/images/disciplines/martyrdom.gif';
import redemption from './../../assets/images/disciplines/redemption.gif';
import vengeance from './../../assets/images/disciplines/vengeance.gif';
import vision from './../../assets/images/disciplines/vision.gif';

function DeckLibraryDiscipline(props) {
  const disciplineicons = {
    Abombwe: abombwe,
    Animalism: animalism,
    Auspex: auspex,
    Celerity: celerity,
    Chimerstry: chimerstry,
    Daimoinon: daimoinon,
    Dementation: dementation,
    Dominate: dominate,
    Fortitude: fortitude,
    Melpominee: melpominee,
    Mytherceria: mytherceria,
    Necromancy: necromancy,
    Obeah: obeah,
    Obfuscate: obfuscate,
    Obtenebration: obtenebration,
    Potence: potence,
    Presence: presence,
    Protean: protean,
    Quietus: quietus,
    Sanguinus: sanguinus,
    Serpentis: serpentis,
    Spiritus: spiritus,
    Temporis: temporis,
    Thanatosis: thanatosis,
    Thaumaturgy: thaumaturgy,
    Valeren: valeren,
    Vicissitude: vicissitude,
    Visceratika: visceratika,
    Defense: defense,
    Innocence: innocence,
    Justice: justice,
    Martyrdom: martyrdom,
    Redemption: redemption,
    Vengeance: vengeance,
    Vision: vision,
  };


  const imgClass='discipline-image-results';
  let disciplines_images;

  if (props.value.indexOf('&') != -1) {
    const disciplines = props.value.split(' & ');
    let items = disciplines.length;
    disciplines_images = disciplines.map((discipline, index) => {
      const imgSrc = disciplineicons[discipline];
      if (items > 1) {
        items -= 1;
        return (
          <span key={index}>
            <img className={imgClass} src={imgSrc} />{'+'}
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
  } else if (props.value.indexOf('/') != -1) {
    const disciplines = props.value.split('/');
    let items = disciplines.length;
    disciplines_images = disciplines.map((discipline, index) => {
      const imgSrc = disciplineicons[discipline];
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
    const disciplines = props.value;
    const imgSrc = disciplineicons[disciplines];
    disciplines_images =
      <img className={imgClass} src={imgSrc} />;
  }

  return (
    <td className='disciplines'>
      {disciplines_images}
    </td>
  );
}

export default DeckLibraryDiscipline;
