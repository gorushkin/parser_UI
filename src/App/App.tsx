import { AppContextProvider, Page, useExportContext } from '../AppContext/AppContext';
import { PageOne } from '../PageOne';
import { PageTwo } from '../PageTwo';
import style from './App.module.scss';

const pageMapping: Record<Page, JSX.Element> = {
  first: <PageOne />,
  second: <PageTwo />,
};

function App() {
  const { page } = useExportContext();

  return <div className={style.container}>{pageMapping[page]}</div>;
}

export default () => (
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
