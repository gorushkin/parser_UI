import { useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { getFiles } from '../../../services/api';
import { Filenames } from '../../../types';
import styles from './Files.module.scss';

export const Files = ({
  shouldUpdate,
  setShouldUpdate,
}: {
  shouldUpdate: boolean;
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { handler, isLoading, data } = useFetch(getFiles);

  const filenames = data as Filenames;

  useEffect(() => {
    handler();
  }, []);

  useEffect(() => {
    if (!shouldUpdate) return;
    handler();
    setShouldUpdate(false);
  }, [shouldUpdate]);

  if (isLoading) return <h1>Loading....</h1>;

  if (!data) return <h1>There is no files</h1>;

  return (
    <ul className={styles.list}>
      {filenames.map((filename) => {
        return (
          <li className={styles.item} key={filename}>
            {filename}
          </li>
        );
      })}
    </ul>
  );
};
