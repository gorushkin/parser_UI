import { cn } from '../utils/utils';
import style from './Menu.module.scss';
import { useExportContext } from '../AppContext/AppContext';
import { Button } from '../Button/Button';

export const Menu = ({ onResetClick }: { onResetClick: () => void }) => {
  const { saveTransactions, isDataSynced, setPage } = useExportContext();

  const message = isDataSynced ? 'The date is synced' : 'The date is not synced';

  const handleSaveClick = () => saveTransactions();

  return (
    <div className={style.wrapper}>
      <div className={cn(style.info, !isDataSynced && style.infoWarning)}>{message}</div>
      <div className={cn(style.controls, style.row)}>
        <div className={style.buttonWrapper}>
          <Button color='orange' onClick={onResetClick}>
            Reset
          </Button>
          <Button color='orange' onClick={() => setPage('first')}>
            Back
          </Button>
        </div>
        <div className={style.buttonWrapper}>
          <Button onClick={onResetClick} color='blue'>
            Load from LS
          </Button>
          <Button onClick={handleSaveClick} color='green'>
            Save to LS
          </Button>
        </div>
      </div>
      <div className={style.row}>
        <div className={cn(style.buttonWrapper, style.buttonWrapperRight)}>
          <Button onClick={onResetClick} color='blue'>
            Load from disk
          </Button>
          <Button onClick={handleSaveClick} color='green'>
            Save to disk
          </Button>
        </div>
      </div>
    </div>
  );
};
