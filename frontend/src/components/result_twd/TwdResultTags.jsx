import React from 'react';
import { DeckTags } from 'components';

const TwdResultTags = ({ tags }) => {
  return (
    <>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <div className="d-flex text-xs">
          <DeckTags
            deck={{
              tags: tags.base,
            }}
            tagsSuperior={tags.superior}
            bordered={false}
            allTagsOptions={[]}
          />
        </div>
      )}
    </>
  );
};

export default TwdResultTags;
