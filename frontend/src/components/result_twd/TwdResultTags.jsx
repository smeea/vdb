import React from 'react';
import { DeckTags } from '@/components';

const TwdResultTags = ({ tags }) => {
  return (
    <>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <div className="flex">
          <DeckTags
            deck={{
              tags: tags.base,
            }}
            tagsSuperior={tags.superior}
            isBordered={false}
            allTagsOptions={[]}
          />
        </div>
      )}
    </>
  );
};

export default TwdResultTags;
