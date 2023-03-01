import { TableMode } from '../PageTwo/PageTwo';
import { Item, Row } from '../parser';
import { cn } from '../utils';
import style from './Menu.module.scss';

const MenuButton = ({
  item,
  isActive,
  onClick,
}: {
  onClick: (key: string) => void;
  isActive: boolean;
  item: Item;
}) => {
  const buttonClassName = isActive
    ? cn(style.button, style.buttonHeader, style.buttonHeaderActive)
    : cn(style.button, style.buttonHeader);

  return (
    <button onClick={() => onClick(item.key)} className={buttonClassName}>
      {item.displayValue}
    </button>
  );
};

export const Menu = ({
  headers,
  activeList,
  handleButtonClick,
  handleMenuReset,
  handleShowAllMenuCLick,
  mode,
  onClick,
}: {
  headers: Row;
  activeList: string[];
  handleButtonClick: (key: string) => void;
  handleMenuReset: () => void;
  handleShowAllMenuCLick: () => void;
  mode: TableMode;
  onClick: (mode: TableMode) => void;
}) => {
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
        {headers.map((item) => (
          <MenuButton
            onClick={handleButtonClick}
            key={item.key}
            item={item}
            isActive={activeList.includes(item.displayValue)}
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
