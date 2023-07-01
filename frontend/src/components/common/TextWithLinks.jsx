import React from 'react';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

const TextWithLinks = ({ children }) => {
  return reactStringReplace(children, /https:\/\/(.*?[ )])/g, (match, idx) => {
    let ending;
    if (match.endsWith('. ')) {
      ending = '. ';
    } else {
      switch (match.slice(-1)) {
        case ')':
          ending = ')';
          break;
        case ' ':
          ending = ' ';
          break;
        default:
          ending = '';
      }
    }

    const url = `https://${match.replace(ending, '')}`;
    return (
      <React.Fragment key={idx}>
        <Link to={url}>{url}</Link>
        {ending}
      </React.Fragment>
    );
  });
};

export default TextWithLinks;
