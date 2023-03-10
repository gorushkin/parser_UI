import { cn } from '../utils';
import style from './Menu.module.scss';
import { useExportContext } from '../AppContext/AppContext';
import { Button } from '../Button/Button';

export const Menu = ({ onResetClick }: { onResetClick: () => void }) => {
  const { saveTransactions, isDataSynced } = useExportContext();

  const message = isDataSynced ? 'The date is synced' : 'The date is not synced';

  const handleSaveClick = () => saveTransactions();

  return (
    <div className={style.wrapper}>
      <div className={cn(style.info, !isDataSynced && style.infoWarning)}>{message}</div>
      <div className={style.controls}>
        <Button color='orange' onClick={onResetClick}>
          Reset
        </Button>
        <Button color='orange' onClick={onResetClick}>
          Back
        </Button>
        <div className={style.dataButtons}>
          <Button onClick={onResetClick} color='blue'>
            Load
          </Button>
          <Button onClick={handleSaveClick} color='green'>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
