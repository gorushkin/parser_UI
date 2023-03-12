import { useExportContext } from '../../AppContext/AppContext';
import { Button } from '../../components/Button/Button';
import { getTest } from '../../services/api';
import style from './PageOne.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { DropZone } from './DropZone';
import { useState } from 'react';
import { FileForm } from './FileForm';
import { Files } from './Files';

export const PageOne = () => {
  const { fileInfo } = useExportContext();

  const { handler, isLoading } = useFetch(getTest);

  const handleTestClick = () => handler();

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleStartClick = () => {
    if (!fileInfo.content) {
      alert('There is no file!!!');
      return;
    }
    setIsFormVisible(true);
  };

  const handleCloseFrom = () => setIsFormVisible(false);

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.inner}>
          {!isFormVisible && (
            <>
              <h1>Vakif statements parser</h1>
              <DropZone className={style.dropzone} />
              <div className={style.controls}>
                <Button
                  disabled={!fileInfo.content}
                  onClick={handleStartClick}
                  label="Start"
                />
                <Button
                  onClick={handleStartClick}
                  label="Check saved files"
                />
                <Button
                  label="Test Api"
                  isLoading={isLoading}
                  onClick={handleTestClick}
                />
              </div>
            </>
          )}
          {isFormVisible && <FileForm onFormSave={handleCloseFrom} />}
          <Files />
        </div>
      </div>
    </>
  );
};
