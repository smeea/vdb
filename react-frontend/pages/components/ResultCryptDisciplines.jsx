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

function ResultCryptDisciplines(props) {
  const disciplinesicons = {
    Abombwe: [abombwe, abombwesup],
    Animalism: [animalism, animalismsup],
    Auspex: [auspex, auspexsup],
    Celerity: [celerity, celeritysup],
    Chimerstry: [chimerstry, chimerstrysup],
    Daimoinon: [daimoinon, daimoinonsup],
    Dementation: [dementation, dementationsup],
    Dominate: [dominate, dominatesup],
    Fortitude: [fortitude, fortitudesup],
    Melpominee: [melpominee, melpomineesup],
    Mytherceria: [mytherceria, mytherceriasup],
    Necromancy: [necromancy, necromancysup],
    Obeah: [obeah, obeahsup],
    Obfuscate: [obfuscate, obfuscatesup],
    Obtenebration: [obtenebration, obtenebrationsup],
    Potence: [potence, potencesup],
    Presence: [presence, presencesup],
    Protean: [protean, proteansup],
    Quietus: [quietus, quietussup],
    Sanguinus: [sanguinus, sanguinussup],
    Serpentis: [serpentis, serpentissup],
    Spiritus: [spiritus, spiritussup],
    Temporis: [temporis, temporissup],
    Thanatosis: [thanatosis, thanatosissup],
    Thaumaturgy: [thaumaturgy, thaumaturgysup],
    Valeren: [valeren, valerensup],
    Vicissitude: [vicissitude, vicissitudesup],
    Visceratika: [visceratika, visceratikasup],
    Defense: [defense],
    Innocence: [innocence],
    Judgment: [justice],
    Martyrdom: [martyrdom],
    Redemption: [redemption],
    Vengeance: [vengeance],
    Vision: [vision],
  };

  let discipline_rows;
  let empty_rows = [];
  let counter = 0;
  let max_rows = 8;
  let width = 100 / max_rows + '%';

  if (props.disciplines_set !== undefined && props.disciplines_set.length <= max_rows) {
    discipline_rows = props.disciplines_set.map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] === undefined) {
        return (
          <td width={width} key={index}>
          </td>
        );
      } else {
        if (props.value[d] == 1) {
          imgSrc = disciplinesicons[d][0];
          imgClass = 'discipline-base-image-results';
        } else if (props.value[d] == 2) {
          imgSrc = disciplinesicons[d][1];
          imgClass = 'discipline-superior-image-results';
        }
        return (
          <td width={width} key={index}>
            <img className={imgClass} src={imgSrc} />
          </td>
        );
      }
    });
  } else {
    if (props.disciplines_set === undefined) {
      max_rows = 7;
      width = 100 / max_rows + '%';
    }
    discipline_rows = Object.keys(props.value).map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] == 1) {
        imgSrc = disciplinesicons[d][0];
        imgClass = 'discipline-base-image-results';
      } else if (props.value[d] == 2) {
        imgSrc = disciplinesicons[d][1];
        imgClass = 'discipline-superior-image-results';
      }
      return (
        <td width={width} key={index}>
          <img className={imgClass} src={imgSrc} />
        </td>
      );
    });
  }

  while (counter < max_rows) {
    counter += 1;
    empty_rows.push(
      <td width={width} key={counter}></td>
    );
  }

  return (
    <td className='disciplines'>
      <table width='100%'>
        <tbody>
          <tr>
            {discipline_rows}
            {empty_rows}
          </tr>
        </tbody>
      </table>
    </td>
  );
}

export default ResultCryptDisciplines;
