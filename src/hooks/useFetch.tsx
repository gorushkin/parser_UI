import { useCallback, useState } from 'react';

type Options = { onSuccess?: Function; onFail?: Function };

type UseFetch = (
  request: Function,
  options?: Options
) => { isLoading: boolean; data: any; error: any; handler: Function };

export const useFetch: UseFetch = (
  request,
  { onSuccess, onFail } = { onSuccess: () => {}, onFail: () => {} }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await request(params);
      if (!response?.data) return;
      setData(response.data);
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.log('error: ', error);
      setError(error as Error);
      if (onFail) onFail();
    } finally {
      setIsLoading(false);
    }
  };

  const handler = useCallback((params?: any) => {
    fetchData(params);
  }, []);

  return { isLoading, data, error, handler };
};
