import { RadioGroup } from '@headlessui/react';
import { Radio } from '@/components';
import { ANY, FAVORITES, MY, MY_NONPUBLIC } from '@/constants';

const PdaSearchFormSrcSelector = ({ value, onChange }) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      aria-label="Server size"
      className="flex gap-4 sm:gap-6"
    >
      {[
        [ANY, 'All'],
        [FAVORITES, 'Favorites'],
        [MY, 'My'],
        [MY_NONPUBLIC, 'My Non-Public'],
      ].map((i) => (
        <Radio key={i[0]} value={i[0]} label={i[1]} />
      ))}
    </RadioGroup>
  );
};

export default PdaSearchFormSrcSelector;
