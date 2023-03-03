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

export const Menu = ({
  columns,
  activeList,
  handleButtonClick,
  handleMenuReset,
  handleShowAllMenuCLick,
  mode,
  onClick,
}: {
  columns: Column[];
  activeList: string[];
  handleButtonClick: (key: Property) => void;
  handleMenuReset: () => void;
  handleShowAllMenuCLick: () => void;
  mode: TableMode;
  onClick: (mode: TableMode) => void;
}) => {
  console.log('headers: ', columns);

  return (
    <div className={style.wrapper}>
      <div className={style.controls}>
        <button onClick={handleShowAllMenuCLick} className={style.button}>
          Show All Menu
        </button>
        <button onClick={handleMenuReset} className={style.button}>
          Reset
        </button>
      </div>
      <div className={style.menu}>
        {columns.map((item) => (
          <MenuButton
            onClick={handleButtonClick}
            key={item}
            item={item}
            isActive={activeList.includes(item)}
          />
        ))}
      </div>
      <div className={style.controls}>
        <button
          onClick={() => onClick('whole')}
          className={cn(style.button, style.buttonMode, mode === 'whole' && style.buttonModeActive)}
        >
          Whole
        </button>
        <button
          onClick={() => onClick('groups')}
          className={cn(
            style.button,
            style.buttonMode,
            mode === 'groups' && style.buttonModeActive
          )}
        >
          Grouped
        </button>
      </div>
    </div>
  );
};
