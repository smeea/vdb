import React from 'react';
import { useApp } from 'context';

const CardImage = (props) => {
  const { localizedCrypt, localizedLibrary, lang } = useApp();

  let imgSrc = null;

  if (props.card['Id'] > 200000) {
    imgSrc = `${process.env.ROOT_URL}images/cards/${
      props.set
        ? `set/${props.set}`
        : localizedCrypt &&
          localizedCrypt[lang] &&
          localizedCrypt[lang][props.card['Id']]
        ? lang
        : 'en-EN'
    }/${props.card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}
g${props.card['Group'].toLowerCase()}
${props.card['Adv'][0] ? 'adv' : ''}${
      props.card['New'] ? `g${props.card['Group']}` : ''
    }.jpg`;
  } else {
    imgSrc = `${process.env.ROOT_URL}images/cards/${
      props.set
        ? 'set/' + props.set + '/'
        : localizedLibrary &&
          localizedLibrary[lang] &&
          localizedLibrary[lang][props.card['Id']]
        ? lang + '/'
        : 'en-EN/'
    }${props.card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;
  }

  return (
    <img
      className={props.className ? props.className : 'card-popover'}
      src={imgSrc}
      alt={props.card['Name']}
      onClick={props.onClick}
    />
  );
};

export default CardImage;
