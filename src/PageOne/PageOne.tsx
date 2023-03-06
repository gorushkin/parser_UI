import { useExportContext } from '../AppContext/AppContext';
import { Button } from '../Button/Button';
import { DropZone } from '../DropZone';
import style from './PageOne.module.scss';

export const PageOne = () => {
  const { fileInfo, handleStartClick, isStorageEmpty, loadTransactions } = useExportContext();

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <h1>Vakif statements parser</h1>
        <DropZone className={style.dropzone} />
        <div className={style.controls}>
          <Button disabled={!fileInfo.content} onClick={handleStartClick} label='Start' />
          <Button disabled={isStorageEmpty} label='Load from local localStorage' onClick={loadTransactions} />
        </div>
      </div>
    </div>
  );
};
