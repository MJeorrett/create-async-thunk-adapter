import Axios, { AxiosError } from 'axios';

import { ApiResponse, ApiErrorResponse, NoContentApiResponse } from './ApiResponse';

function isAxiosError<T>(error: AxiosError | any): error is AxiosError<T> {
  return error && error.isAxiosError
}

const isStatus = (requiredStatus: number) => (status: number) => {
  return status === requiredStatus;
}

function buildErrorResponse(errorMessage: string): ApiErrorResponse {
  return {
    isError: true,
    errorMessage: errorMessage,
  }
}

export async function get<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response = await Axios.get<T>(
      url,
      { validateStatus: isStatus(200) },
    );

    return {
      isError: false,
      content: response.data,
    };
  }
  catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response ?
        error.message :
        'Failed to contact server.';

      console.error(errorMessage);
      return buildErrorResponse(errorMessage);
    }

    const errorMessage = `GET request to ${url} failed.`
    console.error(errorMessage);
    return buildErrorResponse(errorMessage);
  }
};

export async function post<T>(url: string, body: any): Promise<NoContentApiResponse> {
  try {
    await Axios.post<T>(
      url,
      body,
      {
        validateStatus: isStatus(201),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      isError: false,
    };
  }
  catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response ?
        error.message :
        'Failed to contact server.';

      console.error(errorMessage);
      return buildErrorResponse(errorMessage);
    }

    const errorMessage = `POST request to ${url} failed.`
    console.error(errorMessage);
    return buildErrorResponse(errorMessage);
  }
};

export async function put<T>(url: string, body: any): Promise<NoContentApiResponse> {
  try {
    await Axios.put<T>(
      url,
      body,
      {
        validateStatus: isStatus(200),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      isError: false,
    };
  }
  catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response ?
        error.message :
        'Failed to contact server.';

      console.error(errorMessage);
      return buildErrorResponse(errorMessage);
    }

    const errorMessage = `PUT request to ${url} failed.`
    console.error(errorMessage);
    return buildErrorResponse(errorMessage);
  }
};