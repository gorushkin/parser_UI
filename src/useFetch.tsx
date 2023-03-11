import { useCallback, useState } from 'react';

export const useFetch = (request: Function) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async (params: any) => {
    setIsLoading(true);
    try {
      const response = await request(params);
      if (!response?.data) return;
      setData(response.data);
    } catch (error) {
      console.log('error: ', error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handler = useCallback((params?: any) => {
    fetchData(params);
  }, []);

  return { isLoading, data, error, handler };
};
