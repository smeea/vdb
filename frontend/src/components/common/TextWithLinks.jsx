import {Fragment} from "react";
import { Link } from "react-router";
import reactStringReplace from "react-string-replace";

const TextWithLinks = ({ children }) => {
  return reactStringReplace(children, /https:\/\/(.*?[ ),])/g, (match, idx) => {
    const ending = match.endsWith(". ") ? ". " : match.slice(-1);
    const url = `https://${match.replace(ending, "")}`;

    return (
      <Fragment key={idx}>
        <Link to={url}>{url}</Link>
        {ending}
      </Fragment>
    );
  });
};

export default TextWithLinks;
