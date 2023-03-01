import { createContext, ReactElement, useState, useMemo, useContext, useEffect } from 'react';

export type Page = 'first' | 'second';

const tempContent = `
ACCOUNT NUMBER	RECEIPT NUMBER	TRANSACTION DATE	PROCESS DATE	CARD NUMBER	TRANSACTION  NAME	AMOUNT	BALANCE	CHANNEL	REFERANCE	FUNDS TRANSFER	REFNO	TRANSACTION ID	IDENTIFICATION NUMBER	TAX NUMBER	D/C	NARRATIVE	APPLIED FX RATE	TRY EQUIVALENT
00000000000000000	0	10.11.2022 11:30	14.11.2022		Deposit Money Deposit	2,500.00	2,500.00	ŞUBE: S00494				2022005856519671		1111111111111	A	445014228069 My Name ne ait TR07 0001 5001 5800 7318 6701 86 nolu mevduat hesabına yatan. Adına işlem Yapan: My Name
00000000000000000	0	10.11.2022 11:35	14.11.2022		VakıfBank Kazandıran Tarife [Winning Tariff ] Collection 	-2,016.00	484.00	ŞUBE: S00494				2022005856531357		1111111111111	B	VakıfBank Kazandıran Süper Tarife MASRAF VE KOMİSYON TUTARININ 00000000000000000 My Name HESABINDAN TAHSİLİ
00000000000000000	0	10.11.2022 12:01	14.11.2022		VakıfBank Kazandıran Tarife [Winning Tariff ] Collection 	-378.00	106.00	ŞUBE: S00494				2022005857549550		1111111111111	B	VakıfBank Kazandıran Standart Tarife MASRAF VE KOMİSYON TUTARININ 00000000000000000 My Name HESABINDAN TAHSİLİ
00000000000000000	0	14.11.2022 18:48	14.11.2022	5355769057340218	Deposit Money	400.00	506.00	ATM: S00494				2022005870230531		1111111111111	A	S00494 şubesine bağlı 004941 no lu ORTACA ŞUBESİ ATM 'sinde 11/14/2022 6:48:29 PM tarihinde nakit para yatırıldı.İşlem no : 224348 Cep Telefonu: 5078404179
00000000000000000	0	14.11.2022 19:02	14.11.2022	5355769057340218	BKM Pos Spending	-114.95	391.05	Diğer Banka Pos				2022005870518227		1111111111111	B	Referans :20064231820221104 Term Id :S07KT505- ISLEM NO :    -MIGROS ORTACA MUGLA      MUGLA        TR**** SAAT :19:02:35 Provizyon Kodu : 266198 - 0064 - D
00000000000000000	0	14.11.2022 19:06	14.11.2022	5355769057340218	BKM Pos Spending	-28.00	363.05	Diğer Banka Pos				2022005870539874		1111111111111	B	Referans :20012231819996406 Term Id :PS885269- ISLEM NO :    -HAKIKI ISPIR UNLU MA     MUGLA        TR**** SAAT :19:06:15 Provizyon Kodu : 273687 - 0012 - D
00000000000000000	0	14.11.2022 20:17	14.11.2022	5355769057340218	BKM Pos Spending	-104.15	258.90	Diğer Banka Pos				2022005872445116		1111111111111	B	Referans :20064231820703177 Term Id :S07KT506- ISLEM NO :    -MIGROS ORTACA MUGLA      MUGLA        TR**** SAAT :20:17:55 Provizyon Kodu : 401294 - 0064 - D
00000000000000000	0	15.11.2022 14:11	15.11.2022		Received Automatic Deposited EFT 	500.00	758.90	S00000 BANKA GENELİ				2022005902623441		1111111111111	A	Ref No:3745344 Money transfer order, ARTEM GORYUSHKIN/VAKIF KATILIM BANKASI A.Ş.-0210-90001-9882295 sorgu numaralı HIZLIPARA ÖDEME HİZMETLERİ VE ELEKTRONİK PARA A.Ş. tarafından My Name tarafına gelen EFT
00000000000000000	0	15.11.2022 19:21	15.11.2022	5355769057340218	Overseas 3D Secure Spending	-96.07	662.83	Sanal POS				2022005915090502		1111111111111	B	Referans :20779111500468218 Term Id :KGIQHDDL- ISLEM NO :    -DIGITALOCEAN.COM         +3100000000  NL**** SAAT :19:21:47 Provizyon Kodu : 670567 - 020779 - D Kur ..:19,213250

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
