import { ButtonClose, TwdMoreButton, TwdNewDecksButton, TwdRandomButton } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormButtons = ({ getRandom, getNew, handleClear, inPda }) => {
  const { isMobile } = useApp();

  return (
    <div className="flex justify-between gap-1">
      <div className="flex gap-1">
        <TwdRandomButton getRandom={getRandom} />
        <TwdNewDecksButton getNew={getNew} />
      </div>
      <div className="flex gap-1">
        {!inPda && <TwdMoreButton />}
        {!isMobile && <ButtonClose title="Clear Forms & Results" handleClick={handleClear} />}
      </div>
    </div>
  );
};

export default TwdSearchFormButtons;
