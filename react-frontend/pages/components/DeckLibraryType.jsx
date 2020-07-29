import React from 'react';

import action from './../../assets/images/types/action.gif';
import actionmodifier from './../../assets/images/types/actionmodifier.gif';
import ally from './../../assets/images/types/ally.gif';
import combat from './../../assets/images/types/combat.gif';
import conviction from './../../assets/images/types/conviction.gif';
import equipment from './../../assets/images/types/equipment.gif';
import event from './../../assets/images/types/event.gif';
import master from './../../assets/images/types/master.gif';
import politicalaction from './../../assets/images/types/politicalaction.gif';
import power from './../../assets/images/types/power.gif';
import reaction from './../../assets/images/types/reaction.gif';
import reflex from './../../assets/images/types/reflex.gif';
import retainer from './../../assets/images/types/retainer.gif';

function DeckLibraryType(props) {
  const typeicons = {
    'Action': action,
    'Action Modifier': actionmodifier,
    'Ally': ally,
    'Combat': combat,
    'Conviction': conviction,
    'Equipment': equipment,
    'Event': event,
    'Master': master,
    'Political Action': politicalaction,
    'Power': power,
    'Reaction': reaction,
    'Reflex': reflex,
    'Retainer': retainer,
  };
  const imgClass='type-image-results';
  const cardtypes = props.cardtype.split('/');
  const cardtype_images = cardtypes.map((cardtype, index) => {
    const imgSrc=typeicons[cardtype];
    return (
      <img key={index} className={imgClass} src={imgSrc} />
    );
  });

  return(
    <div>
      {cardtype_images} {' '} {props.cardtype} [{props.total}]
    </div>
  );
}

export default DeckLibraryType;
