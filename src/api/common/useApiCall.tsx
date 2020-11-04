import { useEffect, useState } from 'react';
import { ApiResponse } from '..';
import { ApiSuccessResponse } from '..';

export function useApiCall<T, TResponse>(
  makeCall: () => Promise<ApiResponse<TResponse>>,
  unpackApiResponse: (apiResponse: ApiSuccessResponse<TResponse>) => T,
) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<T|null>(null);
  
  useEffect(() => {
    const loadField = async () => {
      const response = await makeCall();
      if (response.isError) {
        setError(response.errorMessage);
      }
      else {
        setData(unpackApiResponse(response));
      }
      setIsLoading(false);
    };
    loadField();
  }, [makeCall, unpackApiResponse]);

  return {
    isLoading,
    error,
    data: data as T,
  };
}