import { createContext, ReactElement, useState, useMemo, useContext, useEffect } from 'react';

export type Page = 'first' | 'second';

const tempContent = `
ACCOUNT NUMBER	RECEIPT NUMBER	TRANSACTION DATE	PROCESS DATE	CARD NUMBER	TRANSACTION  NAME	AMOUNT	BALANCE	CHANNEL	REFERANCE	FUNDS TRANSFER	REFNO	TRANSACTION ID	IDENTIFICATION NUMBER	TAX NUMBER	D/C	NARRATIVE	APPLIED FX RATE	TRY EQUIVALENT
333	0	14.11.2022 11:30	14.11.2022		Deposit Money Deposit	2,500.00	2,500.00	ŞUBE: S00494				2022005856519671		0000000000	A	Description
333	0	14.11.2022 11:35	14.11.2022		VakıfBank Kazandıran Tarife [Winning Tariff ] Collection 	-2,016.00	484.00	ŞUBE: S00494				2022005856531357		0000000000	B	Description

`;

interface FileInfo {
  name: string | null;
  size: number | null;
  content: string | null;
}

interface Context {
  fileInfo: FileInfo;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>;
  page: Page;
  handleStartClick: () => void;
}

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({ name: null, size: null, content: null });
  const [page, setPage] = useState<Page>('first');

  const handleStartClick = () => {
    setPage('second');
  };

  useEffect(() => {
    setFileInfo((state) => ({ ...state, content: tempContent }));
    setPage('second');
  }, []);

  const context = useMemo(
    () => ({
      fileInfo,
      setFileInfo,
      page,
      handleStartClick,
    }),
    [fileInfo, page]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
