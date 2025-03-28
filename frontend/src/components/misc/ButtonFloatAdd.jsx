import Plus from '@icons/plus.svg?react';
import { ButtonFloat } from '@/components';

const ButtonFloatAdd = ({ className }) => {
  return (
    <ButtonFloat className={className} onClick={toggleAddMode} position="middle">
      <Plus width="47" height="47" viewBox="0 0 16 16" />
    </ButtonFloat>
  );
};

export default ButtonFloatAdd;
