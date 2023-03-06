import { Column, Property, TableMode } from '../types';
import { cn } from '../utils';
import style from './Menu.module.scss';

const MenuButton = ({
  item,
  isActive,
  onClick,
}: {
  onClick: (key: Property) => void;
  isActive: boolean;
  item: Column;
}) => {
  const buttonClassName = isActive
    ? cn(style.button, style.buttonHeader, style.buttonHeaderActive)
    : cn(style.button, style.buttonHeader);

  return (
    <button onClick={() => onClick(item as Property)} className={buttonClassName}>
      {item}
    </button>
  );
};

export const Menu = ({ onResetClick }: { onResetClick: () => void }) => {

  return (
    <div className={style.wrapper}>
      <div className={style.controls}>
        <button onClick={onResetClick} className={cn(style.button, style.buttonMode)}>
          Reset
        </button>
      </div>
    </div>
  );
};
