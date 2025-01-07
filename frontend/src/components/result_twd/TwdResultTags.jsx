import React from 'react';
import { DeckTags } from '@/components';
import { SUPERIOR, BASE } from '@/constants';

const TwdResultTags = ({ tags }) => {
  return (
    <div className="flex">
      <DeckTags
        deck={{
          tags: tags[BASE],
        }}
        tagsSuperior={tags[SUPERIOR]}
        allTagsOptions={[]}
      />
    </div>
  );
};

export default TwdResultTags;
