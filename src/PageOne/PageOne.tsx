import { Typography, Button } from 'antd';
import { useExportContext } from '../AppContext/AppContext';
import { DropZone } from '../DropZone';
import style from './PageOne.module.scss';

export const PageOne = () => {
  const { fileInfo, handleStartClick } = useExportContext();

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <Typography.Title>Vakif statements parser</Typography.Title>
        <DropZone className={style.dropzone} />
        <Button
          onClick={handleStartClick}
          disabled={!fileInfo.content}
          type='primary'
          className={style.button}
        >
          Start
        </Button>
      </div>
    </div>
  );
};
