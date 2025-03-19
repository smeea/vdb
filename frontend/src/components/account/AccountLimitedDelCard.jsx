import { Button } from '@/components';
import { ALLOWED, ID } from '@/constants';
import { limitedCardChange } from '@/context';

const AccountLimitedDelCard = ({ cardid, target }) => {
  const card = { [ID]: cardid };
  const allowedDel = () => limitedCardChange(card, true, false);
  const bannedDel = () => limitedCardChange(card, false, false);

  return (
    <Button
      className="h-[33px] w-[24px]"
      onClick={() => (target === ALLOWED ? allowedDel() : bannedDel())}
      title="Remove card"
      noPadding
    >
      -
    </Button>
  );
};

export default AccountLimitedDelCard;
