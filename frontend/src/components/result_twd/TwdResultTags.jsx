import React from 'react';
import { DeckTags } from 'components';

const TwdResultTags = ({ tags }) => {
  return (
    <>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <div className="d-flex small">
          <DeckTags
            deckid={null}
            tags={tags.base}
            tagsSuperior={tags.superior}
            bordered={false}
            isAuthor={false}
            isPublic={true}
            allTagsOptions={[]}
          />
        </div>
      )}
    </>
  );
};

export default TwdResultTags;
