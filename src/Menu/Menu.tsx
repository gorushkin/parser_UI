import { Row } from '../parser';
import style from './Menu.module.scss';

const MenuButton = ({
  item,
  isActive,
  onClick,
}: {
  onClick: (key: string) => void;
  isActive: boolean;
  item: {
    key: string;
    value: string;
  };
}) => {
  const buttonClassName = isActive ? `${style.button} ${style.buttonActive}` : style.button;

  return (
    <button onClick={() => onClick(item.key)} className={buttonClassName}>
      {item.value}
    </button>
  );
};

export const Menu = ({
  headers,
  activeList,
  handleButtonClick,
  handleMenuReset,
  handleShowAllMenuCLick,
}: {
  headers: Row;
  activeList: string[];
  handleButtonClick: (key: string) => void;
  handleMenuReset: () => void;
  handleShowAllMenuCLick: () => void;
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
            isActive={activeList.includes(item.value)}
          />
        ))}
      </div>
    </div>
  );
};
