import { cn } from '../utils';
import style from './Menu.module.scss';
import { useExportContext } from '../AppContext/AppContext';

export const Menu = ({ onResetClick }: { onResetClick: () => void }) => {
  const { saveTransactions, isDataSynced } = useExportContext();

  const message = isDataSynced ? 'The date is synced' : 'The date is not synced';

  const handleSaveClick = () => saveTransactions();

  return (
    <div className={style.wrapper}>
      <div className={cn(style.info, !isDataSynced && style.infoWarning)}>{message}</div>
      <div className={style.controls}>
        <button onClick={onResetClick} className={cn(style.button, style.buttonReset)}>
          Reset
        </button>
        <div className={style.dataButtons}>
          <button onClick={onResetClick} className={cn(style.button, style.buttonLoad)}>
            Load
          </button>
          <button onClick={handleSaveClick} className={cn(style.button, style.buttonSave)}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
