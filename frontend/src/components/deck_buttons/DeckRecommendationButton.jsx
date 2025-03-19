import LightbulbFill from '@icons/lightbulb-fill.svg?react';
import { ButtonIconed } from '@/components';
import { useApp } from '@/context';

const DeckRecommendationButton = ({ setShowRecommendation }) => {
  const { isDesktop, setShowFloatingButtons, setShowMenuButtons } = useApp();

  const handleClick = () => {
    setShowRecommendation(true);
    setShowMenuButtons(false);
    setShowFloatingButtons(false);
  };

  return (
    <ButtonIconed
      variant={isDesktop ? 'secondary' : 'primary'}
      onClick={handleClick}
      title="Get Recommendation based on TWD with similar cards"
      icon={<LightbulbFill />}
      text="Card Ideas"
    />
  );
};

export default DeckRecommendationButton;
