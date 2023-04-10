import { cn } from '../utils/utils';
import style from './Menu.module.scss';
import { useStatementContext } from '../context/StatementContext';
import { Button } from '../components/Button/Button';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import { useFetch } from '../hooks/useFetch';
import { downloadStatement } from '../services/api';
import { saveAs } from 'file-saver';

export const Menu = () => {
  const {
    isDataSynced,
    handleResetClick,
    handleSaveClick,
    handleLoadClick,
    handleCompareData,
    statementName,
  } = useStatementContext();

  const message = isDataSynced
    ? 'The data is synced'
    : 'The data is not synced';

  const [, downloadStatementHandler] = useFetch(downloadStatement, {
    onSuccess: (blob: Blob) => {
      saveAs(blob, `${statementName}.csv`);
    },
  });

  const handleExportClick = () => {
    downloadStatementHandler(statementName);
  };

  return (
    <div className={style.wrapper}>
      <div className={cn(style.info, !isDataSynced && style.infoWarning)}>
        {message}
      </div>
      <div className={cn(style.controls, style.row)}>
        <div className={style.buttonWrapper}>
          <Button color="orange" onClick={handleResetClick}>
            Reset
          </Button>
          <Link className={style.buttonLink} to={APP_ROUTES.ROOT}>
            <Button color="orange">Back</Button>
          </Link>
        </div>
        <div className={style.buttonWrapper}>
          <Button onClick={handleLoadClick} color="blue">
            Load from disk
          </Button>
          <Button onClick={handleCompareData} color="blue">
            Check sync status
          </Button>
          <Button onClick={handleSaveClick} color="green">
            Save to disk
          </Button>
        </div>
      </div>
      <div className={cn(style.row, style.rowRight)}>
        <Button onClick={handleExportClick}>Export Statement</Button>
      </div>
    </div>
  );
};
